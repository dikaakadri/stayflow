// ============================================================
// StayFlow - Persistent Store
// Wraps mock data with localStorage persistence
// ============================================================

import type { Homestay, Booking } from '@/types';
import { MOCK_HOMESTAYS as DEFAULT_HOMESTAYS, MOCK_BOOKINGS as DEFAULT_BOOKINGS } from './mock-data';

const STORAGE_KEYS = {
  homestays: 'stayflow_homestays',
  bookings: 'stayflow_bookings',
};

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed as T[];
      }
    }
  } catch {
    // corrupted data, reset
    localStorage.removeItem(key);
  }
  return fallback;
}

function saveToStorage<T>(key: string, data: T[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

// ---- Homestay Store ----
export function getHomestays(): Homestay[] {
  return loadFromStorage<Homestay>(STORAGE_KEYS.homestays, DEFAULT_HOMESTAYS);
}

export function saveHomestays(homestays: Homestay[]): void {
  saveToStorage(STORAGE_KEYS.homestays, homestays);
}

export function addHomestay(homestay: Homestay): Homestay[] {
  const list = getHomestays();
  list.push(homestay);
  saveHomestays(list);
  return list;
}

export function updateHomestay(id: string, updates: Partial<Homestay>): Homestay[] {
  const list = getHomestays();
  const idx = list.findIndex((h) => h.id === id);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...updates } as Homestay;
  }
  saveHomestays(list);
  return list;
}

export function deleteHomestay(id: string): Homestay[] {
  const list = getHomestays().filter((h) => h.id !== id);
  saveHomestays(list);
  return list;
}

// ---- Booking Store ----
export function getBookings(): Booking[] {
  const bookings = loadFromStorage<Booking>(STORAGE_KEYS.bookings, DEFAULT_BOOKINGS);
  // Re-attach homestay references
  const homestays = getHomestays();
  return bookings.filter(b => b != null).map((b) => ({
    ...b,
    homestay: homestays.find((h) => h.id === b.homestay_id) || b.homestay,
  }));
}

export function saveBookings(bookings: Booking[]): void {
  // Strip homestay references before saving to avoid bloat
  const stripped = bookings.map(({ homestay, customer, ...rest }) => rest);
  saveToStorage(STORAGE_KEYS.bookings, stripped as any);
}

export function addBooking(booking: Booking): Booking[] {
  const list = getBookings();
  list.unshift(booking);
  saveBookings(list);
  return list;
}

export function updateBooking(id: string, updates: Partial<Booking>): Booking[] {
  const list = getBookings();
  const idx = list.findIndex((b) => b.id === id);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...updates } as Booking;
  }
  saveBookings(list);
  return list;
}

export function deleteBooking(id: string): Booking[] {
  const list = getBookings().filter((b) => b.id !== id);
  saveBookings(list);
  return list;
}

export function updateBookingStatus(id: string, status: Booking['status']): Booking[] {
  return updateBooking(id, { status, updated_at: new Date().toISOString() });
}

// ---- Reset (for debugging) ----
export function resetAllData(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.homestays);
  localStorage.removeItem(STORAGE_KEYS.bookings);
}

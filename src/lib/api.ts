import { supabase } from './supabase';
import type { Homestay, Booking, Customer, Expense } from '@/types';

// ---- Homestays ----
export async function getHomestays(): Promise<Homestay[]> {
  const { data, error } = await supabase
    .from('homestays')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Homestay[];
}

export async function addHomestay(homestay: Omit<Homestay, 'id' | 'created_at' | 'updated_at'>): Promise<Homestay> {
  const { data, error } = await supabase
    .from('homestays')
    .insert(homestay)
    .select()
    .single();
  
  if (error) throw error;
  return data as Homestay;
}

export async function updateHomestay(id: string, updates: Partial<Homestay>): Promise<Homestay> {
  const { data, error } = await supabase
    .from('homestays')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Homestay;
}

export async function deleteHomestay(id: string): Promise<void> {
  const { error } = await supabase
    .from('homestays')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// ---- Bookings ----
export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, homestay:homestays(*), customer:customers(*)')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Booking[];
}

export async function getBooking(id: string): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, homestay:homestays(*), customer:customers(*)')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Booking;
}

export async function addBooking(booking: any): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single();
  
  if (error) throw error;
  return data as Booking;
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Booking;
}

export async function deleteBooking(id: string): Promise<void> {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

export async function updateBookingStatus(id: string, status: Booking['status']): Promise<Booking> {
  return updateBooking(id, { status });
}

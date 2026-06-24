/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from './supabase';
import type { Homestay, Booking, Customer, Expense, DashboardStats, RevenueData, HomestayPerformance } from '@/types';

// Helper: bypass Supabase's strict generic types (no generated DB types in this project)
const db = supabase as any;

// ---- Homestays ----
export async function getHomestays(): Promise<Homestay[]> {
  const { data, error } = await db
    .from('homestays')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Homestay[];
}

export async function addHomestay(homestay: Omit<Homestay, 'id' | 'created_at' | 'updated_at'>): Promise<Homestay> {
  const { data, error } = await db
    .from('homestays')
    .insert(homestay)
    .select()
    .single();
  if (error) throw error;
  return data as Homestay;
}

export async function updateHomestay(id: string, updates: Partial<Homestay>): Promise<Homestay> {
  const { data, error } = await db
    .from('homestays')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Homestay;
}

export async function deleteHomestay(id: string): Promise<void> {
  const { error } = await db.from('homestays').delete().eq('id', id);
  if (error) throw error;
}

// ---- Customers ----
export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await db
    .from('customers')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Customer[];
}

export async function addCustomer(customer: Omit<Customer, 'id' | 'created_at' | 'updated_at' | 'total_stays'>): Promise<Customer> {
  const { data, error } = await db
    .from('customers')
    .insert({ ...customer, total_stays: 0 })
    .select()
    .single();
  if (error) throw error;
  return data as Customer;
}

export async function updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer> {
  const { data, error } = await db
    .from('customers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Customer;
}

export async function deleteCustomer(id: string): Promise<void> {
  const { error } = await db.from('customers').delete().eq('id', id);
  if (error) throw error;
}

// ---- Bookings ----
export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await db
    .from('bookings')
    .select('*, homestay:homestays(*), customer:customers(*)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Booking[];
}

export async function getBooking(id: string): Promise<Booking> {
  const { data, error } = await db
    .from('bookings')
    .select('*, homestay:homestays(*), customer:customers(*)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Booking;
}

export async function addBooking(booking: any): Promise<Booking> {
  const { data, error } = await db
    .from('bookings')
    .insert(booking)
    .select()
    .single();
  if (error) throw error;
  return data as Booking;
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
  const { data, error } = await db
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Booking;
}

export async function deleteBooking(id: string): Promise<void> {
  const { error } = await db.from('bookings').delete().eq('id', id);
  if (error) throw error;
}

export async function updateBookingStatus(id: string, status: Booking['status']): Promise<Booking> {
  return updateBooking(id, { status });
}

// ---- Expenses ----
export async function getExpenses(): Promise<Expense[]> {
  const { data, error } = await db
    .from('expenses')
    .select('*, homestay:homestays(*)')
    .order('expense_date', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Expense[];
}

export async function addExpense(expense: Omit<Expense, 'id' | 'created_at' | 'updated_at' | 'homestay'>): Promise<Expense> {
  const { data, error } = await db
    .from('expenses')
    .insert(expense)
    .select()
    .single();
  if (error) throw error;
  return data as Expense;
}

export async function updateExpense(id: string, updates: Partial<Expense>): Promise<Expense> {
  const { data, error } = await db
    .from('expenses')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Expense;
}

export async function deleteExpense(id: string): Promise<void> {
  const { error } = await db.from('expenses').delete().eq('id', id);
  if (error) throw error;
}

// ---- Dashboard Stats ----
export async function getDashboardStats(): Promise<DashboardStats> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
  const todayStr = now.toISOString().split('T')[0];

  const { data: monthBookingsRaw, error: bookingError } = await db
    .from('bookings')
    .select('*')
    .gte('check_in', startOfMonth)
    .lte('check_in', endOfMonth)
    .neq('status', 'cancelled');
  if (bookingError) throw bookingError;

  const { data: expensesRaw, error: expenseError } = await db
    .from('expenses')
    .select('amount')
    .gte('expense_date', startOfMonth)
    .lte('expense_date', endOfMonth);
  if (expenseError) throw expenseError;

  const { data: allHomestaysRaw, error: homestayError } = await db
    .from('homestays')
    .select('id')
    .eq('is_active', true);
  if (homestayError) throw homestayError;

  const bookings = (monthBookingsRaw ?? []) as Booking[];
  const month_revenue = bookings.reduce((sum, b) => sum + (b.total_price || 0), 0);
  const month_bookings = bookings.length;
  const month_guests = bookings.reduce((sum, b) => sum + (b.guest_count || 0), 0);
  const today_revenue = bookings
    .filter(b => b.check_in === todayStr)
    .reduce((sum, b) => sum + (b.total_price || 0), 0);
  const total_expenses = ((expensesRaw ?? []) as any[]).reduce((sum, e) => sum + (e.amount || 0), 0);
  const net_profit = month_revenue - total_expenses;
  const daysInMonth = parseInt(endOfMonth.split('-')[2]);
  const totalHomestays = ((allHomestaysRaw ?? []) as any[]).length;
  const occupancy_rate = totalHomestays > 0
    ? Math.min(100, Math.round((month_bookings / (totalHomestays * daysInMonth)) * 100 * 10))
    : 0;

  return { today_revenue, month_revenue, month_bookings, month_guests, occupancy_rate, net_profit };
}

// ---- Revenue Data (last 6 months) ----
export async function getRevenueData(): Promise<RevenueData[]> {
  const now = new Date();
  const results: RevenueData[] = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0];
    const monthLabel = date.toLocaleDateString('id-ID', { month: 'short' });

    const { data } = await db
      .from('bookings')
      .select('total_price, guest_count')
      .gte('check_in', startOfMonth)
      .lte('check_in', endOfMonth)
      .neq('status', 'cancelled');

    const bookings = (data ?? []) as any[];
    results.push({
      month: monthLabel,
      revenue: bookings.reduce((sum, b) => sum + (b.total_price || 0), 0),
      bookings: bookings.length,
      guests: bookings.reduce((sum, b) => sum + (b.guest_count || 0), 0),
    });
  }

  return results;
}

// ---- Top Homestay Performance ----
export async function getHomestayPerformance(): Promise<HomestayPerformance[]> {
  const { data: bookingsRaw, error } = await db
    .from('bookings')
    .select('homestay_id, total_price, guest_count, homestay:homestays(name)')
    .neq('status', 'cancelled');
  if (error) throw error;

  const performanceMap: Record<string, HomestayPerformance> = {};

  ((bookingsRaw ?? []) as any[]).forEach((b: any) => {
    if (!b.homestay_id) return;
    if (!performanceMap[b.homestay_id]) {
      performanceMap[b.homestay_id] = {
        homestay_id: b.homestay_id,
        homestay_name: b.homestay?.name || 'Unknown',
        total_revenue: 0,
        total_bookings: 0,
        total_guests: 0,
        occupancy_rate: 0,
      };
    }
    performanceMap[b.homestay_id].total_revenue += b.total_price || 0;
    performanceMap[b.homestay_id].total_bookings += 1;
    performanceMap[b.homestay_id].total_guests += b.guest_count || 0;
  });

  return Object.values(performanceMap).sort((a, b) => b.total_revenue - a.total_revenue);
}

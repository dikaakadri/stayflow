// ============================================================
// StayFlow - Mock Data
// Used when Supabase is not configured (demo mode)
// ============================================================

import type { Homestay, Booking, Customer, Expense, DashboardStats, RevenueData, HomestayPerformance, BookingNotification } from '@/types';

// ---- Homestays ----
export const MOCK_HOMESTAYS: Homestay[] = [
  {
    id: 'hs-001',
    name: 'Zethira Homestay',
    base_price: 750000,
    capacity: 8,
    extra_person_fee: 30000,
    commission_rate: 10,
    karpet_price: 50000,
    extrabed_price: 75000,
    address: 'Jl. Pantai Indah No. 12, Bali',
    is_active: true,
    image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'hs-002',
    name: 'Serena Villa',
    base_price: 1200000,
    capacity: 12,
    extra_person_fee: 50000,
    commission_rate: 15,
    karpet_price: 60000,
    extrabed_price: 100000,
    address: 'Jl. Raya Ubud No. 45, Bali',
    is_active: true,
    image_url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80',
    created_at: '2025-02-01T00:00:00Z',
    updated_at: '2025-02-01T00:00:00Z',
  },
  {
    id: 'hs-003',
    name: 'Awan Residence',
    base_price: 500000,
    capacity: 6,
    extra_person_fee: 25000,
    commission_rate: 10,
    karpet_price: 40000,
    extrabed_price: 60000,
    address: 'Jl. Sunset Road No. 78, Bali',
    is_active: true,
    image_url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80',
    created_at: '2025-03-01T00:00:00Z',
    updated_at: '2025-03-01T00:00:00Z',
  },
  {
    id: 'hs-004',
    name: 'Nusa Cottage',
    base_price: 450000,
    capacity: 4,
    extra_person_fee: 35000,
    commission_rate: 12,
    karpet_price: 45000,
    extrabed_price: 70000,
    address: 'Jl. Nusa Dua No. 33, Bali',
    is_active: false,
    image_url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
    created_at: '2025-04-01T00:00:00Z',
    updated_at: '2025-04-01T00:00:00Z',
  },
];

// ---- Customers ----
export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'cust-001', name: 'Ahmad Rizki', phone: '081234567890', total_stays: 5, created_at: '2025-01-15T00:00:00Z', updated_at: '2026-06-01T00:00:00Z' },
  { id: 'cust-002', name: 'Siti Nurhaliza', phone: '081298765432', total_stays: 3, created_at: '2025-02-20T00:00:00Z', updated_at: '2026-05-15T00:00:00Z' },
  { id: 'cust-003', name: 'Budi Santoso', phone: '085612345678', total_stays: 7, created_at: '2025-03-10T00:00:00Z', updated_at: '2026-06-10T00:00:00Z' },
  { id: 'cust-004', name: 'Dewi Lestari', phone: '087845678901', total_stays: 2, created_at: '2025-06-01T00:00:00Z', updated_at: '2026-04-20T00:00:00Z' },
  { id: 'cust-005', name: 'Rina Wati', phone: '089912345678', total_stays: 4, created_at: '2025-08-01T00:00:00Z', updated_at: '2026-06-12T00:00:00Z' },
];

// Helper: get today and nearby dates
const today = new Date();
const todayStr = today.toISOString().split('T')[0];
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const yesterdayStr = yesterday.toISOString().split('T')[0];
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().split('T')[0];
const dayAfter = new Date(today);
dayAfter.setDate(today.getDate() + 2);
const dayAfterStr = dayAfter.toISOString().split('T')[0];
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
const nextWeekStr = nextWeek.toISOString().split('T')[0];

// ---- Bookings ----
export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk-001',
    homestay_id: 'hs-001',
    customer_id: 'cust-001',
    guest_name: 'Ahmad Rizki',
    guest_phone: '081234567890',
    check_in: todayStr,
    check_out: dayAfterStr,
    guest_count: 10,
    base_price: 750000,
    extra_charge: 60000,
    extras: [{ id: 'karpet', name: 'Karpet', price: 50000, quantity: 1 }],
    extras_charge: 100000,
    total_price: 910000,
    nights: 2,
    status: 'paid',
    notes: 'Acara keluarga',
    created_at: yesterdayStr + 'T10:00:00Z',
    updated_at: yesterdayStr + 'T10:00:00Z',
    homestay: MOCK_HOMESTAYS[0],
    customer: MOCK_CUSTOMERS[0],
  },
  {
    id: 'bk-002',
    homestay_id: 'hs-002',
    customer_id: 'cust-002',
    guest_name: 'Siti Nurhaliza',
    guest_phone: '081298765432',
    check_in: tomorrowStr,
    check_out: nextWeekStr,
    guest_count: 8,
    base_price: 1200000,
    extra_charge: 0,
    extras: [{ id: 'extrabed', name: 'Extra Bed', price: 75000, quantity: 2 }],
    extras_charge: 900000,
    total_price: 2100000,
    nights: 6,
    status: 'dp',
    notes: 'Liburan bersama teman',
    created_at: todayStr + 'T08:00:00Z',
    updated_at: todayStr + 'T08:00:00Z',
    homestay: MOCK_HOMESTAYS[1],
    customer: MOCK_CUSTOMERS[1],
  },
  {
    id: 'bk-003',
    homestay_id: 'hs-003',
    customer_id: 'cust-003',
    guest_name: 'Budi Santoso',
    guest_phone: '085612345678',
    check_in: yesterdayStr,
    check_out: todayStr,
    guest_count: 6,
    base_price: 500000,
    extra_charge: 0,
    extras: [],
    extras_charge: 0,
    total_price: 500000,
    nights: 1,
    status: 'paid',
    notes: null,
    created_at: '2026-06-10T14:00:00Z',
    updated_at: '2026-06-10T14:00:00Z',
    homestay: MOCK_HOMESTAYS[2],
    customer: MOCK_CUSTOMERS[2],
  },
  {
    id: 'bk-004',
    homestay_id: 'hs-001',
    customer_id: 'cust-004',
    guest_name: 'Dewi Lestari',
    guest_phone: '087845678901',
    check_in: dayAfterStr,
    check_out: nextWeekStr,
    guest_count: 5,
    base_price: 750000,
    extra_charge: 0,
    extras: [],
    extras_charge: 0,
    total_price: 750000,
    nights: 5,
    status: 'pending',
    notes: 'Minta extra kasur',
    created_at: todayStr + 'T12:00:00Z',
    updated_at: todayStr + 'T12:00:00Z',
    homestay: MOCK_HOMESTAYS[0],
    customer: MOCK_CUSTOMERS[3],
  },
  {
    id: 'bk-005',
    homestay_id: 'hs-002',
    customer_id: 'cust-005',
    guest_name: 'Rina Wati',
    guest_phone: '089912345678',
    check_in: '2026-06-01',
    check_out: '2026-06-03',
    guest_count: 15,
    base_price: 1200000,
    extra_charge: 150000,
    extras: [],
    extras_charge: 0,
    total_price: 1350000,
    nights: 2,
    status: 'paid',
    notes: null,
    created_at: '2026-05-28T09:00:00Z',
    updated_at: '2026-06-01T09:00:00Z',
    homestay: MOCK_HOMESTAYS[1],
    customer: MOCK_CUSTOMERS[4],
  },
];

// ---- Expenses ----
export const MOCK_EXPENSES: Expense[] = [
  { id: 'exp-001', homestay_id: 'hs-001', expense_date: '2026-06-01', category: 'listrik', amount: 450000, description: 'Tagihan listrik Juni', created_at: '2026-06-01T00:00:00Z', updated_at: '2026-06-01T00:00:00Z', homestay: MOCK_HOMESTAYS[0] },
  { id: 'exp-002', homestay_id: 'hs-001', expense_date: '2026-06-01', category: 'air', amount: 150000, description: 'Tagihan PDAM Juni', created_at: '2026-06-01T00:00:00Z', updated_at: '2026-06-01T00:00:00Z', homestay: MOCK_HOMESTAYS[0] },
  { id: 'exp-003', homestay_id: 'hs-002', expense_date: '2026-06-05', category: 'laundry', amount: 200000, description: 'Cuci sprei & handuk', created_at: '2026-06-05T00:00:00Z', updated_at: '2026-06-05T00:00:00Z', homestay: MOCK_HOMESTAYS[1] },
  { id: 'exp-004', homestay_id: 'hs-002', expense_date: '2026-06-08', category: 'kebersihan', amount: 300000, description: 'Deep cleaning kamar', created_at: '2026-06-08T00:00:00Z', updated_at: '2026-06-08T00:00:00Z', homestay: MOCK_HOMESTAYS[1] },
  { id: 'exp-005', homestay_id: 'hs-003', expense_date: '2026-06-10', category: 'perbaikan', amount: 750000, description: 'Perbaikan AC kamar 2', created_at: '2026-06-10T00:00:00Z', updated_at: '2026-06-10T00:00:00Z', homestay: MOCK_HOMESTAYS[2] },
  { id: 'exp-006', homestay_id: 'hs-001', expense_date: '2026-06-12', category: 'lainnya', amount: 100000, description: 'Beli sabun & shampoo', created_at: '2026-06-12T00:00:00Z', updated_at: '2026-06-12T00:00:00Z', homestay: MOCK_HOMESTAYS[0] },
];

// ---- Dashboard Stats ----
export const MOCK_DASHBOARD_STATS: DashboardStats = {
  today_revenue: 810000,
  month_revenue: 4610000,
  month_bookings: 5,
  month_guests: 44,
  occupancy_rate: 72,
  net_profit: 2660000,
};

// ---- Revenue Data (Monthly) ----
export const MOCK_REVENUE_DATA: RevenueData[] = [
  { month: 'Jan', revenue: 3200000, bookings: 8, guests: 45 },
  { month: 'Feb', revenue: 2800000, bookings: 6, guests: 38 },
  { month: 'Mar', revenue: 4100000, bookings: 10, guests: 62 },
  { month: 'Apr', revenue: 3600000, bookings: 9, guests: 50 },
  { month: 'Mei', revenue: 5200000, bookings: 12, guests: 78 },
  { month: 'Jun', revenue: 4610000, bookings: 5, guests: 44 },
];

// ---- Top Performance ----
export const MOCK_PERFORMANCE: HomestayPerformance[] = [
  { homestay_id: 'hs-002', homestay_name: 'Serena Villa', total_revenue: 15800000, total_bookings: 18, total_guests: 156, occupancy_rate: 85 },
  { homestay_id: 'hs-001', homestay_name: 'Zethira Homestay', total_revenue: 12500000, total_bookings: 22, total_guests: 140, occupancy_rate: 78 },
  { homestay_id: 'hs-003', homestay_name: 'Awan Residence', total_revenue: 8200000, total_bookings: 15, total_guests: 80, occupancy_rate: 65 },
];

// ---- Notifications ----
export function getMockNotifications(): BookingNotification[] {
  const notifications: BookingNotification[] = [];
  
  MOCK_BOOKINGS.forEach((booking) => {
    if (booking.check_in === todayStr && booking.status !== 'cancelled') {
      notifications.push({ type: 'check_in', booking });
    }
    if (booking.check_out === todayStr && booking.status !== 'cancelled') {
      notifications.push({ type: 'check_out', booking });
    }
    if (booking.status === 'pending') {
      notifications.push({ type: 'pending', booking });
    }
  });
  
  return notifications;
}

// ---- Check if Supabase is configured ----
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co'
  );
}

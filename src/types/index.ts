// ============================================================
// StayFlow - Type Definitions
// ============================================================

// Database table types
export interface Homestay {
  id: string;
  name: string;
  base_price: number;
  capacity: number;
  extra_person_fee: number;
  commission_rate: number;
  karpet_price: number;
  extrabed_price: number;
  address: string | null;
  is_active: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string | null;
  total_stays: number;
  created_at: string;
  updated_at: string;
}

export type BookingStatus = 'pending' | 'dp' | 'paid' | 'cancelled';

// Extra Facilities
export interface ExtraFacility {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Helper to build extra facility options from a homestay's pricing
export function getExtraFacilityOptions(homestay: Homestay): Omit<ExtraFacility, 'quantity'>[] {
  return [
    { id: 'karpet', name: 'Karpet', price: homestay.karpet_price },
    { id: 'extrabed', name: 'Extra Bed', price: homestay.extrabed_price },
  ].filter(f => f.price > 0);
}

export interface Booking {
  id: string;
  homestay_id: string;
  customer_id: string | null;
  guest_name: string;
  guest_phone: string | null;
  check_in: string;
  check_out: string;
  guest_count: number;
  base_price: number;
  extra_charge: number;
  extras: ExtraFacility[];
  extras_charge: number;
  total_price: number;
  nights: number;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined relations
  homestay?: Homestay;
  customer?: Customer;
}

export type ExpenseCategory =
  | 'listrik'
  | 'air'
  | 'laundry'
  | 'kebersihan'
  | 'perbaikan'
  | 'lainnya';

export interface Expense {
  id: string;
  homestay_id: string | null;
  expense_date: string;
  category: ExpenseCategory;
  amount: number;
  description: string | null;
  created_at: string;
  updated_at: string;
  // Joined relations
  homestay?: Homestay;
}

// Form types (for create/update without auto-generated fields)
export type HomestayFormData = Omit<Homestay, 'id' | 'created_at' | 'updated_at'>;
export type CustomerFormData = Omit<Customer, 'id' | 'created_at' | 'updated_at' | 'total_stays'>;
export type BookingFormData = Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'homestay' | 'customer'>;
export type ExpenseFormData = Omit<Expense, 'id' | 'created_at' | 'updated_at' | 'homestay'>;

// Analytics types
export interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
  guests: number;
}

export interface HomestayPerformance {
  homestay_id: string;
  homestay_name: string;
  total_revenue: number;
  total_bookings: number;
  total_guests: number;
  occupancy_rate: number;
}

export interface DashboardStats {
  today_revenue: number;
  month_revenue: number;
  month_bookings: number;
  month_guests: number;
  occupancy_rate: number;
  net_profit: number;
}

export interface ReportData {
  total_revenue: number;
  total_bookings: number;
  total_guests: number;
  total_extra_revenue: number;
  total_expenses: number;
  net_profit: number;
}

// Period filter type
export type PeriodFilter = 'day' | 'week' | 'month' | 'year';

// Notification types
export interface BookingNotification {
  type: 'check_in' | 'check_out' | 'pending';
  booking: Booking;
}

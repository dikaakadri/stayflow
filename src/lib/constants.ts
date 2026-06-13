import {
  LayoutDashboard,
  CalendarCheck,
  Home,
  BarChart3,
  Settings,
  Zap,
  Droplets,
  Shirt,
  Sparkles,
  Wrench,
  MoreHorizontal,
} from 'lucide-react';
import type { BookingStatus, ExpenseCategory } from '@/types';

// ============================================================
// Navigation
// ============================================================
export const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/booking', label: 'Booking', icon: CalendarCheck },
  { href: '/homestay', label: 'Homestay', icon: Home },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
] as const;

// ============================================================
// Booking Statuses
// ============================================================
export const BOOKING_STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending', color: 'text-amber-700', bgColor: 'bg-amber-50' },
  dp: { label: 'DP', color: 'text-blue-700', bgColor: 'bg-blue-50' },
  paid: { label: 'Lunas', color: 'text-emerald-700', bgColor: 'bg-emerald-50' },
  cancelled: { label: 'Cancel', color: 'text-red-700', bgColor: 'bg-red-50' },
};

export const BOOKING_STATUSES: BookingStatus[] = ['pending', 'dp', 'paid', 'cancelled'];

// ============================================================
// Expense Categories
// ============================================================
export const EXPENSE_CATEGORY_CONFIG: Record<ExpenseCategory, { label: string; icon: typeof Zap }> = {
  listrik: { label: 'Listrik', icon: Zap },
  air: { label: 'Air', icon: Droplets },
  laundry: { label: 'Laundry', icon: Shirt },
  kebersihan: { label: 'Kebersihan', icon: Sparkles },
  perbaikan: { label: 'Perbaikan', icon: Wrench },
  lainnya: { label: 'Lainnya', icon: MoreHorizontal },
};

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'listrik', 'air', 'laundry', 'kebersihan', 'perbaikan', 'lainnya',
];

// ============================================================
// App Config
// ============================================================
export const APP_CONFIG = {
  name: 'StayFlow',
  description: 'Homestay Management System',
  themeColor: '#2563EB',
  backgroundColor: '#FFFFFF',
} as const;

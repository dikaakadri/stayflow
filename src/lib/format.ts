import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Format number to Indonesian Rupiah currency
 * @example formatCurrency(750000) => "Rp750.000"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with dots separator
 * @example formatNumber(750000) => "750.000"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

/**
 * Format date to Indonesian locale
 * @example formatDate("2026-06-13") => "13 Jun 2026"
 */
export function formatDate(dateStr: string): string {
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return format(date, 'd MMM yyyy', { locale: id });
}

/**
 * Format date to full Indonesian format
 * @example formatDateFull("2026-06-13") => "Jumat, 13 Juni 2026"
 */
export function formatDateFull(dateStr: string): string {
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return format(date, 'EEEE, d MMMM yyyy', { locale: id });
}

/**
 * Format date to relative time
 * @example formatRelative("2026-06-13") => "hari ini" or "2 hari lalu"
 */
export function formatRelativeDate(dateStr: string): string {
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  if (isToday(date)) return 'Hari ini';
  if (isYesterday(date)) return 'Kemarin';
  return formatDistanceToNow(date, { addSuffix: true, locale: id });
}

/**
 * Format phone number
 * @example formatPhone("081234567890") => "0812-3456-7890"
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length <= 4) return cleaned;
  if (cleaned.length <= 8) return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8)}`;
}

/**
 * Format short month name
 * @example formatMonthShort(0) => "Jan"
 */
export function formatMonthShort(monthIndex: number): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  return months[monthIndex] || '';
}

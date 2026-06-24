'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { id } from 'date-fns/locale';
import { getBookings, getHomestays } from '@/lib/api';
import { PageHeader } from '@/components/layout/page-header';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/format';
import type { Booking } from '@/types';
import Link from 'next/link';

const BOOKING_STATUS_LABEL: Record<string, string> = {
  paid: 'Lunas',
  dp: 'DP',
  pending: 'Pending',
  cancelled: 'Batal',
};

export default function CalendarPage() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [allHomestays, setAllHomestays] = useState<any[]>([]);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [selectedHomestay, setSelectedHomestay] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [dayBookingsPanel, setDayBookingsPanel] = useState<Booking[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [hData, bData] = await Promise.all([getHomestays(), getBookings()]);
        setAllHomestays(hData);
        setAllBookings(bData);
        if (hData.length > 0) {
          setSelectedHomestay(hData[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const bookingsForHomestay = allBookings.filter(
    b => (!selectedHomestay || b.homestay_id === selectedHomestay) && b.status !== 'cancelled'
  );

  const getBookingsForDay = (day: Date) => {
    return bookingsForHomestay.filter(b => {
      const checkIn = new Date(b.check_in + 'T00:00:00');
      const checkOut = new Date(b.check_out + 'T00:00:00');
      return day >= checkIn && day < checkOut;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-500';
      case 'dp': return 'bg-blue-500';
      case 'pending': return 'bg-amber-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-100 text-emerald-800';
      case 'dp': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDayClick = (day: Date) => {
    const bookings = getBookingsForDay(day);
    setSelectedDay(day);
    setDayBookingsPanel(bookings);
  };

  const handleAddBookingForDay = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    router.push(`/booking/new?checkIn=${dateStr}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Kalender Booking" showBack />

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="p-4 flex-1 flex flex-col pb-24">
          {/* Homestay Selector */}
          <select
            value={selectedHomestay}
            onChange={(e) => { setSelectedHomestay(e.target.value); setSelectedDay(null); }}
            className="w-full h-12 px-4 mb-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none animate-fade-in-up"
          >
            <option value="">Semua Homestay</option>
            {allHomestays.map(h => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>

          {allHomestays.length === 0 && (
            <div className="card text-center py-6 mb-4 animate-fade-in">
              <p className="text-sm font-semibold text-text-primary mb-1">Belum ada homestay</p>
              <p className="text-xs text-text-secondary mb-3">Tambahkan homestay terlebih dahulu sebelum membuat booking.</p>
              <Link href="/homestay/new" className="inline-block px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl">
                + Tambah Homestay
              </Link>
            </div>
          )}

          <div className="card flex-1 flex flex-col animate-fade-in-up delay-1">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary">
                {format(currentDate, 'MMMM yyyy', { locale: id })}
              </h2>
              <div className="flex gap-2">
                <button onClick={prevMonth} className="p-2 bg-surface rounded-lg hover:bg-surface-hover transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextMonth} className="p-2 bg-surface rounded-lg hover:bg-surface-hover transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 mb-2">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-text-secondary py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 flex-1">
              {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="p-1" />
              ))}
              
              {daysInMonth.map((day) => {
                const dayBookings = getBookingsForDay(day);
                const isBooked = dayBookings.length > 0;
                const hasConflict = dayBookings.length > 1;
                const isSelected = selectedDay && isSameDay(day, selectedDay);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => handleDayClick(day)}
                    className={cn(
                      'p-1 flex flex-col items-center justify-center rounded-lg relative transition-all min-h-[48px] cursor-pointer active:scale-95',
                      isToday(day) ? 'border-2 border-primary' : '',
                      isSelected ? 'ring-2 ring-primary bg-primary-light/40' : '',
                      isBooked && !hasConflict && !isSelected ? 'bg-blue-50 border border-blue-200' : '',
                      hasConflict && !isSelected ? 'bg-red-50 border border-red-200' : '',
                      !isBooked && !isSelected && !isToday(day) ? 'bg-surface hover:bg-surface-hover' : ''
                    )}
                  >
                    <span className={cn(
                      'text-sm font-medium z-10',
                      isToday(day) ? 'text-primary font-bold' : 'text-text-primary',
                      hasConflict ? 'text-red-700' : '',
                      isSelected ? 'text-primary font-bold' : ''
                    )}>
                      {format(day, 'd')}
                    </span>
                    
                    {/* Status Indicators */}
                    <div className="flex gap-0.5 mt-0.5 z-10">
                      {dayBookings.slice(0, 3).map((b, idx) => (
                        <div key={idx} className={cn('w-1.5 h-1.5 rounded-full', getStatusColor(b.status))} />
                      ))}
                      {dayBookings.length > 3 && <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-4 border-t border-border-light flex flex-wrap gap-3">
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                 <span className="text-xs text-text-secondary">Lunas</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                 <span className="text-xs text-text-secondary">DP</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                 <span className="text-xs text-text-secondary">Pending</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                 <span className="text-xs text-text-secondary">Bentrok</span>
               </div>
            </div>
          </div>

          {/* Day Detail Panel — appears when a date is clicked */}
          {selectedDay && (
            <div className="mt-4 card animate-fade-in-up">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-text-primary">
                  {format(selectedDay, 'EEEE, d MMMM yyyy', { locale: id })}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAddBookingForDay(selectedDay)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg active:scale-95 transition-all"
                  >
                    <Plus size={14} />
                    Booking
                  </button>
                  <button onClick={() => setSelectedDay(null)} className="p-1 text-text-tertiary hover:text-text-secondary">
                    <X size={16} />
                  </button>
                </div>
              </div>

              {dayBookingsPanel.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-xs text-text-secondary">Tidak ada booking pada tanggal ini</p>
                  <button
                    onClick={() => handleAddBookingForDay(selectedDay)}
                    className="mt-2 text-xs text-primary font-semibold"
                  >
                    + Tambah booking untuk tanggal ini
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {dayBookingsPanel.map(b => (
                    <Link key={b.id} href={`/booking/${b.id}`} className="block">
                      <div className="flex items-center gap-3 p-3 bg-surface rounded-xl hover:bg-surface-hover transition-colors">
                        <div className={cn('w-2 h-8 rounded-full flex-shrink-0', getStatusColor(b.status))} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-text-primary truncate">{b.guest_name}</p>
                          <p className="text-xs text-text-secondary">{b.homestay?.name} • {b.guest_count} tamu</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', getStatusBadge(b.status))}>
                            {BOOKING_STATUS_LABEL[b.status]}
                          </span>
                          <p className="text-xs text-text-secondary mt-0.5">{formatCurrency(b.total_price)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* FAB - Add New Booking */}
      <Link href="/booking/new" className="fab">
        <Plus size={24} />
      </Link>
    </div>
  );
}

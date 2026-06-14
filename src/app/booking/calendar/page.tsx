'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { id } from 'date-fns/locale';
import { getBookings, getHomestays } from '@/lib/store';
import { PageHeader } from '@/components/layout/page-header';
import { cn } from '@/lib/utils';
import type { Booking } from '@/types';
import { useMounted } from '@/hooks/use-mounted';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const mounted = useMounted();
  const allHomestays = getHomestays();
  const [selectedHomestay, setSelectedHomestay] = useState(allHomestays[0]?.id || '');

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const bookingsForHomestay = getBookings().filter(b => b.homestay_id === selectedHomestay && b.status !== 'cancelled');

  const getBookingsForDay = (day: Date) => {
    return bookingsForHomestay.filter(b => {
      const checkIn = new Date(b.check_in);
      const checkOut = new Date(b.check_out);
      return day >= checkIn && day < checkOut;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-500';
      case 'dp': return 'bg-blue-500';
      case 'pending': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Kalender Booking" showBack />

      {!mounted ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="p-4 flex-1 flex flex-col">
          {/* Homestay Selector */}
          <select
            value={selectedHomestay}
            onChange={(e) => setSelectedHomestay(e.target.value)}
            className="w-full h-12 px-4 mb-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none animate-fade-in-up"
          >
            {allHomestays.map(h => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>

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
            
            {daysInMonth.map((day, i) => {
              const dayBookings = getBookingsForDay(day);
              const isBooked = dayBookings.length > 0;
              const hasConflict = dayBookings.length > 1;

              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    'p-1 flex flex-col items-center justify-center rounded-lg relative transition-all min-h-[48px]',
                    !isSameMonth(day, currentDate) ? 'opacity-50' : '',
                    isToday(day) ? 'bg-primary-light/30 border border-primary/30' : 'bg-surface hover:bg-surface-hover',
                    isBooked && !hasConflict ? 'bg-blue-50 border border-blue-100' : '',
                    hasConflict ? 'bg-red-50 border border-red-200' : ''
                  )}
                >
                  <span className={cn(
                    'text-sm font-medium z-10',
                    isToday(day) ? 'text-primary' : 'text-text-primary',
                    hasConflict ? 'text-red-700' : ''
                  )}>
                    {format(day, 'd')}
                  </span>
                  
                  {/* Status Indicators */}
                  <div className="flex gap-1 mt-1 z-10">
                    {dayBookings.slice(0, 3).map((b, idx) => (
                      <div key={idx} className={cn('w-1.5 h-1.5 rounded-full', getStatusColor(b.status))} />
                    ))}
                    {dayBookings.length > 3 && <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
                  </div>
                </div>
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
        </div>
      )}
    </div>
  );
}

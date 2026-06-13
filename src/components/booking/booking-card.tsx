'use client';

import Link from 'next/link';
import { Calendar, Users, ChevronRight } from 'lucide-react';
import type { Booking } from '@/types';
import { StatusBadge } from './status-badge';
import { formatCurrency, formatDate } from '@/lib/format';

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  return (
    <Link href={`/booking/${booking.id}`}>
      <div className="card card-hover">
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-text-primary truncate">
              {booking.guest_name}
            </h3>
            <p className="text-xs text-primary font-medium truncate">
              {booking.homestay?.name}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <StatusBadge status={booking.status} />
            <ChevronRight size={16} className="text-text-tertiary" />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <Calendar size={13} />
            <span>{formatDate(booking.check_in)} - {formatDate(booking.check_out)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <Users size={13} />
            <span>{booking.guest_count} orang</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-light">
          <span className="text-xs text-text-secondary">
            {booking.nights} malam
          </span>
          <span className="text-sm font-bold text-primary">
            {formatCurrency(booking.total_price)}
          </span>
        </div>
      </div>
    </Link>
  );
}

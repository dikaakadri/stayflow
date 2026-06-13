'use client';

import { cn } from '@/lib/utils';
import { BOOKING_STATUS_CONFIG } from '@/lib/constants';
import type { BookingStatus } from '@/types';

interface StatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = BOOKING_STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        config.bgColor,
        config.color,
        className
      )}
    >
      {config.label}
    </span>
  );
}

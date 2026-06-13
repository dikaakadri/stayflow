'use client';

import { LogIn, LogOut, Clock, ChevronRight } from 'lucide-react';
import type { BookingNotification } from '@/types';
import { cn } from '@/lib/utils';

interface NotificationsProps {
  notifications: BookingNotification[];
}

const NOTIF_CONFIG = {
  check_in: {
    icon: LogIn,
    label: 'Check-in Hari Ini',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  check_out: {
    icon: LogOut,
    label: 'Check-out Hari Ini',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  pending: {
    icon: Clock,
    label: 'Menunggu Konfirmasi',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
};

export function Notifications({ notifications }: NotificationsProps) {
  if (notifications.length === 0) return null;

  return (
    <div className="space-y-2 animate-fade-in-up opacity-0 delay-1">
      {notifications.map((notif, idx) => {
        const config = NOTIF_CONFIG[notif.type];
        const Icon = config.icon;

        return (
          <div
            key={`${notif.type}-${notif.booking.id}-${idx}`}
            className={cn(
              'flex items-center gap-3 p-3 rounded-xl border',
              config.bg,
              config.border
            )}
          >
            <div
              className={cn(
                'flex items-center justify-center w-9 h-9 rounded-lg bg-white/80',
              )}
            >
              <Icon size={18} className={config.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn('text-xs font-semibold', config.color)}>
                {config.label}
              </p>
              <p className="text-sm font-medium text-text-primary truncate">
                {notif.booking.guest_name}
              </p>
              <p className="text-xs text-text-secondary truncate">
                {notif.booking.homestay?.name}
              </p>
            </div>
            <ChevronRight size={16} className="text-text-tertiary" />
          </div>
        );
      })}
    </div>
  );
}

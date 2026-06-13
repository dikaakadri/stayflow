'use client';

import { Trophy, TrendingUp } from 'lucide-react';
import type { HomestayPerformance } from '@/types';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';

interface TopPerformanceProps {
  data: HomestayPerformance[];
}

export function TopPerformance({ data }: TopPerformanceProps) {
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="card animate-fade-in-up opacity-0 delay-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50">
          <Trophy size={16} className="text-amber-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Top Performance</h3>
          <p className="text-xs text-text-secondary">Pendapatan tertinggi</p>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={item.homestay_id}
            className={cn(
              'flex items-center gap-3 p-3 rounded-xl transition-colors',
              index === 0 ? 'bg-amber-50/60' : 'bg-surface'
            )}
          >
            <span className="text-lg">{medals[index] || `#${index + 1}`}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">
                {item.homestay_name}
              </p>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-text-secondary">
                  {item.total_bookings} booking
                </span>
                <span className="text-xs text-text-secondary">
                  {item.total_guests} tamu
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">
                {formatCurrency(item.total_revenue)}
              </p>
              <div className="flex items-center gap-0.5 justify-end mt-0.5">
                <TrendingUp size={10} className="text-emerald-500" />
                <span className="text-[10px] text-emerald-600 font-medium">
                  {item.occupancy_rate}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

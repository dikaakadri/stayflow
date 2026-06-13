'use client';

import { cn } from '@/lib/utils';
import type { PeriodFilter as PeriodFilterType } from '@/types';

interface PeriodFilterProps {
  value: PeriodFilterType;
  onChange: (value: PeriodFilterType) => void;
  className?: string;
}

const PERIODS: { value: PeriodFilterType; label: string }[] = [
  { value: 'day', label: 'Hari' },
  { value: 'week', label: 'Minggu' },
  { value: 'month', label: 'Bulan' },
  { value: 'year', label: 'Tahun' },
];

export function PeriodFilter({ value, onChange, className }: PeriodFilterProps) {
  return (
    <div className={cn('flex p-1 bg-surface border border-border-light rounded-xl', className)}>
      {PERIODS.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={cn(
            'flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all',
            value === period.value
              ? 'bg-white text-primary shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}

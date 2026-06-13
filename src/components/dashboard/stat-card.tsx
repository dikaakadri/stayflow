'use client';

import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: string;
  trendUp?: boolean;
  className?: string;
  delay?: number;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  iconColor = 'text-primary',
  iconBg = 'bg-primary-light',
  trend,
  trendUp,
  className,
  delay = 0,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'card animate-fade-in-up opacity-0',
        className
      )}
      style={{ animationDelay: `${delay * 0.05}s` }}
    >
      <div className="flex items-start justify-between mb-2">
        <div
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-xl',
            iconBg
          )}
        >
          <Icon size={20} className={iconColor} />
        </div>
        {trend && (
          <span
            className={cn(
              'text-xs font-semibold px-2 py-0.5 rounded-full',
              trendUp
                ? 'text-emerald-700 bg-emerald-50'
                : 'text-red-700 bg-red-50'
            )}
          >
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <p className="text-[22px] font-bold text-text-primary leading-tight animate-count-up">
        {value}
      </p>
      <p className="text-xs text-text-secondary mt-0.5">{label}</p>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function BottomNav() {
  const pathname = usePathname();
  // Prevent hydration mismatch: render only after client mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="bottom-nav pb-safe bg-primary border-t border-primary-dark" suppressHydrationWarning>
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2" suppressHydrationWarning>
        {NAV_ITEMS.map((item) => {
          const isActive = mounted
            ? item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href)
            : false;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 w-16 py-1 rounded-xl transition-all duration-200',
                isActive
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/75'
              )}
            >
              <div
                suppressHydrationWarning
                className={cn(
                  'flex items-center justify-center w-10 h-8 rounded-xl transition-all duration-200',
                  isActive && 'bg-white/20 scale-105'
                )}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className="transition-all duration-200"
                />
              </div>
              <span
                className={cn(
                  'text-[10px] leading-tight transition-all duration-200',
                  isActive ? 'font-semibold' : 'font-medium'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, showBack = false, action, className }: PageHeaderProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        'sticky top-0 z-30 bg-primary backdrop-blur-md border-b border-primary-dark',
        className
      )}
    >
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <div className="flex items-center gap-3 min-w-0">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-9 h-9 -ml-1 rounded-xl hover:bg-white/15 active:scale-95 transition-all"
              aria-label="Back"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-white truncate">{title}</h1>
            {subtitle && (
              <p className="text-xs text-white/70 truncate">{subtitle}</p>
            )}
          </div>
        </div>
        {action && <div className="flex-shrink-0 text-white">{action}</div>}
      </div>
    </header>
  );
}

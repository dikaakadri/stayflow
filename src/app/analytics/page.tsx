'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PeriodFilter } from '@/components/analytics/period-filter';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { BookingChart, GuestChart } from '@/components/dashboard/booking-chart';
import { TopPerformance } from '@/components/dashboard/top-performance';
import { MOCK_REVENUE_DATA, MOCK_PERFORMANCE } from '@/lib/mock-data';
import type { PeriodFilter as PeriodFilterType } from '@/types';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<PeriodFilterType>('month');

  return (
    <div>
      <PageHeader title="Analytics" />

      <div className="px-4 pt-4 pb-6 space-y-5">
        <div className="animate-fade-in-up opacity-0 delay-1">
          <PeriodFilter value={period} onChange={setPeriod} />
        </div>

        <RevenueChart data={MOCK_REVENUE_DATA} />
        
        <div className="grid grid-cols-1 gap-5">
          <BookingChart data={MOCK_REVENUE_DATA} />
          <GuestChart data={MOCK_REVENUE_DATA} />
        </div>

        <TopPerformance data={MOCK_PERFORMANCE} />
      </div>
    </div>
  );
}

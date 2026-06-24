'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PeriodFilter } from '@/components/analytics/period-filter';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { BookingChart, GuestChart } from '@/components/dashboard/booking-chart';
import { TopPerformance } from '@/components/dashboard/top-performance';
import { getRevenueData, getHomestayPerformance } from '@/lib/api';
import type { PeriodFilter as PeriodFilterType, RevenueData, HomestayPerformance } from '@/types';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<PeriodFilterType>('month');
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [performance, setPerformance] = useState<HomestayPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [revData, perfData] = await Promise.all([
          getRevenueData(),
          getHomestayPerformance(),
        ]);
        setRevenueData(revData);
        setPerformance(perfData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      <PageHeader title="Analytics" />

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="px-4 pt-4 pb-6 space-y-5">
          <div className="animate-fade-in-up opacity-0 delay-1">
            <PeriodFilter value={period} onChange={setPeriod} />
          </div>

          <RevenueChart data={revenueData} />
          
          <div className="grid grid-cols-1 gap-5">
            <BookingChart data={revenueData} />
            <GuestChart data={revenueData} />
          </div>

          <TopPerformance data={performance} />
        </div>
      )}
    </div>
  );
}

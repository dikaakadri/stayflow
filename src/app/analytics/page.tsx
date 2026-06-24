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
  const [errorMsg, setErrorMsg] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const [revData, perfData] = await Promise.all([
        getRevenueData(),
        getHomestayPerformance(),
      ]);
      setRevenueData(revData);
      setPerformance(perfData);
    } catch (err: any) {
      console.error('Analytics load error:', err);
      setErrorMsg(err?.message || 'Gagal memuat data analytics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <PageHeader title="Analytics" />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-text-tertiary mt-2">Memuat data...</p>
        </div>
      ) : errorMsg ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-6">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-3">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-base font-bold text-text-primary mb-1">Gagal Memuat Data</h2>
          <p className="text-xs text-red-500 font-mono bg-red-50 px-3 py-2 rounded-lg max-w-xs break-all mb-4">{errorMsg}</p>
          <button
            onClick={loadData}
            className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all"
          >
            Coba Lagi
          </button>
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

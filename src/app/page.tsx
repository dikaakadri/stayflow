'use client';

import { useState, useMemo } from 'react';
import { Banknote, CalendarCheck, Users, TrendingUp, Percent, Wallet, Building } from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { BookingChart, GuestChart } from '@/components/dashboard/booking-chart';
import { TopPerformance } from '@/components/dashboard/top-performance';
import { Notifications } from '@/components/dashboard/notifications';
import { formatCurrency, formatNumber } from '@/lib/format';
import {
  MOCK_DASHBOARD_STATS,
  MOCK_REVENUE_DATA,
  MOCK_PERFORMANCE,
  MOCK_HOMESTAYS,
  getMockNotifications,
} from '@/lib/mock-data';

export default function DashboardPage() {
  const [selectedHomestay, setSelectedHomestay] = useState('all');
  
  const stats = MOCK_DASHBOARD_STATS;
  const revenueData = MOCK_REVENUE_DATA;
  const performance = MOCK_PERFORMANCE;
  const notifications = getMockNotifications();

  // Hitung "Pendapatan Saya" berdasarkan komisi
  const myRevenue = useMemo(() => {
    if (selectedHomestay === 'all') {
      // Rata-rata komisi 12% dari total jika all
      return stats.month_revenue * 0.12; 
    }
    const homestay = MOCK_HOMESTAYS.find(h => h.id === selectedHomestay);
    // Asumsi revenue dari stat ini kalau spesifik. Untuk demo, kita pakai stat.month_revenue * (commission/100)
    const commissionRate = homestay?.commission_rate || 10;
    return stats.month_revenue * (commissionRate / 100);
  }, [selectedHomestay, stats.month_revenue]);

  const today = new Date();
  const greeting = today.getHours() < 12 ? 'Selamat Pagi' : today.getHours() < 17 ? 'Selamat Siang' : 'Selamat Malam';
  const dateStr = today.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="px-4 pt-4 pb-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-5 animate-fade-in-up opacity-0">
        <div>
          <h1 className="text-xl font-bold text-text-primary">{greeting} 👋</h1>
          <p className="text-xs text-text-secondary mt-0.5">{dateStr}</p>
        </div>
      </div>

      {/* Filter Homestay */}
      <div className="mb-5 animate-fade-in-up opacity-0 delay-1">
        <div className="relative">
           <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
           <select 
             value={selectedHomestay}
             onChange={(e) => setSelectedHomestay(e.target.value)}
             className="w-full h-12 pl-10 pr-4 bg-white dark:bg-surface border border-border-light rounded-xl text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none shadow-sm"
           >
              <option value="all">Semua Homestay</option>
              {MOCK_HOMESTAYS.map(h => (
                <option key={h.id} value={h.id}>{h.name} (Komisi {h.commission_rate}%)</option>
              ))}
           </select>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="mb-5">
          <Notifications notifications={notifications} />
        </div>
      )}

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <StatCard
          label="Pendapatan Saya"
          value={formatCurrency(myRevenue)}
          icon={TrendingUp}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          delay={1}
        />
        <StatCard
          label="Omset Kotor"
          value={formatCurrency(stats.month_revenue)}
          icon={Wallet}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          trend="12%"
          trendUp={true}
          delay={2}
        />
        <StatCard
          label="Total Booking"
          value={formatNumber(stats.month_bookings)}
          icon={CalendarCheck}
          iconColor="text-violet-600"
          iconBg="bg-violet-50"
          delay={3}
        />
        <StatCard
          label="Total Tamu"
          value={`${formatNumber(stats.month_guests)} org`}
          icon={Users}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          delay={4}
        />
        <StatCard
          label="Occupancy Rate"
          value={`${stats.occupancy_rate}%`}
          icon={Percent}
          iconColor="text-sky-600"
          iconBg="bg-sky-50"
          delay={5}
        />
        <StatCard
          label="Laba Bersih"
          value={formatCurrency(stats.net_profit)}
          icon={TrendingUp}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          trend="8%"
          trendUp={true}
          delay={6}
        />
      </div>

      {/* Revenue Chart */}
      <div className="mb-5">
        <RevenueChart data={revenueData} />
      </div>

      {/* Booking & Guest Charts */}
      <div className="space-y-5 mb-5">
        <BookingChart data={revenueData} />
        <GuestChart data={revenueData} />
      </div>

      {/* Top Performance */}
      <TopPerformance data={performance} />
    </div>
  );
}

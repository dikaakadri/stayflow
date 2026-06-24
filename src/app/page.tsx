'use client';

import { useState, useMemo, useEffect } from 'react';
import { Banknote, CalendarCheck, Users, TrendingUp, Percent, Wallet, Building } from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { BookingChart, GuestChart } from '@/components/dashboard/booking-chart';
import { TopPerformance } from '@/components/dashboard/top-performance';
import { Notifications } from '@/components/dashboard/notifications';
import { formatCurrency, formatNumber } from '@/lib/format';
import { getHomestays, getBookings, getDashboardStats, getRevenueData, getHomestayPerformance } from '@/lib/api';
import type { Homestay, Booking, DashboardStats, RevenueData, HomestayPerformance, BookingNotification } from '@/types';

function buildNotifications(bookings: Booking[]): BookingNotification[] {
  const todayStr = new Date().toISOString().split('T')[0];
  const notifications: BookingNotification[] = [];

  bookings.forEach((booking) => {
    if (booking.check_in === todayStr && booking.status !== 'cancelled') {
      notifications.push({ type: 'check_in', booking });
    }
    if (booking.check_out === todayStr && booking.status !== 'cancelled') {
      notifications.push({ type: 'check_out', booking });
    }
    if (booking.status === 'pending') {
      notifications.push({ type: 'pending', booking });
    }
  });

  return notifications;
}

export default function DashboardPage() {
  const [selectedHomestay, setSelectedHomestay] = useState('all');
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [performance, setPerformance] = useState<HomestayPerformance[]>([]);
  const [notifications, setNotifications] = useState<BookingNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorDetail, setErrorDetail] = useState('');
  // Greeting & date calculated client-side to avoid hydration mismatch
  const [greeting, setGreeting] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [hsData, bkData, statsData, revData, perfData] = await Promise.all([
          getHomestays(),
          getBookings(),
          getDashboardStats(),
          getRevenueData(),
          getHomestayPerformance(),
        ]);
        setHomestays(hsData);
        setStats(statsData);
        setRevenueData(revData);
        setPerformance(perfData);
        setNotifications(buildNotifications(bkData));
      } catch (err: any) {
        const detail = err?.message || JSON.stringify(err) || 'Unknown error';
        console.error('Dashboard load error:', detail, err);
        setErrorDetail(detail);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();

    // Calculate greeting & date on client only to avoid SSR hydration mismatch
    const now = new Date();
    const hour = now.getHours();
    setGreeting(hour < 12 ? 'Selamat Pagi' : hour < 17 ? 'Selamat Siang' : 'Selamat Malam');
    setDateStr(now.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }));
  }, []);

  // Hitung "Pendapatan Saya" berdasarkan komisi
  const myRevenue = useMemo(() => {
    if (!stats) return 0;
    if (selectedHomestay === 'all') {
      return stats.month_revenue * 0.12;
    }
    const homestay = homestays.find(h => h.id === selectedHomestay);
    const commissionRate = homestay?.commission_rate || 10;
    return stats.month_revenue * (commissionRate / 100);
  }, [selectedHomestay, stats, homestays]);



  return (
    <div className="px-4 pt-4 pb-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-5 animate-fade-in-up opacity-0">
        <div>
          <h1 className="text-xl font-bold text-text-primary">{greeting} 👋</h1>
          <p className="text-xs text-text-secondary mt-0.5">{dateStr}</p>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : hasError ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-3">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-base font-bold text-text-primary mb-1">Gagal Memuat Data</h2>
          <p className="text-sm text-text-secondary mb-2">
            Tidak dapat terhubung ke database. Pastikan kredensial Supabase di <code className="font-mono bg-surface px-1 rounded">.env.local</code> sudah benar, lalu restart server.
          </p>
          {errorDetail && (
            <p className="text-xs text-red-500 font-mono bg-red-50 px-3 py-2 rounded-lg max-w-xs break-all">{errorDetail}</p>
          )}
        </div>
      ) : (
        <>
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
                {homestays.map(h => (
                  <option key={h.id} value={h.id}>{h.name} (Komisi {h.commission_rate || 10}%)</option>
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
            value={formatCurrency(stats?.month_revenue || 0)}
            icon={Wallet}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
            delay={2}
          />
          <StatCard
            label="Total Booking"
            value={formatNumber(stats?.month_bookings || 0)}
            icon={CalendarCheck}
            iconColor="text-violet-600"
            iconBg="bg-violet-50"
            delay={3}
          />
          <StatCard
            label="Total Tamu"
            value={`${formatNumber(stats?.month_guests || 0)} org`}
            icon={Users}
            iconColor="text-amber-600"
            iconBg="bg-amber-50"
            delay={4}
          />
          <StatCard
            label="Occupancy Rate"
            value={`${stats?.occupancy_rate || 0}%`}
            icon={Percent}
            iconColor="text-sky-600"
            iconBg="bg-sky-50"
            delay={5}
          />
          <StatCard
            label="Laba Bersih"
            value={formatCurrency(stats?.net_profit || 0)}
            icon={TrendingUp}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
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

        <TopPerformance data={performance} />
        </>
      )}
    </div>
  );
}

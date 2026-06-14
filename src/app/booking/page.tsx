'use client';

import { useState } from 'react';
import { Plus, Search, Calendar } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { BookingCard } from '@/components/booking/booking-card';
import { getBookings } from '@/lib/store';
import type { BookingStatus } from '@/types';
import { cn } from '@/lib/utils';
import { useMounted } from '@/hooks/use-mounted';

const TABS: { key: BookingStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'Semua' },
  { key: 'pending', label: 'Pending' },
  { key: 'dp', label: 'DP' },
  { key: 'paid', label: 'Lunas' },
  { key: 'cancelled', label: 'Cancel' },
];

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState<BookingStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const mounted = useMounted();

  const allBookings = getBookings();

  if (!mounted) return null;

  const filteredBookings = allBookings.filter((b) => {
    const matchStatus = activeTab === 'all' || b.status === activeTab;
    const matchSearch =
      !search ||
      b.guest_name.toLowerCase().includes(search.toLowerCase()) ||
      b.homestay?.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div>
      <PageHeader
        title="Booking"
        action={
          <Link
            href="/booking/calendar"
            className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-surface transition-all"
          >
            <Calendar size={20} className="text-text-secondary" />
          </Link>
        }
      />

      <div className="px-4 pt-4 pb-6">
        {/* Search */}
        <div className="relative mb-4 animate-fade-in">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="text"
            placeholder="Cari nama tamu atau homestay..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar animate-fade-in">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all',
                activeTab === tab.key
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface text-text-secondary hover:bg-surface-hover'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Booking List */}
        <div className="space-y-3">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-text-secondary">Tidak ada booking ditemukan</p>
            </div>
          ) : (
            filteredBookings.map((booking, idx) => (
              <div
                key={booking.id}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <BookingCard booking={booking} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* FAB - New Booking */}
      <Link href="/booking/new" className="fab">
        <Plus size={24} />
      </Link>
    </div>
  );
}

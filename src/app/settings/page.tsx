'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Wallet, Users, FileText, Info, ChevronRight, Settings as SettingsIcon } from 'lucide-react';

import { ThemeToggle } from '@/components/layout/theme-toggle';

const SETTINGS_MENU = [
  { href: '/settings/expenses', label: 'Pengeluaran', icon: Wallet, color: 'text-rose-500', bg: 'bg-rose-50' },
  { href: '/settings/customers', label: 'Data Customer', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
  { href: '/settings/reports', label: 'Laporan Keuangan', icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" />

      <div className="px-4 pt-4 pb-6 space-y-6">
        {/* App Info */}
        <div className="card animate-fade-in-up opacity-0 delay-1">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border-light">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white">
              <SettingsIcon size={24} />
            </div>
            <div>
              <h3 className="font-bold text-text-primary">StayFlow</h3>
              <p className="text-xs text-text-secondary">Homestay Management System</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Versi</span>
              <span className="font-medium text-text-primary">1.1.0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Database</span>
              <span className="font-medium text-text-primary text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Demo Mode
              </span>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="animate-fade-in-up opacity-0 delay-2">
           <ThemeToggle />
        </div>

        {/* Menu Grid */}
        <div className="space-y-3">
          {SETTINGS_MENU.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 p-4 bg-white border border-border-light rounded-2xl hover:bg-surface active:scale-[0.98] transition-all animate-fade-in-up opacity-0"
                style={{ animationDelay: `${(idx + 3) * 0.1}s` }}
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${item.bg}`}>
                  <Icon size={24} className={item.color} />
                </div>
                <span className="flex-1 font-semibold text-text-primary">{item.label}</span>
                <ChevronRight size={20} className="text-text-tertiary" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';

import { PageHeader } from '@/components/layout/page-header';
import { MOCK_CUSTOMERS } from '@/lib/mock-data';
import { formatPhone } from '@/lib/format';
import { User, Phone } from 'lucide-react';
import Link from 'next/link';

export default function CustomersPage() {
  return (
    <div>
      <PageHeader title="Data Customer" showBack />

      <div className="px-4 pt-4 pb-6 space-y-3">
        {MOCK_CUSTOMERS.map((customer, idx) => (
          <Link
            key={customer.id}
            href={`/settings/customers/${customer.id}`}
            className="block animate-fade-in-up opacity-0"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="card card-hover flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex-shrink-0">
                <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-text-primary truncate">{customer.name}</h3>
                {customer.phone && (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Phone size={12} className="text-text-tertiary" />
                    <span className="text-xs text-text-secondary">{formatPhone(customer.phone)}</span>
                  </div>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-xs font-semibold text-primary">{customer.total_stays}x Menginap</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

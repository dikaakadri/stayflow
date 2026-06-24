'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { getCustomers } from '@/lib/api';
import { formatPhone } from '@/lib/format';
import { User, Phone } from 'lucide-react';
import Link from 'next/link';
import type { Customer } from '@/types';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCustomers();
        setCustomers(data);
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
      <PageHeader title="Data Customer" showBack />

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="px-4 pt-4 pb-6 space-y-3">
          {customers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-text-secondary">Belum ada data customer</p>
            </div>
          ) : (
            customers.map((customer, idx) => (
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
            ))
          )}
        </div>
      )}
    </div>
  );
}

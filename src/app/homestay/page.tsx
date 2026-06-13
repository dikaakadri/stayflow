'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { HomestayCard } from '@/components/homestay/homestay-card';
import { MOCK_HOMESTAYS } from '@/lib/mock-data';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function HomestayPage() {
  const [homestays, setHomestays] = useState(MOCK_HOMESTAYS);

  const handleDelete = (id: string) => {
    // In real app, call Supabase delete here
    setHomestays(prev => prev.filter(h => h.id !== id));
  };

  return (
    <div>
      <PageHeader title="Daftar Homestay" />

      <div className="px-4 pt-4 pb-6 space-y-3">
        {homestays.map((homestay, idx) => (
          <div
            key={homestay.id}
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <HomestayCard homestay={homestay} onDelete={handleDelete} />
          </div>
        ))}
      </div>

      <Link href="/homestay/new" className="fab">
        <Plus size={24} />
      </Link>
    </div>
  );
}

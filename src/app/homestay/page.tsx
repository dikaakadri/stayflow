'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { HomestayCard } from '@/components/homestay/homestay-card';
import { getHomestays, deleteHomestay } from '@/lib/api';
import type { Homestay } from '@/types';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useMounted } from '@/hooks/use-mounted';

export default function HomestayPage() {
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getHomestays();
        setHomestays(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteHomestay(id);
      setHomestays(homestays.filter(h => h.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <PageHeader
        title="Daftar Homestay"
        action={
          <Link
            href="/homestay/new"
            className="flex items-center justify-center w-9 h-9 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all shadow-sm"
          >
            <Plus size={20} />
          </Link>
        }
      />

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="px-4 pt-4 pb-6 space-y-4">
          {homestays.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              Belum ada homestay.
            </div>
          ) : (
            homestays.map((homestay, idx) => (
              <div
                key={homestay.id}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <HomestayCard homestay={homestay} onDelete={handleDelete} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

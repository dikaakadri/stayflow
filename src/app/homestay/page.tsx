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
  const [errorMsg, setErrorMsg] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const data = await getHomestays();
      setHomestays(data);
    } catch (err: any) {
      console.error('Homestay load error:', err);
      setErrorMsg(err?.message || 'Gagal memuat data homestay');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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

'use client';

import { use, useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { HomestayForm } from '@/components/homestay/homestay-form';
import { getHomestays } from '@/lib/api';
import type { Homestay } from '@/types';
import { useMounted } from '@/hooks/use-mounted';

export default function EditHomestayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [homestay, setHomestay] = useState<Homestay | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getHomestays();
        const found = data.find((h) => h.id === id);
        setHomestay(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Detail Homestay" showBack />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!homestay) {
    return (
      <div>
        <PageHeader title="Detail Homestay" showBack />
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-sm text-text-secondary">Homestay tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Edit Homestay" showBack />
      <HomestayForm initialData={homestay} isEdit />
    </div>
  );
}

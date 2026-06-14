'use client';

import { use } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { HomestayForm } from '@/components/homestay/homestay-form';
import { getHomestays } from '@/lib/store';

export default function EditHomestayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const homestay = getHomestays().find((h) => h.id === id);

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

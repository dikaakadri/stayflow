'use client';

import { PageHeader } from '@/components/layout/page-header';
import { HomestayForm } from '@/components/homestay/homestay-form';

export default function NewHomestayPage() {
  return (
    <div>
      <PageHeader title="Tambah Homestay" showBack />
      <HomestayForm />
    </div>
  );
}

'use client';

import { PageHeader } from '@/components/layout/page-header';
import { ExpenseForm } from '@/components/expenses/expense-form';

export default function NewExpensePage() {
  return (
    <div>
      <PageHeader title="Tambah Pengeluaran" showBack />
      <ExpenseForm />
    </div>
  );
}

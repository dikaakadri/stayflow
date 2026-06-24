'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { EXPENSE_CATEGORY_CONFIG } from '@/lib/constants';
import { formatCurrency, formatDate } from '@/lib/format';
import { Plus } from 'lucide-react';
import { getExpenses } from '@/lib/api';
import type { Expense } from '@/types';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div>
      <PageHeader title="Pengeluaran" showBack />

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="px-4 pt-4 pb-6 space-y-4">
          <div className="card bg-rose-50 border-rose-100 animate-fade-in-up opacity-0">
            <p className="text-sm font-semibold text-rose-800 mb-1">Total Pengeluaran Bulan Ini</p>
            <p className="text-2xl font-bold text-rose-600">{formatCurrency(totalExpense)}</p>
          </div>

          {expenses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-text-secondary">Belum ada pengeluaran yang dicatat</p>
            </div>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense, idx) => {
                const config = EXPENSE_CATEGORY_CONFIG[expense.category];
                const Icon = config.icon;
                
                return (
                  <div key={expense.id} className="card card-hover flex items-center gap-3 animate-fade-in-up opacity-0" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface">
                      <Icon size={20} className="text-text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-text-primary truncate">{expense.description || config.label}</h3>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-text-secondary">
                        <span>{formatDate(expense.expense_date)}</span>
                        {expense.homestay && <span>• {expense.homestay.name}</span>}
                      </div>
                    </div>
                    <span className="text-sm font-bold text-rose-600 flex-shrink-0">
                      -{formatCurrency(expense.amount)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <Link href="/settings/expenses/new" className="fab">
        <Plus size={24} />
      </Link>
    </div>
  );
}

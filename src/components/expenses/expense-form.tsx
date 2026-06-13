'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { EXPENSE_CATEGORIES, EXPENSE_CATEGORY_CONFIG } from '@/lib/constants';
import { MOCK_HOMESTAYS } from '@/lib/mock-data';

export function ExpenseForm() {
  const router = useRouter();
  const [homestayId, setHomestayId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => router.push('/settings/expenses'), 1500);
  };

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4 animate-fade-in-up">
          <Check size={32} className="text-emerald-500" />
        </div>
        <h2 className="text-lg font-bold text-text-primary animate-fade-in-up delay-1">
          Pengeluaran Tersimpan!
        </h2>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 pt-4 pb-6 space-y-4">
      <div className="animate-fade-in-up opacity-0 delay-1">
        <label className="block text-xs font-semibold text-text-secondary mb-1.5">Homestay</label>
        <select
          value={homestayId}
          onChange={(e) => setHomestayId(e.target.value)}
          className="w-full h-12 px-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
        >
          <option value="">Semua Homestay (Umum)</option>
          {MOCK_HOMESTAYS.map(h => (
            <option key={h.id} value={h.id}>{h.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 animate-fade-in-up opacity-0 delay-2">
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">Tanggal *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full h-12 px-3 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">Kategori *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            required
            className="w-full h-12 px-3 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
          >
            {EXPENSE_CATEGORIES.map(c => (
              <option key={c} value={c}>{EXPENSE_CATEGORY_CONFIG[c].label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="animate-fade-in-up opacity-0 delay-3">
        <label className="block text-xs font-semibold text-text-secondary mb-1.5">Nominal (Rp) *</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="0"
          className="w-full h-12 px-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="animate-fade-in-up opacity-0 delay-4">
        <label className="block text-xs font-semibold text-text-secondary mb-1.5">Keterangan</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Rincian pengeluaran..."
          className="w-full p-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full h-13 bg-primary text-white font-semibold rounded-xl text-sm shadow-sm hover:bg-primary-dark active:scale-[0.98] transition-all mt-4 animate-fade-in-up opacity-0 delay-5"
      >
        Simpan Pengeluaran
      </button>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Download } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleExport = async (type: 'pdf' | 'excel') => {
    setLoading(true);
    // Simulate generation time
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(`Laporan berhasil di-export ke ${type.toUpperCase()}!`);
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div>
      <PageHeader title="Laporan Keuangan" showBack />

      <div className="px-4 pt-4 pb-6 space-y-5">
        <div className="card animate-fade-in-up opacity-0 delay-1">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Pilih Periode</h3>
          <select className="w-full h-12 px-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none mb-4">
             <option value="this_month">Bulan Ini</option>
             <option value="last_month">Bulan Lalu</option>
             <option value="this_year">Tahun Ini</option>
             <option value="all_time">Semua Waktu</option>
          </select>
          
          <div className="space-y-2 border-t border-border-light pt-4">
             <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Total Pendapatan</span>
                <span className="font-semibold text-text-primary">{formatCurrency(4610000)}</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Total Pengeluaran</span>
                <span className="font-semibold text-rose-600">-{formatCurrency(1950000)}</span>
             </div>
             <div className="flex justify-between text-base pt-2 border-t border-border-light mt-2">
                <span className="font-bold text-text-primary">Laba Bersih</span>
                <span className="font-bold text-emerald-600">{formatCurrency(2660000)}</span>
             </div>
          </div>
        </div>

        <div className="space-y-3 animate-fade-in-up opacity-0 delay-2">
           <h3 className="text-sm font-semibold text-text-primary pl-1">Export Laporan</h3>
           <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleExport('pdf')}
                disabled={loading}
                className="flex items-center justify-center gap-2 h-12 bg-rose-50 text-rose-700 font-semibold rounded-xl hover:bg-rose-100 disabled:opacity-50 transition-colors"
              >
                 <Download size={18} />
                 PDF
              </button>
              <button 
                onClick={() => handleExport('excel')}
                disabled={loading}
                className="flex items-center justify-center gap-2 h-12 bg-emerald-50 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-100 disabled:opacity-50 transition-colors"
              >
                 <Download size={18} />
                 Excel
              </button>
           </div>
        </div>

        {success && (
           <div className="p-3 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-xl text-center animate-fade-in">
              {success}
           </div>
        )}
      </div>
    </div>
  );
}

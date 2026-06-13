'use client';

import { useRouter } from 'next/navigation';
import { MapPin, Trash2, ChevronRight } from 'lucide-react';
import type { Homestay } from '@/types';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface HomestayCardProps {
  homestay: Homestay;
  bookingCount?: number;
  totalRevenue?: number;
  onDelete?: (id: string) => void;
}

export function HomestayCard({ homestay, bookingCount = 0, totalRevenue = 0, onDelete }: HomestayCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/homestay/${homestay.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (confirm(`Yakin ingin menghapus homestay "${homestay.name}"? Data yang dihapus tidak bisa dikembalikan.`)) {
      onDelete?.(homestay.id);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="card card-hover p-0 overflow-hidden group cursor-pointer"
    >
      {homestay.image_url && (
         <div className="relative w-full h-32 bg-surface">
            <Image 
              src={homestay.image_url} 
              alt={homestay.name}
              fill
              className="object-cover"
            />
         </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-text-primary truncate">
              {homestay.name}
            </h3>
            {homestay.address && (
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-text-tertiary flex-shrink-0" />
                <p className="text-xs text-text-secondary truncate">
                  {homestay.address}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span
              className={cn(
                'text-xs font-semibold px-2 py-0.5 rounded-full',
                homestay.is_active
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-gray-100 text-gray-500'
              )}
            >
              {homestay.is_active ? 'Aktif' : 'Nonaktif'}
            </span>
            
            {onDelete ? (
               <button 
                 type="button"
                 onClick={handleDelete}
                 className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors ml-1 z-10 relative"
               >
                 <Trash2 size={16} />
               </button>
            ) : (
              <ChevronRight size={16} className="text-text-tertiary" />
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border-light">
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-0.5">Harga</p>
            <p className="text-xs font-bold text-text-primary">
              {formatCurrency(homestay.base_price)}
            </p>
          </div>
          <div className="text-center border-x border-border-light">
            <p className="text-xs text-text-secondary mb-0.5">Kapasitas</p>
            <p className="text-xs font-bold text-text-primary">
              {homestay.capacity} org
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-0.5">Komisi</p>
            <p className="text-xs font-bold text-primary">
              {homestay.commission_rate}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

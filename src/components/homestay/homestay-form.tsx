'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Homestay } from '@/types';
import { Check } from 'lucide-react';
import { MOCK_HOMESTAYS } from '@/lib/mock-data';

interface HomestayFormProps {
  initialData?: Homestay;
  isEdit?: boolean;
}

export function HomestayForm({ initialData, isEdit }: HomestayFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || '');
  const [basePrice, setBasePrice] = useState(initialData?.base_price.toString() || '');
  const [capacity, setCapacity] = useState(initialData?.capacity.toString() || '');
  const [extraPersonFee, setExtraPersonFee] = useState(initialData?.extra_person_fee.toString() || '');
  const [commissionRate, setCommissionRate] = useState(initialData?.commission_rate?.toString() || '10');
  const [karpetPrice, setKarpetPrice] = useState(initialData?.karpet_price?.toString() || '50000');
  const [extrabedPrice, setExtrabedPrice] = useState(initialData?.extrabed_price?.toString() || '75000');
  const [address, setAddress] = useState(initialData?.address || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newHomestay = {
      name,
      address,
      base_price: Number(basePrice),
      capacity: Number(capacity),
      extra_person_fee: Number(extraPersonFee),
      commission_rate: Number(commissionRate),
      karpet_price: Number(karpetPrice),
      extrabed_price: Number(extrabedPrice),
      is_active: isActive,
      updated_at: new Date().toISOString(),
    };

    if (isEdit && initialData?.id) {
      const idx = MOCK_HOMESTAYS.findIndex(h => h.id === initialData.id);
      if (idx >= 0) {
        MOCK_HOMESTAYS[idx] = { ...MOCK_HOMESTAYS[idx], ...newHomestay } as any;
      }
    } else {
      MOCK_HOMESTAYS.push({
        ...newHomestay,
        id: `HS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        image_url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
        created_at: new Date().toISOString(),
      } as any);
    }

    setSaved(true);
    setTimeout(() => router.push('/homestay'), 1500);
  };

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4 animate-fade-in-up">
          <Check size={32} className="text-emerald-500" />
        </div>
        <h2 className="text-lg font-bold text-text-primary animate-fade-in-up delay-1">
          Homestay {isEdit ? 'Diperbarui' : 'Tersimpan'}!
        </h2>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 pt-4 pb-6 space-y-4">
      <div className="animate-fade-in-up opacity-0 delay-1">
        <label className="block text-xs font-semibold text-text-secondary mb-1.5">Nama Homestay *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full h-12 px-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 animate-fade-in-up opacity-0 delay-2">
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">Harga Pokok (Rp) *</label>
          <input
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            required
            className="w-full h-12 px-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">Kapasitas (Orang) *</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            className="w-full h-12 px-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 animate-fade-in-up opacity-0 delay-3">
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">Extra/Orang (Rp) *</label>
          <input
            type="number"
            value={extraPersonFee}
            onChange={(e) => setExtraPersonFee(e.target.value)}
            required
            className="w-full h-12 px-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">Komisi (%)</label>
          <input
            type="number"
            value={commissionRate}
            onChange={(e) => setCommissionRate(e.target.value)}
            required
            min="0"
            max="100"
            className="w-full h-12 px-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Extra Facility Pricing */}
      <div className="animate-fade-in-up opacity-0 delay-3">
        <p className="text-xs font-semibold text-text-secondary mb-2">Harga Fasilitas Tambahan (/malam)</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-text-tertiary mb-1">🟫 Karpet (Rp)</label>
            <input
              type="number"
              value={karpetPrice}
              onChange={(e) => setKarpetPrice(e.target.value)}
              placeholder="0"
              className="w-full h-12 px-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-text-tertiary mb-1">🛏️ Extra Bed (Rp)</label>
            <input
              type="number"
              value={extrabedPrice}
              onChange={(e) => setExtrabedPrice(e.target.value)}
              placeholder="0"
              className="w-full h-12 px-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      <div className="animate-fade-in-up opacity-0 delay-4">
        <label className="block text-xs font-semibold text-text-secondary mb-1.5">URL Foto Homestay</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
          className="w-full h-12 px-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        {imageUrl && (
           <div className="mt-2 w-full h-32 rounded-xl overflow-hidden relative bg-surface">
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
           </div>
        )}
      </div>

      <div className="animate-fade-in-up opacity-0 delay-5">
        <label className="block text-xs font-semibold text-text-secondary mb-1.5">Alamat</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
          className="w-full p-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-surface border border-border-light rounded-xl animate-fade-in-up opacity-0 delay-6">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Status Aktif</h3>
          <p className="text-xs text-text-secondary mt-0.5">Homestay bisa dibooking</p>
        </div>
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className={`w-12 h-6 rounded-full transition-colors relative ${isActive ? 'bg-emerald-500' : 'bg-gray-300'}`}
        >
          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${isActive ? 'translate-x-6' : 'translate-x-0.5'}`} />
        </button>
      </div>

      <button
        type="submit"
        className="w-full h-13 bg-primary text-white font-semibold rounded-xl text-sm shadow-sm hover:bg-primary-dark active:scale-[0.98] transition-all mt-4 animate-fade-in-up opacity-0 delay-6"
      >
        Simpan Homestay
      </button>
    </form>
  );
}

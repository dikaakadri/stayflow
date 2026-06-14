'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/page-header';
import { usePriceCalculator } from '@/hooks/use-price-calculator';
import { getHomestays, getBookings, addBooking, updateBooking } from '@/lib/store';
import { formatCurrency } from '@/lib/format';
import { Check, AlertTriangle, Plus, Minus } from 'lucide-react';
import type { BookingStatus, ExtraFacility } from '@/types';
import { getExtraFacilityOptions } from '@/types';

interface BookingFormProps {
  initialData?: {
    id?: string;
    homestayId: string;
    guestName: string;
    guestPhone: string;
    checkIn: string;
    checkOut: string;
    guestCount: number;
    notes: string;
    status: BookingStatus;
    extras: ExtraFacility[];
  };
  isEdit?: boolean;
}

export default function BookingFormPage({ initialData, isEdit = false }: BookingFormProps) {
  const router = useRouter();
  const [homestayId, setHomestayId] = useState(initialData?.homestayId || '');
  const [guestName, setGuestName] = useState(initialData?.guestName || '');
  const [guestPhone, setGuestPhone] = useState(initialData?.guestPhone || '');
  const [checkIn, setCheckIn] = useState(initialData?.checkIn || '');
  const [checkOut, setCheckOut] = useState(initialData?.checkOut || '');
  const [guestCount, setGuestCount] = useState(initialData?.guestCount || 1);
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [status, setStatus] = useState<BookingStatus>(initialData?.status || 'pending');
  const [extras, setExtras] = useState<ExtraFacility[]>(initialData?.extras || []);
  const [saved, setSaved] = useState(false);

  const activeHomestays = getHomestays().filter((h) => h.is_active);
  const selectedHomestay = activeHomestays.find((h) => h.id === homestayId) || null;

  // Reset extras when homestay changes (use per-homestay pricing)
  const handleHomestayChange = (newId: string) => {
    setHomestayId(newId);
    const hs = activeHomestays.find(h => h.id === newId);
    if (hs) {
      const options = getExtraFacilityOptions(hs);
      setExtras(options.map(opt => ({ ...opt, quantity: 0 })));
    } else {
      setExtras([]);
    }
  };

  const activeExtras = extras.filter(e => e.quantity > 0);

  const price = usePriceCalculator({
    homestay: selectedHomestay,
    checkIn,
    checkOut,
    guestCount,
    extras: activeExtras,
  });

  // Double booking detection
  const conflicts = useMemo(() => {
    if (!homestayId || !checkIn || !checkOut) return [];
    const allBookings = getBookings();
    return allBookings.filter(
      (b) =>
        b.homestay_id === homestayId &&
        b.status !== 'cancelled' &&
        b.check_in < checkOut &&
        b.check_out > checkIn &&
        (!isEdit || b.id !== initialData?.id)
    );
  }, [homestayId, checkIn, checkOut, isEdit, initialData?.id]);

  const updateExtraQuantity = (id: string, delta: number) => {
    setExtras(prev => prev.map(ext =>
      ext.id === id ? { ...ext, quantity: Math.max(0, ext.quantity + delta) } : ext
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookingData = {
      homestay_id: homestayId,
      guest_name: guestName,
      guest_phone: guestPhone,
      check_in: checkIn,
      check_out: checkOut,
      guest_count: guestCount,
      notes: notes,
      status: status,
      extras: extras.filter(e => e.quantity > 0),
      extras_charge: activeExtras.reduce((sum, ext) => sum + (ext.price * ext.quantity * price.nights), 0),
      base_price: selectedHomestay?.base_price || 0,
      extra_charge: price.extraChargeTotal,
      nights: price.nights,
      total_price: price.totalPrice,
      updated_at: new Date().toISOString(),
    };

    if (isEdit && initialData?.id) {
      updateBooking(initialData.id, bookingData);
    } else {
      addBooking({
        ...bookingData,
        id: `BK-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        created_at: new Date().toISOString(),
        homestay: selectedHomestay || undefined,
      } as any);
    }

    setSaved(true);
    setTimeout(() => {
      router.refresh();
      router.push('/booking');
    }, 1500);
  };

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4 animate-fade-in-up">
          <Check size={32} className="text-emerald-500" />
        </div>
        <h2 className="text-lg font-bold text-text-primary animate-fade-in-up delay-1">
          Booking {isEdit ? 'Diperbarui' : 'Tersimpan'}!
        </h2>
        <p className="text-sm text-text-secondary mt-1 animate-fade-in-up delay-2">
          Mengalihkan ke daftar booking...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 pt-4 pb-6 space-y-4">
      {/* Pilih Homestay */}
      <div className="animate-fade-in-up opacity-0 delay-1">
        <label className="block text-xs font-semibold text-text-secondary mb-1.5">
          Pilih Homestay *
        </label>
        <select
          value={homestayId}
          onChange={(e) => handleHomestayChange(e.target.value)}
          required
          className="w-full h-12 px-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
        >
          <option value="">-- Pilih Homestay --</option>
          {activeHomestays.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name} - {formatCurrency(h.base_price)}/malam
            </option>
          ))}
        </select>
      </div>

      {/* Nama & Telepon */}
      <div className="grid grid-cols-1 gap-4 animate-fade-in-up opacity-0 delay-2">
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
            Nama Penyewa *
          </label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
            placeholder="Nama lengkap"
            className="w-full h-12 px-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
            Nomor HP
          </label>
          <input
            type="tel"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            placeholder="08xxxxxxxxxx"
            className="w-full h-12 px-4 bg-surface border border-border-light rounded-xl text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Tanggal */}
      <div className="grid grid-cols-2 gap-3 animate-fade-in-up opacity-0 delay-2">
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
            Check In *
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
            className="w-full h-12 px-3 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
            Check Out *
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            min={checkIn}
            className="w-full h-12 px-3 bg-surface border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Conflict Warning */}
      {conflicts.length > 0 && (
        <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl animate-fade-in">
          <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-800">Tanggal bentrok!</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Ada {conflicts.length} booking pada tanggal yang sama untuk homestay ini.
            </p>
          </div>
        </div>
      )}

      {/* Jumlah Tamu */}
      <div className="animate-fade-in-up opacity-0 delay-3">
        <label className="block text-xs font-semibold text-text-secondary mb-1.5">
          Jumlah Orang *
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
            className="w-12 h-12 flex items-center justify-center bg-surface border border-border-light rounded-xl text-lg font-bold text-text-primary active:scale-95 transition-all"
          >
            −
          </button>
          <span className="w-12 text-center text-lg font-bold text-text-primary">
            {guestCount}
          </span>
          <button
            type="button"
            onClick={() => setGuestCount(guestCount + 1)}
            className="w-12 h-12 flex items-center justify-center bg-surface border border-border-light rounded-xl text-lg font-bold text-text-primary active:scale-95 transition-all"
          >
            +
          </button>
          {selectedHomestay && (
            <span className="text-xs text-text-secondary ml-2">
              Kapasitas: {selectedHomestay.capacity} orang
            </span>
          )}
        </div>
      </div>

      {/* Extra Facilities */}
      <div className="animate-fade-in-up opacity-0 delay-3">
        <label className="block text-xs font-semibold text-text-secondary mb-2">
          Fasilitas Tambahan
        </label>
        <div className="space-y-2">
          {extras.map((ext) => (
            <div key={ext.id} className="flex items-center justify-between p-3 bg-surface border border-border-light rounded-xl">
              <div>
                <p className="text-sm font-semibold text-text-primary">{ext.name}</p>
                <p className="text-xs text-text-secondary">{formatCurrency(ext.price)}/malam</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateExtraQuantity(ext.id, -1)}
                  className="w-8 h-8 flex items-center justify-center bg-white border border-border-light rounded-lg active:scale-95 transition-all"
                >
                  <Minus size={14} className="text-text-secondary" />
                </button>
                <span className={`w-8 text-center text-sm font-bold ${ext.quantity > 0 ? 'text-primary' : 'text-text-tertiary'}`}>
                  {ext.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateExtraQuantity(ext.id, 1)}
                  className="w-8 h-8 flex items-center justify-center bg-white border border-border-light rounded-lg active:scale-95 transition-all"
                >
                  <Plus size={14} className="text-text-secondary" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Pembayaran */}
      <div className="animate-fade-in-up opacity-0 delay-3">
        <label className="block text-xs font-semibold text-text-secondary mb-1.5">
          Status Pembayaran
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(['pending', 'dp', 'paid', 'cancelled'] as BookingStatus[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`h-10 rounded-xl text-xs font-semibold transition-all ${
                status === s
                  ? s === 'pending'
                    ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-300'
                    : s === 'dp'
                    ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-300'
                    : s === 'paid'
                    ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-300'
                    : 'bg-red-100 text-red-800 ring-2 ring-red-300'
                  : 'bg-surface text-text-secondary'
              }`}
            >
              {s === 'pending' ? 'Pending' : s === 'dp' ? 'DP' : s === 'paid' ? 'Lunas' : 'Cancel'}
            </button>
          ))}
        </div>
      </div>

      {/* Catatan */}
      <div className="animate-fade-in-up opacity-0 delay-3">
        <label className="block text-xs font-semibold text-text-secondary mb-1.5">
          Catatan
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Catatan tambahan..."
          rows={3}
          className="w-full px-4 py-3 bg-surface border border-border-light rounded-xl text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
        />
      </div>

      {/* Price Calculator */}
      {selectedHomestay && checkIn && checkOut && (
        <div className="card bg-primary-light/30 border-primary/20 animate-fade-in-up opacity-0 delay-4">
          <h3 className="text-sm font-bold text-text-primary mb-3">
            Rincian Harga
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">
                Harga Pokok ({price.nights} malam)
              </span>
              <span className="font-semibold text-text-primary">
                {formatCurrency(price.basePriceTotal)}
              </span>
            </div>
            {price.extraPersonCount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">
                  Extra {price.extraPersonCount} org × {formatCurrency(selectedHomestay.extra_person_fee)} × {price.nights} mlm
                </span>
                <span className="font-semibold text-amber-600">
                  +{formatCurrency(price.extraChargeTotal)}
                </span>
              </div>
            )}
            {activeExtras.map((ext) => (
              <div key={ext.id} className="flex justify-between text-sm">
                <span className="text-text-secondary">
                  {ext.name} ×{ext.quantity} × {price.nights} mlm
                </span>
                <span className="font-semibold text-violet-600">
                  +{formatCurrency(ext.price * ext.quantity * price.nights)}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-base pt-2 border-t border-primary/20">
              <span className="font-bold text-text-primary">Total</span>
              <span className="font-bold text-primary text-lg">
                {formatCurrency(price.totalPrice)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!homestayId || !guestName || !checkIn || !checkOut}
        className="w-full h-13 bg-primary text-white font-semibold rounded-xl text-sm shadow-sm hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
      >
        {isEdit ? 'Simpan Perubahan' : 'Simpan Booking'}
      </button>
    </form>
  );
}

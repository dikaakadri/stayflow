'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { StatusBadge } from '@/components/booking/status-badge';
import { getBookings, updateBookingStatus } from '@/lib/store';
import { formatCurrency, formatDate, formatPhone } from '@/lib/format';
import { Calendar, Users, Phone, MessageSquare, Home, Clock, Package, Pencil, RefreshCw, Check } from 'lucide-react';
import type { BookingStatus } from '@/types';

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const booking = getBookings().find((b) => b.id === id);
  const [currentStatus, setCurrentStatus] = useState<BookingStatus | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusSaved, setStatusSaved] = useState(false);

  if (!booking) {
    return (
      <div>
        <PageHeader title="Detail Booking" showBack />
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-sm text-text-secondary">Booking tidak ditemukan</p>
        </div>
      </div>
    );
  }

  const displayStatus = currentStatus || booking.status;

  const handleUpdateStatus = (newStatus: BookingStatus) => {
    setCurrentStatus(newStatus);
    
    // Save to localStorage so changes persist
    updateBookingStatus(id, newStatus);

    setShowStatusModal(false);
    setStatusSaved(true);
    setTimeout(() => setStatusSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader title="Detail Booking" showBack />

      <div className="px-4 pt-4 pb-6 space-y-4">
        {/* Status Saved Toast */}
        {statusSaved && (
          <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl animate-fade-in">
            <Check size={16} className="text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">Status berhasil diperbarui!</span>
          </div>
        )}

        {/* Guest Info */}
        <div className="card animate-fade-in-up opacity-0 delay-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-base font-bold text-text-primary">{booking.guest_name}</h2>
              {booking.guest_phone && (
                <div className="flex items-center gap-1.5 mt-1">
                  <Phone size={12} className="text-text-tertiary" />
                  <span className="text-xs text-text-secondary">{formatPhone(booking.guest_phone)}</span>
                </div>
              )}
            </div>
            <StatusBadge status={displayStatus} />
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-primary-light/40 rounded-lg">
            <Home size={14} className="text-primary" />
            <span className="text-sm font-semibold text-primary">{booking.homestay?.name}</span>
          </div>
        </div>

        {/* Dates */}
        <div className="card animate-fade-in-up opacity-0 delay-2">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-3">Jadwal</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-secondary mb-1">Check In</p>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-emerald-500" />
                <span className="text-sm font-semibold text-text-primary">{formatDate(booking.check_in)}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1">Check Out</p>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-red-500" />
                <span className="text-sm font-semibold text-text-primary">{formatDate(booking.check_out)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border-light">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-text-tertiary" />
              <span className="text-sm text-text-secondary">{booking.nights} malam</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-text-tertiary" />
              <span className="text-sm text-text-secondary">{booking.guest_count} orang</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="card animate-fade-in-up opacity-0 delay-3">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-3">Rincian Biaya</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Harga Pokok × {booking.nights} malam</span>
              <span className="font-medium text-text-primary">{formatCurrency(booking.base_price * booking.nights)}</span>
            </div>
            {booking.extra_charge > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Biaya Extra Person</span>
                <span className="font-medium text-amber-600">+{formatCurrency(booking.extra_charge)}</span>
              </div>
            )}
            {booking.extras && booking.extras.length > 0 && booking.extras.map((ext) => (
              <div key={ext.id} className="flex justify-between text-sm">
                <span className="text-text-secondary flex items-center gap-1.5">
                  <Package size={12} className="text-violet-500" />
                  {ext.name} ×{ext.quantity} × {booking.nights} mlm
                </span>
                <span className="font-medium text-violet-600">
                  +{formatCurrency(ext.price * ext.quantity * booking.nights)}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-base pt-2 border-t border-border-light">
              <span className="font-bold text-text-primary">Total</span>
              <span className="font-bold text-primary text-lg">{formatCurrency(booking.total_price)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="card animate-fade-in-up opacity-0 delay-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={14} className="text-text-tertiary" />
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Catatan</h3>
            </div>
            <p className="text-sm text-text-primary">{booking.notes}</p>
          </div>
        )}

        {/* Status Update Modal */}
        {showStatusModal && (
          <div className="card animate-fade-in border-primary/30 bg-primary-light/20">
            <h3 className="text-sm font-bold text-text-primary mb-3">Ubah Status Pembayaran</h3>
            <div className="grid grid-cols-2 gap-2">
              {(['pending', 'dp', 'paid', 'cancelled'] as BookingStatus[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleUpdateStatus(s)}
                  className={`h-12 rounded-xl text-sm font-semibold transition-all ${
                    s === 'pending'
                      ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      : s === 'dp'
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      : s === 'paid'
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  {s === 'pending' ? 'Pending' : s === 'dp' ? 'DP' : s === 'paid' ? 'Lunas' : 'Cancel'}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowStatusModal(false)}
              className="w-full mt-2 h-12 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-xl"
            >
              Batal
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in-up opacity-0 delay-5">
          <Link
            href={`/booking/${booking.id}/edit`}
            className="h-12 bg-surface border border-border-light rounded-xl text-sm font-semibold text-text-primary hover:bg-surface-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Pencil size={16} />
            Edit Booking
          </Link>
          <button
            type="button"
            onClick={() => setShowStatusModal(!showStatusModal)}
            className="h-12 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}

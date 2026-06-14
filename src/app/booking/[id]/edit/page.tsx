'use client';

import { use, useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import BookingFormPage from '@/components/booking/booking-form';
import { getBooking } from '@/lib/api';
import type { Booking } from '@/types';
import { getExtraFacilityOptions } from '@/types';

export default function EditBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getBooking(id);
        setBooking(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Edit Booking" showBack />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div>
        <PageHeader title="Edit Booking" showBack />
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-sm text-text-secondary">Booking tidak ditemukan</p>
        </div>
      </div>
    );
  }

  // Merge existing extras with all options from this homestay
  const homestayOptions = booking.homestay ? getExtraFacilityOptions(booking.homestay) : [];
  const mergedExtras = homestayOptions.map(opt => {
    const existing = booking.extras?.find(e => e.id === opt.id);
    return { ...opt, quantity: existing?.quantity || 0 };
  });

  return (
    <div>
      <PageHeader title="Edit Booking" showBack />
      <BookingFormPage
        initialData={{
          id: booking.id,
          homestayId: booking.homestay_id,
          guestName: booking.guest_name,
          guestPhone: booking.guest_phone || '',
          checkIn: booking.check_in,
          checkOut: booking.check_out,
          guestCount: booking.guest_count,
          notes: booking.notes || '',
          status: booking.status,
          extras: mergedExtras,
        }}
        isEdit
      />
    </div>
  );
}

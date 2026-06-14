'use client';

import { use } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import BookingFormPage from '@/components/booking/booking-form';
import { getBookings } from '@/lib/store';
import { getExtraFacilityOptions } from '@/types';

export default function EditBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const booking = getBookings().find((b) => b.id === id);

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

'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import BookingFormPage from '@/components/booking/booking-form';

function NewBookingContent() {
  const searchParams = useSearchParams();
  const checkInFromUrl = searchParams.get('checkIn') || '';

  return (
    <BookingFormPage
      initialData={checkInFromUrl ? {
        homestayId: '',
        guestName: '',
        guestPhone: '',
        checkIn: checkInFromUrl,
        checkOut: '',
        guestCount: 1,
        notes: '',
        status: 'pending',
        extras: [],
      } : undefined}
    />
  );
}

export default function NewBookingPage() {
  return (
    <div>
      <PageHeader title="Booking Baru" showBack />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <NewBookingContent />
      </Suspense>
    </div>
  );
}

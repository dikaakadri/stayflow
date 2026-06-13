'use client';

import { PageHeader } from '@/components/layout/page-header';
import BookingFormPage from '@/components/booking/booking-form';

export default function NewBookingPage() {
  return (
    <div>
      <PageHeader title="Booking Baru" showBack />
      <BookingFormPage />
    </div>
  );
}

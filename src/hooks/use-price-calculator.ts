'use client';

import { useState, useCallback, useMemo } from 'react';
import type { Homestay, ExtraFacility } from '@/types';

interface PriceCalculation {
  nights: number;
  basePrice: number;
  basePriceTotal: number;
  extraPersonCount: number;
  extraChargePerNight: number;
  extraChargeTotal: number;
  extrasCharge: number;
  discount: number;
  totalPrice: number;
}

interface UsePriceCalculatorProps {
  homestay: Homestay | null;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  extras?: ExtraFacility[];
  discount?: number;
}

export function usePriceCalculator({ homestay, checkIn, checkOut, guestCount, extras = [], discount = 0 }: UsePriceCalculatorProps): PriceCalculation {
  return useMemo(() => {
    if (!homestay || !checkIn || !checkOut) {
      return {
        nights: 0,
        basePrice: 0,
        basePriceTotal: 0,
        extraPersonCount: 0,
        extraChargePerNight: 0,
        extraChargeTotal: 0,
        extrasCharge: 0,
        discount: 0,
        totalPrice: 0,
      };
    }

    // Calculate nights
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Base price per night
    const basePrice = homestay.base_price;
    const basePriceTotal = basePrice * nights;

    // Extra person calculation
    const extraPersonCount = Math.max(0, guestCount - homestay.capacity);
    const extraChargePerNight = extraPersonCount * homestay.extra_person_fee;
    const extraChargeTotal = extraChargePerNight * nights;

    // Extra facilities calculation (price × quantity × nights)
    const extrasCharge = extras.reduce((sum, ext) => sum + (ext.price * ext.quantity * nights), 0);

    // Discount calculation
    const discountVal = discount || 0;

    // Total
    const totalPrice = Math.max(0, basePriceTotal + extraChargeTotal + extrasCharge - discountVal);

    return {
      nights,
      basePrice,
      basePriceTotal,
      extraPersonCount,
      extraChargePerNight,
      extraChargeTotal,
      extrasCharge,
      discount: discountVal,
      totalPrice,
    };
  }, [homestay, checkIn, checkOut, guestCount, extras, discount]);
}

// Standalone calculation function for non-hook usage
export function calculatePrice(
  homestay: Homestay,
  checkIn: string,
  checkOut: string,
  guestCount: number,
  extras: ExtraFacility[] = [],
  discount: number = 0
): PriceCalculation {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const basePrice = homestay.base_price;
  const basePriceTotal = basePrice * nights;
  const extraPersonCount = Math.max(0, guestCount - homestay.capacity);
  const extraChargePerNight = extraPersonCount * homestay.extra_person_fee;
  const extraChargeTotal = extraChargePerNight * nights;
  const extrasCharge = extras.reduce((sum, ext) => sum + (ext.price * ext.quantity * nights), 0);
  const discountVal = discount || 0;
  const totalPrice = Math.max(0, basePriceTotal + extraChargeTotal + extrasCharge - discountVal);

  return {
    nights,
    basePrice,
    basePriceTotal,
    extraPersonCount,
    extraChargePerNight,
    extraChargeTotal,
    extrasCharge,
    discount: discountVal,
    totalPrice,
  };
}

'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { RevenueData } from '@/types';

interface BookingChartProps {
  data: RevenueData[];
}

export function BookingChart({ data }: BookingChartProps) {
  return (
    <div className="card animate-fade-in-up opacity-0 delay-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Booking</h3>
          <p className="text-xs text-text-secondary">Per bulan</p>
        </div>
      </div>
      <div className="h-44 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              width={30}
            />
            <Tooltip
              contentStyle={{
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                fontSize: '12px',
              }}
              formatter={(value: number) => [value, 'Booking']}
            />
            <Bar
              dataKey="bookings"
              fill="#2563EB"
              radius={[6, 6, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function GuestChart({ data }: BookingChartProps) {
  return (
    <div className="card animate-fade-in-up opacity-0 delay-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Jumlah Tamu</h3>
          <p className="text-xs text-text-secondary">Per bulan</p>
        </div>
      </div>
      <div className="h-44 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              width={30}
            />
            <Tooltip
              contentStyle={{
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                fontSize: '12px',
              }}
              formatter={(value: number) => [value, 'Tamu']}
            />
            <Bar
              dataKey="guests"
              fill="#10B981"
              radius={[6, 6, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

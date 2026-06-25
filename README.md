<div align="center">

<img src="public/icon-512.png" alt="StayFlow Logo" width="120" height="120" />

# 🏠 StayFlow — Homestay Property Management System

**Sistem manajemen properti homestay yang modern, cepat, dan elegan.**  
Kelola booking, keuangan, dan analitik bisnis homestay kamu dalam satu platform.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[🚀 Demo Live](#) · [📖 Dokumentasi](#fitur-utama) · [🐛 Laporkan Bug](https://github.com/dikaakadri/Homestay-Property-Management-System/issues)

</div>

---

## ✨ Tentang StayFlow

**StayFlow** adalah aplikasi web manajemen homestay yang dibangun untuk membantu pemilik properti mengelola bisnis penginapan mereka dengan lebih efisien. Dari pencatatan booking hingga laporan keuangan — semua tersedia dalam satu dashboard yang intuitif.

> 💡 Cocok untuk pemilik **homestay**, **villa**, atau **penginapan kecil** yang ingin digitalisasi operasional mereka.

---

## 🎯 Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🏘️ **Manajemen Properti** | Kelola beberapa homestay sekaligus dengan detail lengkap |
| 📅 **Sistem Booking** | Buat, edit, dan pantau status reservasi tamu |
| 📆 **Kalender Booking** | Tampilan visual ketersediaan kamar per bulan |
| 👥 **Manajemen Tamu** | Riwayat dan data pelanggan tersimpan otomatis |
| 💰 **Pencatatan Pengeluaran** | Catat biaya operasional (listrik, air, laundry, dll.) |
| 📊 **Analitik & Laporan** | Grafik pendapatan, okupansi, dan performa bisnis |
| 📄 **Export Laporan** | Unduh laporan dalam format **PDF** dan **Excel** |
| 🌙 **Dark / Light Mode** | Tampilan yang nyaman di semua kondisi pencahayaan |
| 📱 **Responsive Design** | Optimal di desktop maupun perangkat mobile |

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** — React framework dengan App Router
- **[React 19](https://react.dev/)** — Library UI terbaru
- **[TypeScript 5](https://www.typescriptlang.org/)** — Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first styling
- **[Lucide React](https://lucide.dev/)** — Icon library yang konsisten
- **[Recharts](https://recharts.org/)** — Visualisasi data & grafik interaktif
- **[next-themes](https://github.com/pacocoursey/next-themes)** — Dark/Light mode

### Backend & Database
- **[Supabase](https://supabase.com/)** — PostgreSQL database + Auth + Real-time
- **[Supabase SSR](https://supabase.com/docs/guides/auth/server-side)** — Server-side rendering support

### Utilities
- **[date-fns](https://date-fns.org/)** — Manipulasi tanggal
- **[jsPDF](https://jspdf.com/)** + **[jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable)** — Generate PDF
- **[xlsx](https://sheetjs.com/)** — Generate file Excel
- **[clsx](https://github.com/lukeed/clsx)** + **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** — Class utilities

---

## 🗂️ Struktur Proyek

```
stayflow/
├── src/
│   ├── app/                        # Next.js App Router (halaman)
│   │   ├── page.tsx                # Dashboard utama
│   │   ├── layout.tsx              # Root layout
│   │   ├── analytics/              # Halaman analitik & grafik
│   │   ├── booking/                # Manajemen booking
│   │   │   ├── page.tsx            # Daftar booking
│   │   │   ├── new/                # Form booking baru
│   │   │   ├── [id]/               # Detail / edit booking
│   │   │   └── calendar/           # Kalender booking
│   │   ├── homestay/               # Manajemen properti
│   │   │   ├── page.tsx            # Daftar homestay
│   │   │   ├── new/                # Tambah homestay baru
│   │   │   └── [id]/               # Detail / edit homestay
│   │   └── settings/               # Pengaturan aplikasi
│   │       ├── customers/          # Kelola data tamu
│   │       ├── expenses/           # Kelola pengeluaran
│   │       └── reports/            # Ekspor laporan
│   ├── components/                 # Reusable UI components
│   │   ├── analytics/              # Komponen chart & statistik
│   │   ├── booking/                # Komponen form & tabel booking
│   │   ├── dashboard/              # Komponen widget dashboard
│   │   ├── expenses/               # Komponen pengeluaran
│   │   ├── homestay/               # Komponen manajemen properti
│   │   └── layout/                 # Sidebar, navbar, dll.
│   ├── lib/                        # Utilities & helpers
│   │   ├── api.ts                  # Fungsi API ke Supabase
│   │   ├── supabase.ts             # Supabase client setup
│   │   ├── constants.ts            # Konstanta aplikasi
│   │   ├── format.ts               # Format angka & tanggal
│   │   ├── store.ts                # State management
│   │   ├── export/                 # Logic export PDF & Excel
│   │   └── utils.ts                # Utility functions
│   ├── hooks/                      # Custom React hooks
│   └── types/                      # TypeScript type definitions
├── supabase/
│   └── migrations/                 # SQL migration files
│       ├── 001_initial_schema.sql  # Schema awal
│       ├── 002_add_extra_prices.sql
│       ├── 003_add_extras_to_bookings.sql
│       └── 004_add_discount_to_bookings.sql
├── public/                         # Static assets
├── .env.local.example              # Template environment variables
├── next.config.ts                  # Konfigurasi Next.js
└── package.json
```

---

## 🗄️ Skema Database

StayFlow menggunakan **PostgreSQL via Supabase** dengan 4 tabel utama:

```
homestays ──────────────────────────────────────
  id, name, base_price, capacity,
  extra_person_fee, commission_rate,
  address, is_active, image_url

customers ──────────────────────────────────────
  id, name, phone, total_stays

bookings ───────────────────────────────────────
  id, homestay_id (FK), customer_id (FK),
  guest_name, guest_phone,
  check_in, check_out, guest_count, nights,
  base_price, extra_charge, discount, total_price,
  status (pending | dp | paid | cancelled),
  notes

expenses ───────────────────────────────────────
  id, homestay_id (FK), expense_date,
  category (listrik | air | laundry | kebersihan | perbaikan | lainnya),
  amount, description
```

---

## 🚀 Cara Menjalankan Lokal

### Prasyarat
- **Node.js** v18 atau lebih baru
- **npm** / **yarn** / **pnpm**
- Akun **[Supabase](https://supabase.com/)** (gratis)

### 1. Clone Repository

```bash
git clone https://github.com/dikaakadri/Homestay-Property-Management-System.git
cd Homestay-Property-Management-System
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Salin file contoh dan isi dengan konfigurasi Supabase kamu:

```bash
cp .env.local.example .env.local
```

Buka `.env.local` dan isi:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> 📌 Temukan kredensial ini di **Supabase Dashboard → Project Settings → API**

### 4. Setup Database

Jalankan migration SQL di **Supabase SQL Editor** secara berurutan:

```
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_add_extra_prices.sql
supabase/migrations/003_add_extras_to_bookings.sql
supabase/migrations/004_add_discount_to_bookings.sql
```

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser. 🎉

---

## 📸 Screenshot

> *Tambahkan screenshot aplikasi di sini*

---

## 🤝 Kontribusi

Kontribusi sangat disambut! Silakan:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/nama-fitur`)
3. Commit perubahan (`git commit -m 'feat: tambah fitur X'`)
4. Push ke branch (`git push origin feature/nama-fitur`)
5. Buka **Pull Request**

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**. Bebas digunakan dan dimodifikasi.

---

<div align="center">

Dibuat dengan ❤️ oleh **dikaakadri**

⭐ Jangan lupa beri bintang kalau project ini bermanfaat!

</div>

"use client";

import { Inter } from "next/font/google";
import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("GlobalErrorBoundary caught an error:", error);
  }, [error]);

  return (
    <html lang="id" className={`${inter.variable} h-full`}>
      <body className="min-h-full font-sans antialiased bg-slate-50 text-slate-900 transition-colors duration-300">
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center space-y-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Ups, terjadi kesalahan fatal!
            </h2>
            <p className="text-slate-500 max-w-sm">
              Terjadi masalah sistem pada tingkat root.
            </p>
          </div>

          <div className="w-full max-w-sm p-4 bg-slate-200 rounded-xl overflow-auto text-left">
            <p className="text-sm font-mono text-red-600 break-words">
              {error.message || "Unknown Error"}
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm active:scale-95"
          >
            <RefreshCcw className="w-4 h-4" />
            Muat Ulang
          </button>
        </div>
      </body>
    </html>
  );
}

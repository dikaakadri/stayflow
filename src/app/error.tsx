"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Di sini Anda bisa mengirimkan error ini ke layanan pelaporan error (Sentry, LogRocket, dll)
    console.error("ErrorBoundary caught an error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center space-y-6">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center animate-pulse">
        <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-500" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Ups, terjadi kesalahan!
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm">
          Maaf, ada masalah saat memuat halaman ini.
        </p>
      </div>

      <div className="w-full max-w-sm p-4 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-auto text-left">
        <p className="text-sm font-mono text-red-600 dark:text-red-400 break-words">
          {error.message || "Unknown Error"}
        </p>
        {error.stack && (
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-2 truncate">
            {/* Hanya tampilkan sebagian stack trace agar tidak terlalu penuh */}
            {error.stack.split("\n").slice(0, 3).join("\n")}
          </p>
        )}
      </div>

      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm active:scale-95"
      >
        <RefreshCcw className="w-4 h-4" />
        Coba Lagi
      </button>
    </div>
  );
}

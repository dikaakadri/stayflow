'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-between w-full p-4 bg-white border border-border-light rounded-2xl hover:bg-surface active:scale-[0.98] transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-50 text-purple-500">
          <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </div>
        <span className="font-semibold text-text-primary">Tema Aplikasi</span>
      </div>
      <span className="text-sm font-medium text-text-secondary capitalize">
        {theme === 'system' ? 'Sistem' : theme === 'dark' ? 'Gelap' : 'Terang'}
      </span>
    </button>
  );
}

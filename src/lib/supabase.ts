import { createClient } from '@supabase/supabase-js';

// Singleton instance — prevents "Multiple GoTrueClient instances" warning
let instance: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!instance) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.error('[StayFlow] Missing Supabase env vars');
      return new Proxy({} as any, {
        get: () => () => {
          throw new Error(
            'Database tidak terhubung. Pastikan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY sudah diatur di Environment Variables Vercel.'
          );
        },
      }) as unknown as ReturnType<typeof createClient>;
    }

    try {
      // Custom fetch with 10-second timeout.
      // On iOS Safari, network requests can hang silently without ever
      // resolving or rejecting. This ensures the Promise always settles.
      const fetchWithTimeout: typeof fetch = (input, init) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        // Merge any existing signal
        const signal = init?.signal
          ? init.signal
          : controller.signal;

        return fetch(input, {
          ...init,
          signal,
        }).finally(() => clearTimeout(timeoutId));
      };

      instance = createClient(url, key, {
        auth: {
          // Disable all localStorage/sessionStorage access.
          // iOS Safari in private mode or in-app browsers (Instagram, LINE, etc.)
          // throw SecurityError when accessing storage, which crashes the entire
          // JS module evaluation and causes infinite loading screens.
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
          // Explicitly set storage to a no-op to prevent any fallback attempts
          storage: {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          },
        },
        global: {
          fetch: fetchWithTimeout,
        },
      });
    } catch (err: any) {
      console.error('[StayFlow] Failed to create Supabase client:', err);
      return new Proxy({} as any, {
        get: () => () => {
          throw new Error(
            `Gagal menginisialisasi koneksi database: ${err?.message || 'Unknown'}`
          );
        },
      }) as unknown as ReturnType<typeof createClient>;
    }
  }
  return instance;
}

export const supabase = getClient();

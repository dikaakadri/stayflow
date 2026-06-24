import { createClient } from '@supabase/supabase-js';

// Singleton instance to prevent Multiple GoTrueClient warning
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseInstance) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error('Missing Supabase env vars');
    }

    supabaseInstance = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
        storage: {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        },
      },
    });
  }
  return supabaseInstance;
}

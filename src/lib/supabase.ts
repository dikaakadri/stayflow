import { createClient } from '@supabase/supabase-js';

// Singleton instance — prevents "Multiple GoTrueClient instances" warning
let instance: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!instance) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!url || !key) {
      console.error('Missing Supabase Environment Variables (URL or ANON_KEY)');
      return new Proxy({}, {
        get: (target, prop) => {
          return () => {
            throw new Error(`Kredensial database tidak ditemukan di Vercel. Anda belum mengatur NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di menu Environment Variables Vercel.`);
          };
        }
      }) as unknown as ReturnType<typeof createClient>;
    }

    try {
      // Create client with auth persistence disabled.
      // This prevents 'SecurityError' on iOS Safari when cookies are blocked or in strict in-app browsers,
      // which would otherwise crash the module initialization and cause an infinite loading screen.
      instance = createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      });
    } catch (err: any) {
      console.error('Failed to initialize Supabase client:', err);
      // Fallback proxy if initialization crashes (e.g., strict browser security policies)
      return new Proxy({}, {
        get: (target, prop) => {
          return () => {
            throw new Error(`Gagal menginisialisasi database: ${err?.message || 'Unknown error'}`);
          };
        }
      }) as unknown as ReturnType<typeof createClient>;
    }
  }
  return instance;
}

export const supabase = getClient();

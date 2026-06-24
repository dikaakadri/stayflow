import { createClient } from '@supabase/supabase-js';

// Singleton instance — prevents "Multiple GoTrueClient instances" warning
let instance: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!instance) {
    instance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return instance;
}

export const supabase = getClient();

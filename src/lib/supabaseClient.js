import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Configure auth with longer lock timeout to prevent Strict Mode warnings
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'ndanduleni-auth',
    // Increase lock acquire timeout to avoid orphaned lock warnings
    lockAcquireTimeout: 30000, // 30 seconds (default is 5000ms)
  },
});

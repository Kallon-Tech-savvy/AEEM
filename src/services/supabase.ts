import { createClient } from '@supabase/supabase-js'

// ❌ Remove these — process.env doesn't exist in Vite/browser environments
// console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
// console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Forms and dynamic content may not work correctly.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
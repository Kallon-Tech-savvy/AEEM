import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
// Use the new publishable key if available, otherwise fall back to the legacy anon key
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials missing (VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY). Forms and dynamic content may not work correctly.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

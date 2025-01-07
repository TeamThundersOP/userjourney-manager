import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rlovtflyxnclfrwmgovi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsb3Z0Zmx5eG5jbGZyd21nb3ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjI0MDAsImV4cCI6MjAyNTM5ODQwMH0.Wd_dSFwQzXIhBtGZ6bHCZEqF8h1QWHN_nELI5rCARAI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
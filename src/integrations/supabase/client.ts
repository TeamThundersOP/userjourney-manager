import { createClient } from "@supabase/supabase-js";

// Ensure environment variables are defined
const supabaseUrl = "https://rlovtflyxnclfrwmgovi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsb3Z0Zmx5eG5jbGZyd21nb3ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4MjU2MDAsImV4cCI6MjAyMzQwMTYwMH0.H6FmwYTJULxltkZHgZE_2hF_KYUJGqkDGXmgNEhHfKE";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be defined');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'user-auth-token',
    storage: localStorage,
    autoRefreshToken: true,
  },
});
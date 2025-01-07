import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rlovtflyxnclfrwmgovi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsb3Z0Zmx5eG5jbGZyd21nb3ZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTEyNTQ4NiwiZXhwIjoyMDUwNzAxNDg2fQ.9Jm-TmyVYFEhCFaE3S4m-6nRu0Or8NzkOB_sQ3ibHF0";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be defined');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: localStorage,
  },
});
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rlovtflyxnclfrwmgovi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsb3Z0Zmx5eG5jbGZyd21nb3ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMjU0ODYsImV4cCI6MjA1MDcwMTQ4Nn0.FdBPFg4aOQx3outsm3du0uLHMajEXff6mJNJl0voGvU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
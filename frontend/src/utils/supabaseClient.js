import { createClient } from '@supabase/supabase-js';

// Read from Vite env variables with project default fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eqvywujyrqcnzsbaahgt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxdnl3dWp5cnFjbnpzYmFhaGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5OTYzNzcsImV4cCI6MjEwMDU3MjM3N30.5kCDpPGWcK7XYWVxJsxLT6cTwPC-yh0nPcgjOveKj0c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


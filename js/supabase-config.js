// Supabase client configuration
const SUPABASE_URL = 'https://dqpbazgduzhzsdqmklhd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxcGJhemdkdXpoenNkcW1rbGhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjc1NjUsImV4cCI6MjA4OTg0MzU2NX0.6kCHFRISxC9BxcIDO6kzksM841JZCF9z1pA3GI2fAkw';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

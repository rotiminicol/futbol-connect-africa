// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ptanxhlwodybzgbfzfil.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0YW54aGx3b2R5YnpnYmZ6ZmlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2Njg2MzAsImV4cCI6MjA2MzI0NDYzMH0.VZuB4feAJi4vyBdBjqhdsqDwXNTmaSKpcWKdq7M8HZs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
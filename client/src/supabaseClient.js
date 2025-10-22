import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hrtikedecdmmacnudkgd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhydGlrZWRlY2RtbWFjbnVka2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTU5MTYsImV4cCI6MjA3NjczMTkxNn0.2-xdqGinjbCoVlQpzXxn4CI2Ecosy3O9LFKc6OJRBpY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
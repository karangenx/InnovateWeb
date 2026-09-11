import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
let supabaseUrl = '';
let supabaseKey = '';

for (const line of envFile.split('\n')) {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
    supabaseUrl = line.split('=')[1].trim().replace(/^"|"$/g, '');
  }
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
    supabaseKey = line.split('=')[1].trim().replace(/^"|"$/g, '');
  }
}

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key not found in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Querying Supabase...");
  const { data, error } = await supabase
    .from('rsvps')
    .select('name, email')
    .limit(5);

  if (error) {
    console.error("Error fetching rsvps:", error.message);
    process.exit(1);
  }

  console.log("✅ Successfully connected and queried 'rsvps' table!");
  console.log("Sample Data:", JSON.stringify(data, null, 2));

  const { count, error: countError } = await supabase
    .from('rsvps')
    .select('*', { count: 'exact', head: true });

  if (!countError) {
     console.log(`Total RSVPs found: ${count}`);
  }
}

check();

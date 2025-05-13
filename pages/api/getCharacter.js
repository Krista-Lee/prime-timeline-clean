import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ufblsjxmmxkmogefnklo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmYmxzanhtbXhrbW9nZWZua2xvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0Mjg5MTcsImV4cCI6MjA2MjAwNDkxN30.tjZyQoUcGkG5Zu7yYczUQ_0zR_NZiv3s0KfF3QJquH4';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('character_profiles')
    .select('*')
    .eq('id', 'b3bc711e-0f25-48a4-a8a4-a6c4744c2325')
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
}

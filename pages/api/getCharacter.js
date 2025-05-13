import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ufblsjxmmxkmogefnklo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmYmxzanhtbXhrbW9nZWZua2xvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0Mjg5MTcsImV4cCI6MjA2MjAwNDkxN30.tjZyQoUcGkG5Zu7yYczUQ_0zR_NZiv3s0KfF3QJquH4';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const moodParam = req.query.mood;

  const { data: profile, error: profileError } = await supabase
    .from('character_profiles')
    .select('*')
    .eq('id', 'b3bc711e-0f25-48a4-a8a4-a6c4744c2325')
    .single();

  if (profileError) {
    return res.status(500).json({ error: profileError.message });
  }

  if (moodParam) {
    const { data: moods, error: moodError } = await supabase
      .from('character_moods')
      .select('*')
      .eq('character_id', profile.id)
      .ilike('mood_name', moodParam); // Case-insensitive match

    if (moodError) {
      return res.status(500).json({ error: moodError.message });
    }

    if (!moods || moods.length === 0) {
      return res.status(404).json({ error: `Mood "${moodParam}" not found.` });
    }

    return res.status(200).json({ mood: moods[0] });
  }

  // Default: return full profile + all moods
  const { data: allMoods, error: moodsError } = await supabase
    .from('character_moods')
    .select('*')
    .eq('character_id', profile.id);

  if (moodsError) {
    return res.status(500).json({ error: moodsError.message });
  }

  return res.status(200).json({ ...profile, moods: allMoods });
}

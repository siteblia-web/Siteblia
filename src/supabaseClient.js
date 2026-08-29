import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://whlpusrrrevcprfdduxw.supabase.co";

const supabaseAnonKey =
  "sb_publishable_kvt-Nk-hG6MmZ8KccXKUOQ_BL8lL5r6";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

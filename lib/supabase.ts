import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const hasBrowserEnv = Boolean(supabaseUrl && supabaseAnonKey);

function assertServerEnv(): { url: string; key: string } {
  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
  }
  if (!supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
  }
  return {
    url: supabaseUrl,
    key: supabaseServiceRoleKey ?? supabaseAnonKey,
  };
}

let browserClient: SupabaseClient | null = null;

export function createSupabaseBrowserClient(): SupabaseClient {
  if (!hasBrowserEnv || !supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable",
    );
  }

  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey);
  }

  return browserClient;
}

export function createSupabaseServerClient(): SupabaseClient {
  const { url, key } = assertServerEnv();

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

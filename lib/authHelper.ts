import { supabase } from "./supabaseClient";

export async function useMiddleware() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.log(error);
  }

  return session?.user.role ?? null;
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access-token")?.value;

  if (token) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/logout`, {
        method: "POST",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Gagal melakukan revoke token di Supabase:", err);
    }
  }

  const response = NextResponse.json({ message: "Logout berhasil" });

  response.cookies.delete("access-token");

  return response;
}

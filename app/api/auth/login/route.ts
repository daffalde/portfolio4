import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({
        message: "Login Gagal",
        error: res.status,
      });
    }

    const { access_token, expire_in, user } = data;

    const cookieStore = await cookies();

    cookieStore.set("access_token", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: expire_in || 3600,
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (err: any) {
    // Log error tak terduga (misal: JSON parse error atau Network Error) ke Terminal
    console.error("Fatal Catch Error in Login Route:", err);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan pada server",
        error_detail: err?.message || String(err),
      },
      { status: 500 },
    );
  }
}

import { supabase } from "@/lib/supabaseClient";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const name_project = formData.get("name") as string;
    const desc_project = formData.get("desc") as string;
    const link_project = formData.get("link") as string;

    const user_id = "eb1b4707-c2a4-470b-913d-3b761aa660d4";
    const id_project = randomUUID();
    let image_project = "";

    if (file && file.size > 0) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${id_project}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        return NextResponse.json(
          { error: uploadError.message },
          { status: 500 },
        );
      }

      image_project = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/documents/${fileName}`;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/project`,
      {
        method: "POST",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          id_project,
          user_id,
          name_project,
          desc_project,
          link_project,
          image_project,
        }),
      },
    );

    if (!res.ok) {
      const dbError = await res.json();
      return NextResponse.json({ error: dbError }, { status: res.status });
    }

    return NextResponse.json({
      message: "Data berhasil ditambahkan",
    });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const body = await request.json();
    const { id_project } = body;

    if (!id_project) {
      return NextResponse.json(
        { error: "id_project wajib diisi." },
        { status: 400 },
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/project?id_project=eq.${id_project}`,
      {
        method: "DELETE",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.message || "Gagal menghapus data dari database." },
        { status: res.status },
      );
    }

    return NextResponse.json({
      message: "Data berhasil dihapus",
    });
  } catch (err: any) {
    console.error("DELETE API Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

import { supabase } from "@/lib/supabaseClient";
import { UUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;
    const id = crypto.randomUUID();
    const name = formData.get("name_project") as string;
    const type = formData.get("type") as string;
    const desc = formData.get("description") as string;
    const link = formData.get("link") as string;

    const fileExt = file.name.split(".").pop();
    const filePath = `uploads/${id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    const { data: dbData, error: dbError } = await supabase
      .from("posts")
      .insert([
        {
          id: id,
          type: type,
          name_project: name,
          description: desc,
          link: link,
          image_project: publicUrlData.publicUrl,
        },
      ])
      .select();

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Berhasil membuat postingan",
      data: dbData,
    });
  } catch (err) {
    console.log(err);
  }
}

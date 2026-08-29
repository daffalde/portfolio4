import { supabase } from "@/lib/supabaseClient";
import { UUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;
    const id = crypto.randomUUID();
    const name = formData.get("name_project") as string;
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
      .from("project")
      .insert([
        {
          id_project: id,
          user_id: "eb1b4707-c2a4-470b-913d-3b761aa660d4",
          name_project: name,
          desc_project: desc,
          link_project: link,
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

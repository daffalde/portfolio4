import { revalidatePath } from "next/cache";
import { createClient } from "../utils/supabase/client";

interface postProject {
  title: String;
  desc: String;
  link: String;
  status: Number;
  image: any;
  logo: any;
}

export async function HandlePostProject(dataInsert: postProject) {
  const supabase = createClient();

  try {
    const { data: dataImage, error: errorImage } = await supabase.storage
      .from("images")
      .upload(`${Date.now()}`, dataInsert.image);

    const { data: dataLogo, error: errorLogo } = await supabase.storage
      .from("images")
      .upload(`${Date.now()}`, dataInsert.logo);

    const { data, error } = await supabase
      .from("project")
      .insert([
        {
          p_name: dataInsert.title,
          p_desc: dataInsert.desc,
          p_link: dataInsert.link,
          p_status: dataInsert.status,
          p_image: `https://jmkviwizozicwpfhqhjm.supabase.co/storage/v1/object/public/images/${dataImage?.path}?t=123`,
          p_logo: `https://jmkviwizozicwpfhqhjm.supabase.co/storage/v1/object/public/images/${dataLogo?.path}?t=123`,
        },
      ])
      .select();
  } catch (err) {
    console.log(err);
  }
}

interface editProject {
  id: Number;
  title: String;
  desc: String;
  link: String;
  status: Number;
  image: any | null;
  imageName: string | null;
  logo: any | null;
  logoName: string | null;
}

export async function HandlePatchProject(dataInsert: editProject) {
  const supabase = createClient();
  try {
    if (dataInsert.image && dataInsert.imageName) {
      await supabase.storage
        .from("images")
        .update(dataInsert.imageName, dataInsert.image);
    }
    if (dataInsert.logo && dataInsert.logoName) {
      await supabase.storage
        .from("images")
        .update(dataInsert.logoName, dataInsert.logo);
    }

    await supabase
      .from("project")
      .update({
        p_name: dataInsert.title,
        p_desc: dataInsert.desc,
        p_link: dataInsert.link,
        p_status: dataInsert.status,
      })
      .eq("id_project", dataInsert.id);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

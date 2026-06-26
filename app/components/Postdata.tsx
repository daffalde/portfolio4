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
          p_image: `https://jmkviwizozicwpfhqhjm.supabase.co/storage/v1/object/public/images/${dataImage?.path}`,
          p_logo: `https://jmkviwizozicwpfhqhjm.supabase.co/storage/v1/object/public/images/${dataLogo?.path}`,
        },
      ])
      .select();
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

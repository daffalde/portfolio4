import { cookies } from "next/headers";
import { useState } from "react";

interface PopUpFunc {
  close: () => void;
}

export default function PopUpInput({ close }: PopUpFunc) {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    desc: "",
  });

  // handler untuk input text/textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleAdd() {
    const cookiesStore = await cookies();
    try {
      const data = new FormData();
      if (file) data.append("file", file);
      data.append("name", formData.name);
      data.append("link", formData.link);
      data.append("desc", formData.desc);

      const res = await fetch("/api/project", {
        method: "POST",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        },
        body: data,
      });

      const result = await res.json();
      console.log("Response:", result);

      // tutup popup setelah sukses
      close();
    } catch (err) {
      console.error("Error:", err);
    }
  }

  return (
    <div className="popUpInput-bg">
      <div className="popUpInput-body">
        <div className="popUpInput-header">
          <h5>Add Project</h5>
          <button onClick={close}>
            <img width={"100%"} src="/close.png" alt="close icon" />
          </button>
        </div>

        {/* ______________________________________________ */}
        <div className="popUpInput-add">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="link"
            placeholder="Link"
            value={formData.link}
            onChange={handleChange}
          />
          <textarea
            name="desc"
            placeholder="desc"
            value={formData.desc}
            onChange={handleChange}
          />
        </div>

        {/* ______________________________________________ */}
        <div className="popUpInput-action">
          <button onClick={close} className="btn-second">
            Cancel
          </button>
          <button onClick={handleAdd} className="btn-main">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

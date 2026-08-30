import { useState } from "react";

interface PopUpFunc {
  close: () => void;
}

export default function PopUpInput({ close }: PopUpFunc) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    desc: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleAdd() {
    setLoading(true);
    try {
      const data = new FormData();
      if (file) data.append("file", file);
      data.append("name", formData.name);
      data.append("link", formData.link);
      data.append("desc", formData.desc);

      // Cukup kirim FormData tanpa menyertakan header apikey manual
      const res = await fetch("/api/skill", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(`Gagal: ${result.error || "Terjadi kesalahan"}`);
        return;
      }

      console.log("Response:", result);
      close();
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
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

        <div className="popUpInput-add">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            disabled={loading}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            type="text"
            name="link"
            placeholder="Link"
            value={formData.link}
            onChange={handleChange}
            disabled={loading}
          />
          <textarea
            name="desc"
            placeholder="desc"
            value={formData.desc}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="popUpInput-action">
          <button onClick={close} className="btn-second" disabled={loading}>
            Cancel
          </button>
          <button onClick={handleAdd} className="btn-main" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

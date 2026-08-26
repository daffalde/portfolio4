"use client";

import { useState } from "react";
import styles from "./dbPopUp.module.css";
import Notification from "./Notification";

interface closeProp {
  close: () => void | Promise<void>;
  type: string;
}

interface notif {
  condition: boolean;
  title: string;
  desc: string;
}

export function PopUpBody({ close, type }: closeProp) {
  return (
    <div className={styles.bg}>
      <div className={styles.body}>
        <div className={styles.header}>
          <button onClick={close}>
            <img src="/back.png" alt="back icon" />
          </button>
          <h5>Add {type == "project" ? "Project" : "Skill"}</h5>
        </div>
        {type == "project" ? <AddProject /> : <AddSkill />}
      </div>
    </div>
  );
}

function AddProject() {
  const [loading, setLoading] = useState<boolean>(false);
  const [notif, SetNotif] = useState<boolean>(false);
  const [notifMessage, setNotifMessage] = useState<notif>();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name_project: "",
    type: "",
    description: "",
    link: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("name_project", formData.name_project);
    data.append("type", formData.type);
    data.append("description", formData.description);
    data.append("link", formData.link);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/project/input`, {
        method: "POST",
        body: data,
      });
      setLoading(false);
      SetNotif(true);
      setNotifMessage({
        condition: true,
        title: "Added Successfully",
        desc: "Project has been saved without issues.",
      });
      window.location.reload();
    } catch (err) {
      setLoading(false);
      SetNotif(true);
      setNotifMessage({
        condition: true,
        title: "Failed to Add Data",
        desc: "An error occurred while saving your project.",
      });
    }
  };

  return (
    <>
      <div className={styles.contentBody}>
        {notif ? (
          <Notification
            condition={Boolean(notifMessage?.condition)}
            headline={String(notifMessage?.title)}
            desc={String(notifMessage?.desc)}
          />
        ) : null}
        <span>
          <h6>Image Upload</h6>
          <div
            style={{
              width: "100%",
              height: "245px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: preview ? `url(${preview})` : "none",
            }}
            className="inputFile"
          >
            {!preview && (
              <>
                <img src="/upload.png" alt="upload icon" />
                <h6>Upload Screenshot of Website</h6>
                <p>.webp less than 1 mb.</p>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </span>
        <span>
          <h6>Information</h6>
          <input
            type="text"
            name="name_project"
            placeholder="Site Title...."
            value={formData.name_project}
            onChange={handleChange}
          />
          <input
            type="text"
            name="type"
            placeholder="Site Type...."
            value={formData.type}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Website Description...."
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="link"
            placeholder="Link Url...."
            value={formData.link}
            onChange={handleChange}
          />
        </span>
      </div>
      <div className={styles.actionButton}>
        <button onClick={handleSubmit} className="btn-main">
          {loading ? <img src="/loading.gif" alt="loading icon" /> : null}
          Add
        </button>
      </div>
    </>
  );
}

interface skillInput {
  name: string;
  category: string;
}

function AddSkill() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const [formValue, setFormValue] = useState<skillInput>({
    name: "",
    category: "",
  });

  function handleChange(e: any) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  function handleFileChange(e: any) {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  }

  async function handleSubmit() {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    Object.entries(formValue).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/skill/input`, {
        method: "POST",
        body: formData,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
      window.location.reload();
    }
  }
  return (
    <>
      <div className={styles.contentBody}>
        <span>
          <h6>Image Upload</h6>
          <div
            style={{
              width: "50%",
              height: "100px",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundImage: preview ? `url(${preview})` : "none",
            }}
            className="inputFile"
          >
            {!preview && (
              <>
                <img src="/upload.png" alt="upload icon" />
                <h6>Logo</h6>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </span>
        <span>
          <h6>Information</h6>
          <input
            type="text"
            placeholder="Skill Title...."
            name="name"
            value={formValue.name}
            onChange={handleChange}
          />
          <select
            value={formValue.category}
            name="category"
            onChange={handleChange}
          >
            <option hidden value="#">
              Category
            </option>
            <option value="Frontend">Frontend</option>
            <option value="Backend & Database">Backend & Database</option>
            <option value="Languages">Languages</option>
            <option value="DevOps & Cloud">DevOps & Cloud</option>
          </select>
        </span>
      </div>
      <div className={styles.actionButton}>
        <button onClick={handleSubmit} className="btn-main">
          {loading ? <img src="/loading.gif" alt="loading icon" /> : null}
          Add
        </button>
      </div>
    </>
  );
}

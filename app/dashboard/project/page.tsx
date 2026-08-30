"use client";

import DbNavbar from "@/components/DbNavbar";
import styles from "../../../styles/dashboard/project.module.css";
import PopUpInput from "@/components/PopUpInput";
import { useEffect, useState } from "react";

interface GetData {
  desc_project: string;
  id_project: string;
  image_project: string;
  link_project: string;
  name_project: string;
}

export default function ProjectDashboard() {
  const [popUp, setPopUp] = useState(false);
  function handleClose() {
    setPopUp(false);
  }
  const [data, setData] = useState<GetData[] | null>([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/project`,
          {
            method: "GET",
            headers: {
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            },
          },
        );
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  const handleDelete = async (id_project: string) => {
    try {
      const res = await fetch("/api/project", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_project }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(`Gagal: ${result.error}`);
        return;
      }

      window.location.reload();
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <>
      {popUp ? <PopUpInput close={handleClose} /> : null}
      <div className="homepage">
        <div className="dashboard">
          <DbNavbar />
          <div className={styles.body}>
            <div className={styles.header}>
              <h2>Project</h2>
              <button onClick={() => setPopUp(true)} className="btn-main">
                Add Project
                <img src="/add.png" alt="add icon" />
              </button>
            </div>
            <div className={styles.content}>
              {data ? (
                data.map((e, _) => (
                  <div
                    className={`bg-template ${styles.item}`}
                    key={e.id_project}
                  >
                    <img
                      style={{ borderRadius: "10px" }}
                      width={"100%"}
                      src={e.image_project}
                      alt="project image"
                    />
                    <h5>{e.name_project}</h5>
                    <p className="p-second">{e.desc_project}</p>
                    <span>
                      <button
                        onClick={() => window.open(e.link_project)}
                        className="btn-main"
                      >
                        Visit website
                      </button>
                      <button
                        onClick={() => handleDelete(e.id_project)}
                        className="btn-second"
                      >
                        <img src="/delete.png" alt="delete icon" />
                      </button>
                    </span>
                  </div>
                ))
              ) : (
                <p>No data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

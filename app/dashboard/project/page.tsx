"use client";

import DbNavbar from "@/components/DbNavbar";
import styles from "../../../styles/dashboard/project.module.css";
import PopUpInput from "@/components/PopUpInput";
import { useState } from "react";

export default function ProjectDashboard() {
  const [popUp, setPopUp] = useState(false);
  function handleClose() {
    setPopUp(false);
  }
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
          </div>
        </div>
      </div>
    </>
  );
}

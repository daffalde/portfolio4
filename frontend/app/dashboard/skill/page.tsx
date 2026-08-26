"use client";

import DbNavbar from "@/components/DbNavbar";
import "../../../styles/dashboard/dashboardGlobal.css";
import styles from "../../../styles/dashboard/dbSkill.module.css";
import { useState } from "react";
import { PopUpBody } from "@/components/DbPopUp";

export default function DashboardSkill() {
  const [popUpAdd, setPopUpAdd] = useState<boolean>(false);
  return (
    <>
      <div className="db-body">
        {popUpAdd ? (
          <PopUpBody type="skill" close={() => setPopUpAdd(false)} />
        ) : null}
        <div className="db-page">
          <DbNavbar />
          <div className="db-content">
            <div className="db-c-header">
              <h2>Skill</h2>
              <button className="btn-main" onClick={() => setPopUpAdd(true)}>
                <p>New Skill</p>
                <img src="/add.png" alt="add icon" />
              </button>
            </div>
            <div className={styles.body}></div>
          </div>
        </div>
      </div>
    </>
  );
}

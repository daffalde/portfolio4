"use client";

import { useEffect } from "react";
import Dashnav from "../components/Dashnav";
import styles from "./dashboard.module.css";
import { createClient } from "../utils/supabase/client";
import DbProject from "../components/dashboardPage/Dbproject";

export default function Dashboard() {
  return (
    <>
      <div className="container container-dashboard">
        <div className={styles.container_dashboard}>
          <Dashnav />
          <div className={styles.dashboard_content}>
            <DbProject />
          </div>
        </div>
      </div>
    </>
  );
}

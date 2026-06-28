"use client";

import Dashnav from "../components/Dashnav";
import styles from "./dashboard.module.css";
import DbProject from "../components/dashboardPage/Dbproject";
import { useEffect, useState } from "react";
import Dbskill from "../components/dashboardPage/Dbskill";

export default function Dashboard() {
  const [pageNow, setPageNow] = useState<String | null>();
  useEffect(() => {
    setPageNow(localStorage.getItem("page"));
  }, []);
  return (
    <>
      <div className="container container-dashboard">
        <div className={styles.container_dashboard}>
          <div className={styles.dashboard_content}>
            {!pageNow || pageNow === "Project" || pageNow === "" ? (
              <DbProject />
            ) : (
              <Dbskill />
            )}
          </div>
          <Dashnav />
        </div>
      </div>
    </>
  );
}

"use client";

import { useEffect } from "react";
import Dashnav from "../components/Dashnav";
import styles from "./dashboard.module.css";
import { createClient } from "../utils/supabase/client";

export default function Dashboard() {
  useEffect(() => {
    async function getData() {
      const supabase = createClient();

      const { data, error } = await supabase.from("project").select("*");
      console.log(data);
    }
    getData();
  }, []);
  return (
    <>
      <div className="container container-dashboard">
        <div className={styles.container_dashboard}>
          <Dashnav />
        </div>
      </div>
    </>
  );
}

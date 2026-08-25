"use client";

import DbNavbar from "@/components/DbNavbar";
import "../../../styles/dashboard/dashboardGlobal.css";
import styles from "../../../styles/dashboard/dbProject.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

interface project {
  CreatedAt: any;
  Description: string;
  IdProject: any;
  ImageProject: string;
  Link: string;
  NameProject: string;
  Type: string;
}

export default function DashboardProject() {
  const [data, setData] = useState<project[]>();
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`http://localhost:8080/project`);
        const json = await res.json();
        console.log(json);
        setData(json);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);
  return (
    <>
      <div className="db-body">
        <div className="db-page">
          <DbNavbar />
          <div className="db-content">
            <div className="db-c-header">
              <h2>Project</h2>
              <button className="btn-main">
                <p>New Project</p>
                <img src="/add.png" alt="add icon" />
              </button>
            </div>
            <div className={styles.content}>
              {data ? (
                data.map((e, _) => {
                  return (
                    <div className={styles.item} key={e.IdProject}>
                      <img src={`${e.ImageProject}`} alt="project image" />
                      <span>
                        <h5>
                          {e.NameProject} - {e.Type}
                        </h5>
                      </span>
                      <p className="p-second">{e.Description}</p>
                      <span>
                        <Link href={e.Link}>Visit Website</Link>
                      </span>
                    </div>
                  );
                })
              ) : (
                <img
                  style={{ width: "50px" }}
                  src="/loading.gif"
                  alt="loading icon"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

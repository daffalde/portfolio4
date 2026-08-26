"use client";

import DbNavbar from "@/components/DbNavbar";
import "../../../styles/dashboard/dashboardGlobal.css";
import styles from "../../../styles/dashboard/dbProject.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Notification from "@/components/Notification";
import { PopUpBody } from "@/components/DbPopUp";
import PopUp from "@/components/PopUp";

interface project {
  CreatedAt: any;
  Description: string;
  IdProject: any;
  ImageProject: string;
  Link: string;
  NameProject: string;
  Type: string;
}

interface notif {
  condition: boolean;
  title: string;
  desc: string;
}

export default function DashboardProject() {
  const [data, setData] = useState<project[]>();
  const [notif, SetNotif] = useState(false);
  const [notifMessage, SetNotifMessage] = useState<notif>();
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/project`,
        );
        const json = await res.json();
        console.log(json);
        setData(json);
      } catch (err) {
        SetNotif(true);
        SetNotifMessage({
          condition: false,
          title: "Data Fetch Failed",
          desc: "Unable to retrieve project data from the server.",
        });
      }
    }
    getData();
  }, []);

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  const [getIdDelete, setGetIdDelete] = useState<string>("");
  async function deleteProject() {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/project/delete?id=${getIdDelete}`,
        {
          method: "DELETE",
        },
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);

  return (
    <>
      <div className="db-body">
        {openAdd ? <PopUpBody close={() => setOpenAdd(false)} /> : null}
        {deletePopUp ? (
          <PopUp
            title="Delete project?"
            close={() => setDeletePopUp(false)}
            action={deleteProject}
            button="Yes, Delete."
            desc="Your are going to delete project?"
          />
        ) : null}
        {notif ? (
          <Notification
            condition={Boolean(notifMessage?.condition)}
            headline={String(notifMessage?.title)}
            desc={String(notifMessage?.desc)}
          />
        ) : null}
        <div className="db-page">
          <DbNavbar />
          <div className="db-content">
            <div className="db-c-header">
              <h2>Project</h2>
              <button onClick={() => setOpenAdd(true)} className="btn-main">
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
                      <span className={styles.itemAction}>
                        <Link href={e.Link}>Visit Website</Link>
                        <button
                          onClick={() => {
                            setGetIdDelete(e.IdProject);
                            setDeletePopUp(true);
                          }}
                          className={styles.deleteButton}
                        >
                          <img src="/trash.png" alt="delete icon" />
                        </button>
                      </span>
                    </div>
                  );
                })
              ) : notif ? (
                <p className="p-second">No data available.</p>
              ) : (
                <img
                  className="loading"
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

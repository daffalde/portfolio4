"use client";

import DbNavbar from "@/components/DbNavbar";
import "../../../styles/dashboard/dashboardGlobal.css";
import styles from "../../../styles/dashboard/dbSkill.module.css";
import { useEffect, useState } from "react";
import { PopUpBody } from "@/components/DbPopUp";
import Notification from "@/components/Notification";

interface project {
  IdSkill: any;
  ImageSkill: string;
  NameSkill: string;
  Category: string;
}

interface notif {
  condition: boolean;
  title: string;
  desc: string;
}

export default function DashboardSkill() {
  const [popUpAdd, setPopUpAdd] = useState<boolean>(false);

  const [data, setData] = useState<project[]>();
  const [notif, SetNotif] = useState(false);
  const [notifMessage, SetNotifMessage] = useState<notif>();
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/skill`,
        );
        const json = await res.json();
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

  async function handleDelete(e: string) {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/skill/delete?id=${e}`,
        {
          method: "DELETE",
        },
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="db-body">
        {notif ? (
          <>
            <Notification
              condition={Boolean(notifMessage?.condition)}
              headline={String(notifMessage?.title)}
              desc={String(notifMessage?.desc)}
            />
          </>
        ) : null}
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
            <div className={styles.body}>
              <div className={styles.category}>
                <h4>Frontend</h4>
                <div className={styles.parent}>
                  {data ? (
                    data
                      .filter((e) => e.Category === "Frontend")
                      .map((e, _) => (
                        <div className={styles.item} key={e.IdSkill}>
                          <span>
                            <img src={e.ImageSkill} alt="skill image" />
                            <button
                              onClick={() => handleDelete(e.IdSkill)}
                              className={styles.deleteButton}
                            >
                              <img src="/trash.png" alt="delete icon" />
                            </button>
                          </span>
                          <h5>{e.NameSkill}</h5>
                        </div>
                      ))
                  ) : (
                    <p>No data available.</p>
                  )}
                </div>
              </div>
              <div className={styles.category}>
                <h4>Backend & Database</h4>
                <div className={styles.parent}>
                  {data ? (
                    data
                      .filter((e) => e.Category === "Backend & Database")
                      .map((e, _) => (
                        <div className={styles.item} key={e.IdSkill}>
                          <span>
                            <img src={e.ImageSkill} alt="skill image" />
                            <button
                              onClick={() => handleDelete(e.IdSkill)}
                              className={styles.deleteButton}
                            >
                              <img src="/trash.png" alt="delete icon" />
                            </button>
                          </span>
                          <h5>{e.NameSkill}</h5>
                        </div>
                      ))
                  ) : (
                    <p>No data available.</p>
                  )}
                </div>
              </div>
              <div className={styles.category}>
                <h4>Languages</h4>
                <div className={styles.parent}>
                  {data ? (
                    data
                      .filter((e) => e.Category === "Languages")
                      .map((e, _) => (
                        <div className={styles.item} key={e.IdSkill}>
                          <span>
                            <img src={e.ImageSkill} alt="skill image" />
                            <button
                              onClick={() => handleDelete(e.IdSkill)}
                              className={styles.deleteButton}
                            >
                              <img src="/trash.png" alt="delete icon" />
                            </button>
                          </span>
                          <h5>{e.NameSkill}</h5>
                        </div>
                      ))
                  ) : (
                    <p>No data available.</p>
                  )}
                </div>
              </div>
              <div className={styles.category}>
                <h4>DevOps & Cloud</h4>
                <div className={styles.parent}>
                  {data ? (
                    data
                      .filter((e) => e.Category === "DevOps & Cloud")
                      .map((e, _) => (
                        <div className={styles.item} key={e.IdSkill}>
                          <span>
                            <img src={e.ImageSkill} alt="skill image" />
                            <button
                              onClick={() => handleDelete(e.IdSkill)}
                              className={styles.deleteButton}
                            >
                              <img src="/trash.png" alt="delete icon" />
                            </button>
                          </span>
                          <h5>{e.NameSkill}</h5>
                        </div>
                      ))
                  ) : (
                    <p>No data available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

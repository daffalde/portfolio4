"use client";

import Image from "next/image";
import styles from "./dashnav.module.css";
import { useEffect, useState } from "react";
import Addporto from "./Addporto";

export default function Dashnav() {
  const [showAdd, setShowAdd] = useState<Boolean>(false);
  const navButton = [
    { image: "/dn-project.webp", name: "Project" },
    { image: "/dn-skill.webp", name: "Skill" },
    { image: "/dn-inbox.webp", name: "Inbox" },
  ];

  const [getPage, setGetPage] = useState<String | null>("Project");
  useEffect(() => {
    setGetPage(localStorage.getItem("page"));
  }, []);

  function changePage(e: any) {
    localStorage.removeItem("page");
    localStorage.setItem("page", e);
    window.location.reload();
  }
  return (
    <>
      <div className={styles.dashnav}>
        {showAdd && <Addporto onClose={() => setShowAdd(false)} />}
        <div className={styles.dashboard_logo}></div>
        <div className={styles.dashnav_button}>
          <ul>
            {navButton.map((e, i) => (
              <li key={i}>
                <button
                  className={`${styles.nav_button} ${getPage === e.name ? styles.nav_button_active : null}`}
                  onClick={() => changePage(e.name)}
                >
                  <Image
                    src={e.image}
                    alt="sign out icon"
                    width={24}
                    height={24}
                  />
                  <h6>{e.name}</h6>
                </button>
              </li>
            ))}
          </ul>
          <ul>
            <li>
              {" "}
              <button
                onClick={() => setShowAdd(true)}
                className={styles.nav_button}
              >
                <Image
                  src={"/dn-add.webp"}
                  alt="sign out icon"
                  width={24}
                  height={24}
                />{" "}
                <h6>Add Project</h6>
              </button>
            </li>
            <li>
              {" "}
              <button
                className={styles.nav_button}
                onClick={() => window.open("/")}
              >
                <Image
                  src={"/dn-web.webp"}
                  alt="sign out icon"
                  width={24}
                  height={24}
                />{" "}
                <h6>Go to site</h6>
              </button>
            </li>
          </ul>
        </div>
        <button className={styles.signout_buton}>
          <Image
            src={"/signout.webp"}
            alt="sign out icon"
            width={24}
            height={24}
          />{" "}
          <h6>Sign Out</h6>
        </button>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import styles from "./dashnav.module.css";
import { useEffect, useState } from "react";

export default function Dashnav() {
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
        <Image src={"/logo.webp"} alt="website logo" height={30} width={92} />
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
              <button className={styles.nav_button}>
                <Image
                  src={"/dn-add.webp"}
                  alt="sign out icon"
                  width={24}
                  height={24}
                />{" "}
                <p>Add Project</p>
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
                <p>Go to site</p>
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
          <p>Sign Out</p>
        </button>
      </div>
    </>
  );
}

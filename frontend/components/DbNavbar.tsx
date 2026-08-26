"use client";

import { usePathname } from "next/navigation";
import styles from "./dbNavbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { PopUpBody } from "./DbPopUp";

export default function DbNavbar() {
  const getPath = usePathname();
  const navbarData = [
    {
      name: "/dashboard",
      image: "home.png",
      link: "#",
    },
    {
      name: "/dashboard/project",
      image: "project.png",
      link: "#",
    },
    {
      name: "/dashboard/skill",
      image: "skill.png",
      link: "#",
    },
    {
      name: "/dashboard/message",
      image: "message.png",
      link: "#",
    },
    {
      name: "/dashboard/project?add=true",
      image: "add.png",
      link: "#",
    },
    {
      name: "link",
      image: "link.png",
      link: "#",
    },
  ];

  const [popUp, setPopUp] = useState(false);
  return (
    <>
      <div className={styles.body}>
        {popUp ? (
          <PopUpBody
            close={() => {
              setPopUp(false);
            }}
          />
        ) : null}
        <img src="/short-logo.png" alt="website logo" />
        <div className={`${styles.main}`}>
          <div className={styles.bg}>
            {navbarData.slice(0, 4).map((e, i) => (
              <Link key={i} href={e.name}>
                <button
                  className={`${styles.button} ${getPath == e.name ? styles.buttonSelected : ""}`}
                >
                  <img src={`/${e.image}`} alt="navbar icon" />
                </button>
              </Link>
            ))}
          </div>
          <div className={styles.bg}>
            <button
              onClick={() => setPopUp(true)}
              className={`${styles.button} `}
            >
              <img src={"/add.png"} alt="add icon" />
            </button>
            <button
              onClick={() => window.open("https://www.google.com/")}
              className={`${styles.button} `}
            >
              <img src={"/link.png"} alt="link icon" />
            </button>
          </div>
        </div>
        <div className={styles.bg}>
          <button className={styles.button}>
            <img src="/logout.png" alt="logout icon" />
          </button>
          <button
            className={`${styles.button} ${styles.profil}`}
            style={{
              backgroundImage: 'url("/db-bg.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></button>
        </div>
      </div>
    </>
  );
}

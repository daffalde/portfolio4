"use client";

import { Analytics } from "@vercel/analytics/next";
import styles from "../styles/home.module.css";
import Link from "next/link";

export default function Home() {
  const listSkill = [
    {
      image: "html",
      name: "HTML5",
    },
    {
      image: "css",
      name: "css3",
    },
    {
      image: "js",
      name: "JavaScript",
    },
    {
      image: "ts",
      name: "TypeScript",
    },
    {
      image: "react",
      name: "React",
    },
    {
      image: "next",
      name: "NextJS",
    },
    {
      image: "supabase",
      name: "Supabase",
    },
    {
      image: "figma",
      name: "Figma",
    },
    {
      image: "redux",
      name: "Redux",
    },
    {
      image: "git",
      name: "GIT",
    },
    {
      image: "docker",
      name: "Docker",
    },
  ];
  return (
    <>
      <div className="homepage">
        <Analytics />
        <div className={styles.body}>
          <div id="home" className={styles.hero}>
            <div className={styles.navbar}>
              <img height={20} src="/logo.png" alt="website logo" />
              <div className={`bg-template ${styles.navbarList}`}>
                <Link href={"#home"}>Home</Link>
                <Link href={"#skill"}>Skill</Link>
                <Link href={"#project"}>Project</Link>
                <button
                  onClick={() =>
                    window.open(
                      "mailto:daffalderayhan@gmail.com?subject=Collaboration%20Opportunity%20-%20Web%20Development%20Project&body=Hello%20Daffa,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20I%E2%80%99m%20impressed%20with%20your%20skills%20in%20Next.js%20and%20UI/UX%20design.%20I%E2%80%99d%20like%20to%20discuss%20a%20potential%20collaboration%20opportunity%20with%20you.%0D%0A%0D%0ALooking%20forward%20to%20your%20response.%0D%0A%0D%0ABest%20regards,%0D%0A[Your%20Name]",
                    )
                  }
                  className="btn-main"
                >
                  Contact me
                </button>
              </div>
            </div>
            <div className={styles.heroContent}>
              <img
                className={styles.heroContentProfil}
                src="/profil.jpg"
                alt="profil picture"
              />
              <h1>I’m Daffa alde Frontend developer based in Jakarta</h1>
              <p>
                Frontend developer passionate about building responsive, user
                friendly web interfaces and exploring fullstack solutions.
              </p>
              <button
                onClick={() =>
                  window.open("https://www.linkedin.com/in/daffa-alde/")
                }
                className="btn-main"
              >
                Hire me <img src="/arrow-right.png" alt="arrow icon" />
              </button>
            </div>
            <div className={styles.heroFooter}>
              <span>
                <Link href={"https://www.linkedin.com/in/daffa-alde/"}>
                  <h6>Linkedin</h6>
                </Link>
                <Link href={"https://github.com/daffalde"}>
                  <h6>github</h6>
                </Link>
              </span>
              <Link href={"#"}>
                <h6>Check my resume</h6>
                <img src="/homeLink.png" alt="link icon" width={16} />
              </Link>
            </div>
          </div>
          <div id="skill" className={styles.skill}>
            <h1>
              Design and develop with a focus on{" "}
              <span>clean code, responsive layouts, and user experiences</span>,
              transforming ideas into <span>functional, elegant solutions</span>{" "}
              that balance creativity with technical precision.
            </h1>
            <div className={`bg-template ${styles.skillList}`}>
              {listSkill.map((e, i) => (
                <div key={i} className={styles.skillItem}>
                  <p className={`bg-template ${styles.skillName}`}>{e.name}</p>
                  <img src={`/skill/${e.image}.png`} alt="skill icon" />
                </div>
              ))}
            </div>
          </div>
          <div id="project" className={styles.project}>
            <span>
              <h2>From Idea to Impact</h2>
              <p>
                A showcase of selected projects highlighting modern web
                development, UI/UX design, and creative problem solving.
              </p>
            </span>
            <div className={styles.projectImage}>
              <img src="/mac-button.png" alt="mac traffic button" />
              <img src="/projectImg.png" alt="main project image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

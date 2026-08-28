"use client";

import { Analytics } from "@vercel/analytics/next";
import styles from "../styles/home.module.css";
import Link from "next/link";

export default function Home() {
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
        </div>
      </div>
    </>
  );
}

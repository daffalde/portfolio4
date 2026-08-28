import Image from "next/image";
import styles from "./page.module.css";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <>
      <div className="homepage">
        <Analytics />
        <img width={"100px"} src="/cone.png" alt="working progress logo" />
        <h4>Work in Progress </h4>
        <p>We are still developing this site, so expect ongoing updates.</p>
      </div>
    </>
  );
}

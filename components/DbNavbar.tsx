"use client";

import { usePathname } from "next/navigation";
import styles from "../styles/components/dbNavbar.module.css";
import { useRouter } from "next/navigation";
import { hanldeLogout } from "@/lib/logout";

export default function DbNavbar() {
  const path = usePathname();
  const router = useRouter();
  const navigation = [
    {
      image: "home",
      link: "/dashboard/home",
    },
    {
      image: "project",
      link: "/dashboard/project",
    },
    {
      image: "link",
      link: "https://daffalde.site/",
    },
  ];
  // async function handleLogout() {
  //   try {
  //     await fetch("/api/auth/logout", {
  //       method: "POST",
  //     });
  //     console.log("data dihapus");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  return (
    <>
      <div className={styles.body}>
        <div className={styles.navigation}>
          {navigation.map((e, i) => (
            <button
              onClick={() => {
                if (e.image == "link") {
                  window.open(e.link);
                } else {
                  router.push(e.link);
                }
              }}
              key={i}
              className={`${styles.item} ${path == e.link ? styles.itemSelected : null}`}
            >
              <img src={`/${e.image}.png`} alt="navigation icon" />
            </button>
          ))}
        </div>
        <div className={styles.navigation}>
          <button
            onClick={() => {
              hanldeLogout();
              router.push("/auth/login");
            }}
            className={`${styles.item} `}
          >
            <img src={`/logout.png`} alt="navigation icon" />
          </button>
        </div>
      </div>
    </>
  );
}

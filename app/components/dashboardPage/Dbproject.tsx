import { useEffect, useState } from "react";
import styles from "./dbpage.module.css";
import { createClient } from "@/app/utils/supabase/client";
import Image from "next/image";

interface getData {
  id_project: number;
  p_desc: string;
  p_image: string;
  p_link: string;
  p_logo: string;
  p_name: string;
  p_status: number;
}

export default function DbProject() {
  const [data, setData] = useState<getData[] | null>([]);

  useEffect(() => {
    const supabase = createClient();
    async function handleGetData() {
      try {
        const { data, error } = await supabase.from("project").select("*");
        console.log(data);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    }
    handleGetData();
  }, []);

  const [select, setSelect] = useState<Number | null>();
  return (
    <>
      <div className={`${styles.left} ${styles.dbproject_left}`}>
        {data
          ?.sort((a, b) => a.p_status - b.p_status)
          .map((e, i) => (
            <div
              style={
                select === e.id_project ? { border: `1px solid white` } : {}
              }
              onClick={() => setSelect(e.id_project)}
              key={e.id_project}
              className={styles.item_dbproject}
            >
              <div className={styles.item_dbproject_status}>
                {e.p_status === 1 ? (
                  <>
                    <Image
                      src={"/online.png"}
                      alt="status icon"
                      width={8}
                      height={8}
                    />
                    <p>Online</p>
                  </>
                ) : e.p_status === 2 ? (
                  <>
                    <Image
                      src={"/production.png"}
                      alt="status icon"
                      width={8}
                      height={8}
                    />
                    <p>Production</p>
                  </>
                ) : (
                  <>
                    <Image
                      src={"/offline.png"}
                      alt="status icon"
                      width={8}
                      height={8}
                    />
                    <p>Offline</p>
                  </>
                )}
              </div>
              <div className={styles.item_dbproject_image}>
                <img src={e.p_logo} alt="project logo" />
              </div>
            </div>
          ))}
      </div>
      <div className={`${styles.right}`}>
        {select ? (
          data
            ?.filter((e) => e.id_project === select)
            .map((e, i) => (
              <div key={e.id_project} className={styles.dbproject_right}>
                <h5>Edit Project</h5>
                <input
                  className="input-text"
                  type="text"
                  placeholder="Title...."
                  defaultValue={e.p_name}
                />
                <textarea
                  placeholder="Website description...."
                  defaultValue={e.p_desc}
                ></textarea>
                <input
                  className="input-text"
                  type="text"
                  placeholder="Link...."
                  defaultValue={e.p_link}
                />
                <select defaultValue={e.p_status}>
                  <option hidden value="0">
                    Select type
                  </option>
                  <option value="1">🟢 Online</option>
                  <option value="2">🟡 Production</option>
                  <option value="3">🔴 Offline</option>
                </select>
              </div>
            ))
        ) : (
          <div className={styles.dbproject_null}>
            <p style={{ opacity: "0.2" }}>Select the project.</p>
          </div>
        )}
      </div>
    </>
  );
}

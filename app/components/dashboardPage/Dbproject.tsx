import { useEffect, useState } from "react";
import styles from "./dbpage.module.css";
import { createClient } from "@/app/utils/supabase/client";
import Image from "next/image";
import { HandlePatchProject } from "../Postdata";

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
  const [showEdit, setShowEdit] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [data, setData] = useState<getData[] | null>([]);

  useEffect(() => {
    setIsLoading(true);
    const supabase = createClient();
    async function handleGetData() {
      try {
        const { data, error } = await supabase.from("project").select("*");
        console.log(data);
        setData(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    handleGetData();
  }, []);

  const [select, setSelect] = useState<Number | null>();

  const [getImage, setGetImage] = useState<File | null>();
  const [getImageUrl, setImageUrl] = useState<String | null>();

  function handleImage(e: any) {
    const file = e.target.files?.[0];
    setImageUrl(URL.createObjectURL(file));
    setGetImage(file);
  }

  const [title, setTitle] = useState<String>("");
  const [desc, setDesc] = useState<String>("");
  const [link, setLink] = useState<String>("");
  const [status, setStatus] = useState<Number>(3);
  const [getLogo, setGetLogo] = useState<File | null>();
  const [getLogoUrl, setLogoUrl] = useState<String | null>();

  function handleLogo(e: any) {
    const file = e.target.files?.[0];
    setLogoUrl(URL.createObjectURL(file));
    setGetLogo(file);
  }
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
              onClick={() => {
                setSelect(e.id_project);
                setShowEdit(true);
              }}
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

      <div
        className={`${styles.right} ${showEdit ? styles.dbproject_show : styles.dbproject_hide}  ${styles.dbproject_float} `}
      >
        {select ? (
          data
            ?.filter((e) => e.id_project === select)
            .map((e, i) => (
              <div key={e.id_project} className={styles.dbproject_right}>
                <h5>Edit Project</h5>
                <div className="input-file-long-wrap">
                  {getImageUrl ? (
                    <div
                      style={{
                        backgroundImage: `url(${getImageUrl ? getImageUrl : "none"})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        opacity: "1",
                        borderRadius: "5px",
                      }}
                    ></div>
                  ) : (
                    <div
                      style={{
                        backgroundImage: `url(${e.p_image})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        opacity: "1",
                        borderRadius: "5px",
                      }}
                    ></div>
                  )}
                  <input
                    onChange={handleImage}
                    className="input-file-long"
                    type="file"
                  />
                </div>
                <div className="input-file-short-wrap">
                  {getLogoUrl ? (
                    <div
                      style={{
                        backgroundImage: `url(${getLogoUrl ? getLogoUrl : "none"})`,
                        backgroundPosition: "center",
                        backgroundSize: "80% auto ",
                        backgroundRepeat: "no-repeat",
                        opacity: "1",
                        borderRadius: "5px",
                      }}
                    ></div>
                  ) : (
                    <div
                      style={{
                        backgroundImage: `url(${e.p_logo})`,
                        backgroundPosition: "center",
                        backgroundSize: "80% auto ",
                        backgroundRepeat: "no-repeat",
                        opacity: "1",
                        borderRadius: "5px",
                      }}
                    ></div>
                  )}
                  <input
                    onChange={handleLogo}
                    className="input-file-short"
                    type="file"
                  />
                </div>
                <p style={{ fontSize: "12px" }}>
                  *Click image to change picture
                </p>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-text"
                  type="text"
                  placeholder="Title...."
                  defaultValue={e.p_name}
                />
                <textarea
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Website description...."
                  defaultValue={e.p_desc}
                ></textarea>
                <input
                  onChange={(e) => setLink(e.target.value)}
                  className="input-text"
                  type="text"
                  placeholder="Link...."
                  defaultValue={e.p_link}
                />
                <select
                  onChange={(e) => setStatus(Number(e.target.value))}
                  defaultValue={e.p_status}
                >
                  <option hidden value="0">
                    Select type
                  </option>
                  <option value="1">🟢 Online</option>
                  <option value="2">🟡 Production</option>
                  <option value="3">🔴 Offline</option>
                </select>
                <div className={styles.button_action}>
                  <button
                    onClick={() => setShowEdit(false)}
                    className={`second-button ${isLoading ? "button-false" : null}`}
                  >
                    <h6>Cancel</h6>
                  </button>
                  <button
                    onClick={() => {
                      setIsLoading(true);
                      HandlePatchProject({
                        id: e.id_project,
                        title: title === "" ? e.p_name : title,
                        desc: desc === "" ? e.p_desc : desc,
                        link: link === "" ? e.p_link : link,
                        status: status,
                        image: getImage,
                        imageName: String(e.p_image.split("/").pop()),
                        logo: getLogo,
                        logoName: String(e.p_logo.split("/").pop()),
                      });
                    }}
                    className={`main-button ${isLoading ? "button-false" : null}`}
                  >
                    {isLoading && (
                      <Image
                        src={"/loading.gif"}
                        alt="loading icon"
                        width={20}
                        height={20}
                      />
                    )}
                    <h6>Save</h6>
                  </button>
                </div>
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

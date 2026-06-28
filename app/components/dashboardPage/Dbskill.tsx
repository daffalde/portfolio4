import { useState } from "react";
import styles from "./dbpage.module.css";
import Image from "next/image";
import { HandlePostSkill } from "../Postdata";

export default function Dbskill() {
  const [category, setCategory] = useState<String>("");
  const [name, setName] = useState<String>("");
  const [logo, setLogo] = useState<any>();
  const [logoPreview, setLogoPreview] = useState<String>("");

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  function getLogoImage(e: any) {
    const file = e.target.files?.[0];
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  }
  return (
    <>
      <div className={styles.db_skill}>
        <div className={styles.db_skill_add}>
          <h5>Add Skill</h5>
          <div className={styles.db_skill_add_input}>
            <div className="input-file-short-wrap">
              {logoPreview ? (
                <div
                  style={{
                    backgroundImage: `url(${logoPreview ? logoPreview : "none"})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    opacity: "1",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                ></div>
              ) : (
                <div>
                  <Image
                    src={"/upload.webp"}
                    alt="upload icon"
                    width={20}
                    height={20}
                  />
                  <p>Logo</p>
                </div>
              )}
              <input
                onChange={getLogoImage}
                className="input-file-short"
                type="file"
              />
            </div>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option hidden value="">
                Category
              </option>
              <option value="FrontEnd">FrontEnd</option>
              <option value="Backend & Database">Backend & Database</option>
              <option value="Language">Language</option>
              <option value="DevOps & Cloud">DevOps & Cloud</option>
            </select>
            <input
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%" }}
              className="input-text"
              type="text"
              placeholder="Skill name...."
            />
            <button
              onClick={() => {
                setIsLoading(true);
                HandlePostSkill({
                  image: logo,
                  category: category,
                  name: name,
                });
              }}
              className="main-button"
            >
              <h6>Submit</h6>
              <Image
                src={`/${isLoading ? "loading.gif" : "submit.png"}`}
                alt="submit icon"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
        <div className="divider-horizontal"></div>
      </div>
    </>
  );
}

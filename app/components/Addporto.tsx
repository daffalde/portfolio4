"use client";

import Image from "next/image";
import styles from "./addporto.module.css";
import { useState } from "react";

interface fungsiCancel {
  onClose: () => void;
}

export default function Addporto({ onClose }: fungsiCancel) {
  const [getImage, setGetImage] = useState<String | null>(null);

  function handleImage(e: any) {
    const file = e.target.files?.[0];
    setGetImage(URL.createObjectURL(file));
  }

  const [getLogo, setGetLogo] = useState<String | null>(null);

  function handleLogo(e: any) {
    const file = e.target.files?.[0];
    setGetLogo(URL.createObjectURL(file));
  }
  return (
    <>
      <div onClick={onClose} className={styles.addporto}></div>
      <div className={styles.addporto_bg}>
        <h5>Add Project</h5>
        <form>
          <div className="input-file-long-wrap">
            {getImage ? (
              <div
                style={{
                  backgroundImage: `url(${getImage ? getImage : "none"})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  opacity: "1",
                  borderRadius: "5px",
                }}
              ></div>
            ) : (
              <div>
                <Image
                  src={"/upload.webp"}
                  alt="upload icon"
                  width={35}
                  height={35}
                />
                <h6>Upload Screenshoot of Website</h6>
                <p>.webp less than 1 mb.</p>
              </div>
            )}
            <input
              onChange={handleImage}
              className="input-file-long"
              type="file"
            />
          </div>
          <div className="input-file-short-wrap">
            {getLogo ? (
              <div
                style={{
                  backgroundImage: `url(${getLogo ? getLogo : "none"})`,
                  backgroundPosition: "center",
                  backgroundSize: "80% auto ",
                  backgroundRepeat: "no-repeat",
                  opacity: "1",
                  borderRadius: "5px",
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
              onChange={handleLogo}
              className="input-file-short"
              type="file"
            />
          </div>
          <input className="input-text" type="text" placeholder="Title...." />
          <textarea placeholder="Website Description...."></textarea>
          <input className="input-text" type="text" placeholder="Link...." />
          <select name="" id="">
            <option value={1}>🟢 Online</option>
            <option value={2}>🟡 Production</option>
            <option value={3}>🔴 Offline</option>
          </select>
          <div className={styles.button_action}>
            <button onClick={onClose} className="second-button">
              <h6>Cancel</h6>
            </button>
            <button className="main-button">
              <h6>Save</h6>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

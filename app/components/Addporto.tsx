"use client";

import Image from "next/image";
import styles from "./addporto.module.css";
import { useState } from "react";
import { HandlePostProject } from "./Postdata";

interface fungsiCancel {
  onClose: () => void;
}

export default function Addporto({ onClose }: fungsiCancel) {
  const [title, setTitle] = useState<String>("");
  const [desc, setDesc] = useState<String>("");
  const [link, setLink] = useState<String>("");
  const [status, setStatus] = useState<Number>(3);
  const [image, setImage] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [getImage, setGetImage] = useState<String | null>(null);

  function handleImage(e: any) {
    const file = e.target.files?.[0];
    setGetImage(URL.createObjectURL(file));
    setImage(file);
    console.log(file.name);
    console.log(file.size);
  }

  const [getLogo, setGetLogo] = useState<String | null>(null);

  function handleLogo(e: any) {
    const file = e.target.files?.[0];
    setGetLogo(URL.createObjectURL(file));
    setLogo(file);
  }

  return (
    <>
      <div onClick={onClose} className={styles.addporto}></div>
      <div className={styles.addporto_bg}>
        <h5>Add Project</h5>

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
        <p style={{ fontSize: "12px" }}>*Image size must be under 500KB</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="input-text"
          type="text"
          placeholder="Title...."
        />
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Website Description...."
        ></textarea>
        <input
          onChange={(e) => setLink(e.target.value)}
          className="input-text"
          type="text"
          placeholder="Link...."
        />
        <select onChange={(e) => setStatus(Number(e.target.value))}>
          <option hidden value="0">
            Select type
          </option>
          <option value="1">🟢 Online</option>
          <option value="2">🟡 Production</option>
          <option value="3">🔴 Offline</option>
        </select>
        <div className={styles.button_action}>
          <button
            onClick={onClose}
            className={`second-button ${isLoading ? "button-false" : null}`}
          >
            <h6>Cancel</h6>
          </button>
          <button
            onClick={() => {
              setIsLoading(true);
              HandlePostProject({
                title: title,
                desc: desc,
                link: link,
                status: status,
                image: image,
                logo: logo,
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
    </>
  );
}

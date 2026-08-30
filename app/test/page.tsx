"use client";

import { useState } from "react";

export default function Test() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  async function handleSend(e: any) {
    e.preventDefault();

    try {
      const res = await fetch("/api/skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skill_name: name,
          skill_link: link,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <h1>ini halaman tes</h1>
      <h2>input skill</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="link"
      />
      <button onClick={handleSend}>send</button>
    </>
  );
}

"use client";

import { useState } from "react";
import styles from "../../../styles/auth/login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("login error");
      return;
    }

    console.log(data);
  }
  return (
    <>
      <div className="homepage">
        <div className={styles.body}>
          <div className={`bg-template ${styles.content}`}>
            <h5>Welcome back, Daffa!</h5>
            <span>
              <p>Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="yourmail@something.com"
              />
            </span>
            <span>
              <p>Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="********"
              />
            </span>
            <button onClick={handleLogin} className="btn-main">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

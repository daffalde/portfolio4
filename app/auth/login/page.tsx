"use client";

import { useState } from "react";
import styles from "../../../styles/auth/login.module.css";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [peekPass, setPeekPass] = useState(true);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleLogin(e: any) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        console.log("login error");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data.error) {
        setLoading(false);
        setError(true);
        return;
      }

      console.log(data);
      router.push("/dashboard/home");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
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
                className={`${error ? "input-warning" : null}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="yourmail@something.com"
              />
            </span>
            <span>
              <p>Password</p>
              <div>
                <input
                  className={`${error ? "input-warning" : null}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={`${peekPass ? "password" : "text"}`}
                  placeholder="********"
                />
                <img
                  width={"25px"}
                  src={`${peekPass ? "/eye-open.png" : "/eye-close.png"}`}
                  alt="peek password icon"
                  onClick={() => setPeekPass(!peekPass)}
                />
              </div>
            </span>
            {error ? (
              <p className="p-error">Incorrect email or password</p>
            ) : null}
            <button
              onClick={handleLogin}
              className={`btn-main ${loading ? ".btn-disable" : null}`}
            >
              {loading ? <img src="/loading.gif" alt="loading icon" /> : null}
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

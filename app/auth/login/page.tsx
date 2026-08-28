"use client";

import { useState } from "react";
import styles from "../../../styles/auth/login.module.css";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface loginData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loginValue, setLoginValue] = useState<loginData>({
    email: "",
    password: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setLoginValue({
      ...loginValue,
      [name]: value,
    });
  }

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginValue.email,
      password: loginValue.password,
    });
    if (error) {
      setError(true);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }
  return (
    <>
      <div className={styles.body}>
        <div className={styles.bodyLeft}>
          <button className="btn-second">
            <img src="/back.png" alt="back icon" />
            <p>Back to home</p>
          </button>
          <div className={styles.blContent}>
            <img src="/full-logo.png" alt="website icon" />
            <p className="p-second">
              Bachelor’s degree in Computer Science from Mercu Buana University,
              Yogyakarta, specializing in web application development. Skilled
              in UI/UX with Figma, front‑end, back‑end, databases , and
              deployment.
            </p>
          </div>
        </div>
        <div className={styles.bodyRight}>
          <span>
            <h4>Welcome back, Daffa!</h4>
            <p className="p-second">
              To keep things easy, just login with your email or hit that button
              to continue.
            </p>
          </span>
          <span>
            <h6>Email</h6>
            <input
              className={`${error ? "input-warning" : null}`}
              type="text"
              placeholder="yourmail@provider.com"
              name="email"
              value={loginValue.email ?? ""}
              onChange={handleChange}
            />
          </span>
          <span>
            <h6>Password</h6>
            <input
              className={`${error ? "input-warning" : null}`}
              type="password"
              placeholder="********"
              name="password"
              value={loginValue.password ?? ""}
              onChange={handleChange}
            />
            {error ? (
              <p className="p-error">
                Email tidak ditemukan atau password salah
              </p>
            ) : null}
          </span>
          <button
            onClick={handleLogin}
            className={`btn-main ${loading ? "btn-disable" : null}`}
          >
            {loading ? <img src="/loading.gif" alt="loading icon" /> : null}{" "}
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}

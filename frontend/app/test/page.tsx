"use client";

import { useMiddleware } from "@/lib/authHelper";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function Test() {
  const route = useRouter();
  useEffect(() => {
    async function getData() {
      const sesi = await useMiddleware();
      console.log(sesi);
      if (!sesi) {
        route.push("/auth/login");
      }
    }
    getData();
  }, []);

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div
        style={{ widows: "100%", height: "100dvh", backgroundColor: "black" }}
      >
        <h1>tes</h1>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </>
  );
}

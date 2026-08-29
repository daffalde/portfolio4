"use client";

export default function Test() {
  async function hanldeLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <h1>ini tes</h1>
      <button onClick={hanldeLogout}>logout</button>
    </>
  );
}

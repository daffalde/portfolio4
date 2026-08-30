"use server";

import { cookies } from "next/headers";

export default async function Test() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (token) {
    console.log("token ada");
  } else {
    console.log("token tdk ada");
  }
  return (
    <>
      <h1>ini halaman tes</h1>
    </>
  );
}

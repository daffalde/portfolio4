"use server";

import { cookies } from "next/headers";

export default async function Test() {
  const cookieStore = await cookies();

  const data = cookieStore.get("access_token")?.value;

  if (data) {
    console.log("cookie ada");
  } else {
    console.log("cookie tidak ada");
  }
  return (
    <>
      <h1>ini halaman tes</h1>
    </>
  );
}

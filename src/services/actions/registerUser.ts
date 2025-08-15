/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const registerUser = async (payload: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/auth/sign-up`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const userInfo = await res.json();
  return userInfo;
};

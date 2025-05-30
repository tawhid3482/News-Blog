//  "use server";

import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";
// import setAccessToken from './setAccessToken';

export const userLogin = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
    // cache: "no-store",
  });
  const userInfo = await res.json();
  if (!res.ok) {
    throw new Error(userInfo?.message || "Login failed");
  }

   const passwordChangeRequired = userInfo.data.needPasswordChange;

   if (userInfo.data.accessToken) {
      setAccessToken(userInfo.data.accessToken, {
         redirect: '/',
         passwordChangeRequired,
      });
   }

  return userInfo;
};

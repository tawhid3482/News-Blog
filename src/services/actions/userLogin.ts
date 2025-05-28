 "use server";

import { FieldValues } from 'react-hook-form';
// import setAccessToken from './setAccessToken';

export const userLogin = async (data: FieldValues) => {
  const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
    // cache: "no-store",
  });
  const userInfo = await res.json();

  

  return userInfo;
};

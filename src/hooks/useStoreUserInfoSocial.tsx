// src/hooks/useStoreUserInfo.tsx (or inside your _app.tsx or layout)

import { storeUserInfo } from "@/services/auth.services";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


export const useStoreUserInfo = () => {
  const { data: session } = useSession();
  console.log(session)

useEffect(() => {
  if (session?.accessToken) {
    console.log("Storing access token:", session.accessToken);
    storeUserInfo({ accessToken: session.accessToken });
  }
}, [session?.accessToken]);

};

// src/hooks/useStoreUserInfo.tsx (or inside your _app.tsx or layout)

import { storeUserInfo } from "@/services/auth.services";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


export const useStoreUserInfo = () => {
  const { data: session } = useSession();

useEffect(() => {
  if (session?.accessToken) {
    storeUserInfo({ accessToken: session.accessToken });
  }
}, [session?.accessToken]);

};

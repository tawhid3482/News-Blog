/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { storeUserInfo, isLoggedIn } from "@/services/auth.services";

export const useStoreUserInfo = () => {
  const { data: session, status } = useSession();
  const [posted, setPosted] = useState(false);
  useEffect(() => {
    if (status === "loading") return;

    const postUser = async () => {
      if (session?.user?.email && !posted && !isLoggedIn()) {
        try {
          const res = await axios.post(
            "https://news-blog-server-production-ba38.up.railway.app/api/s1/auth/social-login",
            {
              name: session.user.name,
              email: session.user.email,
              profilePhoto: session.user.profilePhoto,
              gender: "OTHER",
            },
            {
              withCredentials: true,
            }
          );
          const userInfo = res.data;

          if (res.status < 200 || res.status >= 300) {
            throw new Error(userInfo?.message || "Login failed");
          }

          if (userInfo.token) {
            storeUserInfo({ accessToken: userInfo.token });

            setPosted(true);

            if (userInfo.data.needPasswordChange) {
              window.location.href = "/dashboard/change-password";
            } else {
              window.location.href = "/";
            }
          }
        } catch (error: any) {
          console.error("Social login", error.response?.data || error.message);
        }
      }
    };

    postUser();
  }, [session, posted, status]);
};

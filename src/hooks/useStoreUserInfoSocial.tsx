/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { storeUserInfo, isLoggedIn } from "@/services/auth.services";
import { useRouter } from "next/navigation";

export const useStoreUserInfo = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    if (status !== "authenticated" || posted || isLoggedIn()) return;

    const postUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/s1/auth/social-login",
          {
            name: session?.user?.name,
            email: session?.user?.email,
            profilePhoto: session?.user?.profilePhoto,
            gender: "OTHER",
          },
          {
            withCredentials: true,
          }
        );

        const userInfo = res.data;

        if (userInfo?.token) {
          storeUserInfo({ accessToken: userInfo.token }); // optional if you want to store in localStorage

          setPosted(true);

          // Ensure cookies are set before redirect
          setTimeout(() => {
            if (userInfo.data.needPasswordChange) {
              window.location.href = "/dashboard/change-password";
            } else {
              router.refresh();
            }
          }, 200);
        }
      } catch (error: any) {
        console.error(
          "Social login failed:",
          error.response?.data || error.message
        );
      }
    };

    postUser();
  }, [session, posted, status, router]);
};

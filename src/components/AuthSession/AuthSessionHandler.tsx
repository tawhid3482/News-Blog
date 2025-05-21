/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

// Extend Session type to include 'token'
declare module "next-auth" {
  interface Session {
    token?: string;
  }
}
import { useAppDispatch } from "@/redux/features/hooks";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";

export default function AuthSessionHandler() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
 
    if (status === "authenticated" && session?.token) {
      const user = verifyToken(session.token) as TUser;
      dispatch(setUser({ user, token: session.token }));
    }
  }, [session, status, dispatch]);

  if (status === "loading") return null;

  return null;
}

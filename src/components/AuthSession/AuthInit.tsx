"use client";

import { useStoreUserInfo } from "@/hooks/useStoreUserInfoSocial";


const AuthInit = () => {
  useStoreUserInfo(); 
  return null;
};

export default AuthInit;

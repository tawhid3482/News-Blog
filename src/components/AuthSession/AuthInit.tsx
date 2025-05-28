// src/components/AuthInit.tsx
"use client";

import { useStoreUserInfo } from "@/hooks/useStoreUserInfoSocial";


const AuthInit = () => {
  useStoreUserInfo(); // 👉 এখানেই হুকটা কল হবে
  return null;
};

export default AuthInit;

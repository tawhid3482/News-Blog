// components/SocialLoginButtons.tsx
"use client";

import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className=" border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-full p-3 shadow-md transition cursor-pointer"
        aria-label="Login with Google"
      >
        <FaGoogle className="text-2xl text-[#db4437]" />
      </button>
      <button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="rounded-full p-3 shadow-md transition cursor-pointer"
        aria-label="Login with GitHub"
      >
        <FaGithub className="text-2xl bg-ba" />
      </button>
    </div>
  );
}

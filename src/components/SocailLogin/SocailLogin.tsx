// components/SocialLoginButtons.tsx
"use client";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <div className="space-x-2 flex items-center justify-center gap-4">
      <button
        onClick={() =>
          signIn("google", { callbackUrl: "http://localhost:3000" })
        }
        className="  text-white  rounded-full  cursor-pointer"
      >
        <FaGoogle className="text-4xl text-[#bd8f2d]"></FaGoogle>
      </button>
      <button
        onClick={() =>
          signIn("github", { callbackUrl: "http://localhost:3000" })
        }
        className="bg-gray-800 text-white rounded-full cursor-pointer"
      >
        <FaGithub className="text-4xl"></FaGithub>
      </button>
    </div>
  );
}

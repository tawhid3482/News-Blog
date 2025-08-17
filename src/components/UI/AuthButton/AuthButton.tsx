"use client";
import Link from "next/link";
import { getUserInfo, removeUser } from "@/services/auth.services";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "../button";

const AuthButton = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const userInfo = getUserInfo();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    removeUser();
    await signOut({ redirect: false });
    router.refresh();
  };

  return (
    <div>
      {isClient && userInfo?.userEmail ? (
        <div className="flex items-center gap-5">
          <Link
            href={`/dashboard/${userInfo.role}`}
            className="text-lg font-medium hover:text-[#0896EF]"
          >
            Dashboard
          </Link>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        isClient && (
          <div className="flex items-center gap-5">
            <Link
              href="/signin"
              className="text-lg font-medium hover:text-[#0896EF]"
            >
              <Button>Sign In</Button>
            </Link>
            <Link
              href="/signup"
              className="text-lg font-medium hover:text-[#0896EF]"
            >
              <Button>Sign Up</Button>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default AuthButton;

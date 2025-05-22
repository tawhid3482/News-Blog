"use client"
import Link from "next/link";
import { Button } from "../button";
import { getUserInfo, removeUser } from "@/services/auth.services";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const userInfo = getUserInfo();

    useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    removeUser();
    router.refresh();
  };

  return (
    <div>
      {isClient && userInfo?.userId ? (
        <div className="flex items-center gap-5">
          <Link
            href="/profile"
            className="text-lg font-medium hover:text-[#0896EF]"
          >
            Profile
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

"use client";
import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer";
import { isLoggedIn } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isLoggedIn();
      if (!loggedIn) {
        router.push("/signin");
      } else {
        setAuthChecked(true); // token আছে → UI render করো
      }
    };

    checkAuth();
  }, [router]);

  if (!authChecked) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  // if (!isLoggedIn()) {
  //    return router.push('/signin');
  // }
  return <DashboardDrawer>{children} </DashboardDrawer>;
};

export default DashboardLayout;

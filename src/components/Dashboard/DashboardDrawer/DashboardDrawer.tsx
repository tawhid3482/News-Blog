"use client";

import { useEffect, useState } from "react";
import { useGetSingleUserQuery } from "@/redux/features/user/userApi";
import Sidebar from "../Sidebar/Sidebar";
import AppNavbar from "./DashboardAppbar";

export default function DashboardDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const isLargeScreen = window.matchMedia("(min-width:1024px)").matches;
    if (isLargeScreen) {
      setIsOpen(true);
    }
  }, []);

  const { data, isLoading } = useGetSingleUserQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  if (isLoading || !data) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full ">
      <div
        className={`fixed z-30 inset-y-0 left-0 transition-all duration-300 
      ${isOpen ? "w-64" : "w-16"} 
      sm:${isOpen ? "w-64" : "w-16"}
      md:${isOpen ? "w-64" : "w-20"}
      lg:${isOpen ? "w-64" : "w-16"}
    `}
      >
        <Sidebar
          open={isOpen}
          role={data?.role?.toLowerCase()}
          toggle={() => setIsOpen(!isOpen)}
        />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ${
         isOpen ? "ml-64" : "ml-16"
        } 2xl:ml-0`}
      >
        <AppNavbar
          userName={isLoading ? "Loading..." : data?.name || "user"}
          userImage={data?.profilePhoto || "/default-user.png"}
        />
        <main className="p-3 sm:p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

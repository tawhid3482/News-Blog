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
  const { data, isLoading } = useGetSingleUserQuery({});
  console.log(data);
  useEffect(() => {
    const isLargeScreen = window.matchMedia("(min-width:1024px)").matches;
    if (isLargeScreen) {
      setIsOpen(true);
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        open={isOpen}
        role={data?.role.toLowerCase()}
        toggle={() => setIsOpen(!isOpen)}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        } lg:ml-0`}
      >
        <AppNavbar
          userName={isLoading ? "Loading..." : data?.name || "User"}
          userImage={data?.profilePhoto}
        />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

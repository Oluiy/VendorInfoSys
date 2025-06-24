"use client";
import AdminNavbar from "@/components/shared/AdminNavbar";
import ManagerNavbar from "@/components/shared/ManagerNavbar";
import Navbar from "@/components/shared/Navbar";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function RoleNavbarClient() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <AdminNavbar />;
  if (pathname.startsWith("/manager")) return <ManagerNavbar />;
  return <Navbar />;
}

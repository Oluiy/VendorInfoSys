"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (role && user.role !== role) {
      router.replace("/login");
    }
  }, [user, role, router]);

  if (!user || (role && user.role !== role)) {
    return null;
  }

  return children;
}

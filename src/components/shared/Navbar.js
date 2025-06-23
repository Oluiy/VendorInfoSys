"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <nav className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-widest">
            V.I.S
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href={user.role === "admin" ? "/admin" : "/vendor"}>
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

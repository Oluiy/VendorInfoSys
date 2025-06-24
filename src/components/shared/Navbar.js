"use client";
import Link from "next/link";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <nav className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-widest">
            V.I.S
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

"use client";
import Link from "next/link";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/manager", label: "Main Dashboard" },
  { href: "/manager/vendors", label: "Vendors" },
  { href: "/manager/products", label: "Products Offered" },
];

export default function ManagerNavbar() {
  const { logout } = useAuth();
  const pathname = usePathname();
  return (
    <header className="sticky top-0 left-0 right-0 z-20 bg-background border-b">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/manager" className="text-2xl font-bold tracking-widest">
          V.I.S
        </Link>
        <div className="flex gap-4 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium px-2 py-1 rounded transition-colors ${
                pathname === link.href
                  ? "bg-muted text-primary"
                  : "hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
}

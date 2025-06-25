import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import RoleNavbarClient from "@/components/shared/RoleNavbarClient";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <RoleNavbarClient />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-24">
              {children}
            </main>
          </Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

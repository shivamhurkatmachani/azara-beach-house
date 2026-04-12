"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isV2    = pathname?.startsWith("/v2");
  const showChrome = !isAdmin && !isV2;

  return (
    <>
      {showChrome && <Navbar />}
      {children}
      {showChrome && <Footer />}
    </>
  );
}

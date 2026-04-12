"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isV2    = pathname?.startsWith("/v2");
  const isV3    = pathname?.startsWith("/v3");
  const showChrome = !isAdmin && !isV2 && !isV3;

  return (
    <>
      {showChrome && <Navbar />}
      {children}
      {showChrome && <Footer />}
      {/* Floating WhatsApp button — mobile/tablet only, all non-admin pages */}
      {!isAdmin && <WhatsAppFloat />}
    </>
  );
}

"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin  = pathname === "/admin/login";

  if (isLogin) return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:ml-60 pt-14 lg:pt-0">
        {children}
      </div>
    </div>
  );
}

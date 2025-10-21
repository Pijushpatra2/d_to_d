"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/sidebar";
import { Toaster } from "@/components/ui/toaster";
import api from "@/lib/axiosInstance";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login"); // redirect if no token
        return;
      }

      try {
        const response = await api.get("/admin/auth/validate", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Invalid token");
        }
      } catch {
        localStorage.removeItem("token");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="h-screen w-64 fixed left-0 top-0 bg-white shadow">
        <AdminSidebar />
      </div>

      {/* Content */}
      <div className="ml-64 flex-1 p-8 overflow-y-auto h-screen">{children}</div>

      <Toaster />
    </div>
  );
}

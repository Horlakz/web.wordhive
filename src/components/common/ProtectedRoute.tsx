"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { toast } from "react-hot-toast";

import Storage from "@/utilities/storage";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const storage = new Storage();
  const router = useRouter();

  useEffect(() => {
    const accessCookie = storage.getCookie("access");
    if (!accessCookie) {
      router.push("/");
      toast.error("You need to login to access this page", {
        icon: "🔒",
      });
    }
  }, [router, storage]);

  return <>{children}</>;
};

export default ProtectedRoute;

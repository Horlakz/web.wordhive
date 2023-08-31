"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, type ReactNode } from "react";
import { toast } from "react-hot-toast";

import Storage from "@/utilities/storage";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const storage = useMemo(() => new Storage(), []);
  const router = useRouter();
  const accessCookie = storage.getCookie("access");

  useEffect(() => {
    if (!accessCookie) {
      router.push("/");
      toast.error("You need to login to access this page", {
        icon: "🔒",
      });
    }
  }, [router, storage, accessCookie]);

  return <>{children}</>;
};

export default ProtectedRoute;

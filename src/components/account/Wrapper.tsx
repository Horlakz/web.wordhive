"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { toast } from "react-hot-toast";

import Storage from "@/utilities/storage";

const AccountLayoutWrapper = ({ children }: { children: ReactNode }) => {
  const storage = new Storage();
  const router = useRouter();

  useEffect(() => {
    if (!storage.checkCookie("access")) {
      router.push("/");
      toast("You need to login to access this page", {
        icon: "🔒",
      });
    }
  });

  return <>{children}</>;
};

export default AccountLayoutWrapper;

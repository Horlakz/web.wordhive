import React from "react";
import ProtectedRoute from "@/components/common/ProtectedRoute";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default AccountLayout;

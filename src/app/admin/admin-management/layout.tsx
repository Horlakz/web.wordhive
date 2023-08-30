import React from "react";
import { AdminManagementProvider } from "./context";

function AdminManagementLayout({ children }: { children: React.ReactNode }) {
  return <AdminManagementProvider>{children}</AdminManagementProvider>;
}

export default AdminManagementLayout;

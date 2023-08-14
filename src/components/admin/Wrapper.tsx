"use client";

import React from "react";
import AdminHeader from "./Header";
import ProtectedRoute from "../common/ProtectedRoute";

function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AdminHeader />
      <main className="px-14 py-6">{children}</main>
    </ProtectedRoute>
  );
}

export default AdminLayoutWrapper;

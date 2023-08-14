"use client";

import React from "react";
import AdminHeader from "./Header";
import ProtectedRoute from "../common/ProtectedRoute";

function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AdminHeader />
      {children}
    </ProtectedRoute>
  );
}

export default AdminLayoutWrapper;

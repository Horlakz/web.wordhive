"use client";

import React from "react";

import { AuthProvider } from "@/store/context/auth";
import Footer from "./Footer";
import Header from "./Header";

function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AuthProvider>
        <Header />
      </AuthProvider>
      {children}
      <Footer />
    </div>
  );
}

export default ClientLayoutWrapper;

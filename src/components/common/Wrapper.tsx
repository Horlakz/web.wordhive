"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";

import Storage from "@/utilities/storage";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const storage = new Storage();
  const router = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: (error: any) => {
          if (error.response.status == 401 || error.response.status == 403) {
            router.push("/");
            storage.removeCookie("access");
          }
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default LayoutWrapper;

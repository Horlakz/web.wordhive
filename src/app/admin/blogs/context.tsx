"use client";

import { FC, createContext, useState } from "react";

import { BlogData } from "@/services/blog";
import { useBlogForm } from "./hook";

interface BlogContextType {
  formData: BlogData;
  setForm: (data: BlogData) => void;
}

interface BlogProviderProps {
  children: React.ReactNode;
}

export const BlogContext = createContext<BlogContextType>({
  formData: { title: "", category: "", body: "" },
  setForm: () => {},
});

export const BlogProvider: FC<BlogProviderProps> = ({ children }) => {
  const { formData, setForm } = useBlogForm();

  const blogContextValue = {
    formData,
    setForm,
  };

  return (
    <BlogContext.Provider value={blogContextValue}>
      {children}
    </BlogContext.Provider>
  );
};

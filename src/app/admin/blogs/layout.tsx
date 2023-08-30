"use client";

import { FC, ReactNode } from "react";
import { BlogProvider } from "./context";

interface Props {
  children: ReactNode;
}

const AdminBlogLayout: FC<Props> = ({ children }) => {
  return <BlogProvider>{children}</BlogProvider>;
};

export default AdminBlogLayout;

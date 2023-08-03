import React from "react";
import AccountLayoutWrapper from "@/components/account/Wrapper";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return <AccountLayoutWrapper>{children}</AccountLayoutWrapper>;
};

export default AccountLayout;

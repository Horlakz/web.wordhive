"use client";

import { Dispatch, FC, SetStateAction, createContext, useState } from "react";

import { INITIAL_FORM, useAdminManagementForm } from "./hook";

type FormData = typeof INITIAL_FORM;
export type ViewsT = "create" | "success";

interface AdminManagementContextType {
  formData: FormData;
  setForm: (data: FormData) => void;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  currentView: ViewsT;
  setCurrentView: Dispatch<SetStateAction<ViewsT>>;
}

interface AdminManagementProviderProps {
  children: React.ReactNode;
}

export const AdminManagementContext = createContext<AdminManagementContextType>(
  {
    formData: INITIAL_FORM,
    setForm: () => {},
    modal: false,
    setModal: () => {},
    currentView: "create",
    setCurrentView: () => {},
  }
);

export const AdminManagementProvider: FC<AdminManagementProviderProps> = ({
  children,
}) => {
  const { formData, setForm } = useAdminManagementForm();
  const [modal, setModal] = useState(false);
  const [currentView, setCurrentView] = useState<ViewsT>("create");

  const adminManagementContextValue = {
    formData,
    setForm,
    modal,
    setModal,
    currentView,
    setCurrentView,
  };

  return (
    <AdminManagementContext.Provider value={adminManagementContextValue}>
      {children}
    </AdminManagementContext.Provider>
  );
};

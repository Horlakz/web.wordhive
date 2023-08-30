import { useMutation, useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import toast from "react-hot-toast";

import { AuthService, UserAdminData } from "@/services/auth";
import { UserService } from "@/services/auth/user";
import { AdminManagementContext } from "./context";

export const INITIAL_FORM: UserAdminData = {
  fullname: "",
  email: "",
  password: "",
  isAdmin: true,
};

export function useAdminManagementForm() {
  const [formData, setFormData] = useState<UserAdminData>(INITIAL_FORM);

  function setForm(data: UserAdminData) {
    setFormData((prev) => ({ ...prev, ...data }));
  }

  return { formData, setForm };
}

export function useAdminManagement(
  setRemoveModal?: Dispatch<SetStateAction<boolean>>
) {
  const [adminId, setAdminId] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { modal, setModal, formData, currentView, setCurrentView } = useContext(
    AdminManagementContext
  );
  const userService = new UserService();
  const authService = new AuthService();

  function onError(error: any) {
    toast.error(error.response.data.message ?? "An Error occured");
  }

  const users = useQuery(
    ["admins", search, page],
    async () => await userService.getAllAdmins(search, page, 10)
  );

  const user = useQuery(["user"], async () => await userService.getProfile());

  const create = useMutation(
    async () => await authService.registerAdmin(formData),
    {
      onSuccess: () => {
        toast.success("Admin created successfully");
        setCurrentView("success");
        users.refetch();
      },
      onError,
    }
  );

  const remove = useMutation(
    async () => await userService.deleteUser(adminId),
    {
      onSuccess: () => {
        toast.success("Admin removed successfully");
        if (setRemoveModal) setRemoveModal(false);
        users.refetch();
      },
      onError,
    }
  );

  return {
    create,
    remove,
    users,
    user,
    search,
    page,
    currentView,
    modal,
    setSearch,
    setPage,
    setAdminId,
    setModal,
  };
}

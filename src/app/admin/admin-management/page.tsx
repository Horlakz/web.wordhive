"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";

import DeleteModal from "@/components/admin/DeleteModal";
import InputSearch from "@/components/admin/InputSearch";
import Button from "@/components/common/Button";
import InputGroup from "@/components/common/InputGroup";
import Modal from "@/components/common/Modal";
import Table from "@/components/common/Table";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import ChevronRightIcon from "@/components/icons/ChevronRight";
import ClipboardIcon from "@/components/icons/Clipboard";
import PlusIcon from "@/components/icons/Plus";
import { AuthService, UserAdminData } from "@/services/auth";
import { UserData, UserService } from "@/services/auth/user";
import { formatDate } from "@/utilities/date";
import { randomString } from "@/utilities/random-string";

const AdminServicePage = () => {
  const [createAdminModal, setCreateAdminModal] = useState(false);
  const [viewPasswordModal, setViewPasswordModal] = useState(false);
  const [removeAdminModal, setRemoveAdminModal] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userService = new UserService();
  const authService = new AuthService();
  const queryClient = useQueryClient();
  const formData: UserAdminData = { fullname, email, password, isAdmin: true };

  function handleCopy() {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard");
  }

  function handleCreateAdmin() {
    setPassword(randomString());
    createAdmin.mutate();
  }

  const createAdmin = useMutation(
    async () => await authService.registerAdmin(formData),
    {
      onSuccess: () => {
        toast.success("Admin created successfully");
        setCreateAdminModal(false);
        setViewPasswordModal(true);
        queryClient.invalidateQueries(["admins"]);
      },
      onError: (error: any) => {
        toast.error(
          error.response.data.message ??
            "An Error occured while registering admin"
        );
      },
    }
  );

  const removeAdmin = useMutation(
    async () => await userService.deleteUser(adminId),
    {
      onSuccess: () => {
        toast.success("Admin removed successfully");
        setRemoveAdminModal(false);
        queryClient.invalidateQueries(["admins"]);
      },
      onError: (error: any) => {
        toast.error(
          error.response.data.message ?? "An Error occured while removing admin"
        );
      },
    }
  );

  const {
    data: users,
    isError,
    isLoading,
  } = useQuery(["admins"], async () => await userService.getAllAdmins());

  const user = useQuery(["user"], async () => await userService.getProfile());

  if (isLoading || user.isLoading) return <div>Loading...</div>;
  if (isError || user.isError)
    return (
      <p className="text-red-600 text-lg">
        Any Error Occured while loading your data
      </p>
    );

  return (
    <div>
      <section className="w-full flex-center py-6">
        <InputSearch />
      </section>

      <section>
        <div className="flex justify-between items-center my-3">
          <Button
            icon={<PlusIcon />}
            iconPosition="right"
            onClick={() => setCreateAdminModal(true)}
          >
            Add New Admin
          </Button>

          <div className="flex justify-end items-center">
            <Button variant="outline" className="border-none">
              <ChevronLeftIcon />
            </Button>
            <span className="text-dark-600">1 - 20 of 100</span>
            <Button variant="outline" className="border-none">
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
        <Table
          tableHeaders={[
            { title: "Full Name" },
            { title: "Email Address" },
            { title: "Date Added" },
            { title: "Remove Admin" },
          ]}
          tableKeys={["fullname", "email", "created_at"]}
          tableData={users.data.map((user: UserData) => {
            return {
              ...user,
              created_at: formatDate(user.created_at),
            };
          })}
          tableActions={[
            (data) => (
              <Button
                variant="outline"
                colorScheme="danger"
                onClick={() => {
                  if (user.data.data.email === data.email) {
                    toast.error("You cannot remove yourself as an admin");
                    return;
                  }

                  setAdminId(data.uuid);
                  setRemoveAdminModal(true);
                }}
              >
                Remove
              </Button>
            ),
          ]}
        />
      </section>

      {/* admin creation modal */}
      <Modal
        visibility={createAdminModal}
        setVisibility={() => setCreateAdminModal(false)}
      >
        <div className="p-12 space-y-4">
          <p className="my-2 text-admin-primary text-center w-80">
            Please note that admin will be required to verify email address
            after creation to allow full access
          </p>

          <InputGroup.Input
            label="Full name"
            showLabel={false}
            placeholder="Enter full name of admin"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <InputGroup.Input
            label="Email Address"
            showLabel={false}
            placeholder="Enter email address of admin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex center gap-2">
            <Button
              variant="outline"
              colorScheme="danger"
              onClick={() => setCreateAdminModal(false)}
            >
              Cancel
            </Button>
            <Button
              isLoading={createAdmin.isLoading}
              onClick={handleCreateAdmin}
            >
              Add Admin
            </Button>
          </div>
        </div>
      </Modal>

      {/* admin creation success modal */}
      <Modal
        showCloseButton
        visibility={viewPasswordModal}
        setVisibility={() => {
          setFullname("");
          setEmail("");
          setPassword("");
          setViewPasswordModal(false);
        }}
      >
        <div className="grid center text-center w-96 gap-6 p-12">
          <h1 className="text-2xl font-semibold text-success mb-2">
            Congratulations
          </h1>
          <p className="text-lg text-dark-600 font-medium">
            Admin&nbsp;
            <span className="font-semibold text-dark-900">{fullname}</span>
            &nbsp;has been created and verification email has been sent to&nbsp;
            <span className="font-semibold text-dark-900">{email}</span>
          </p>
          <p className="text-danger text-sm">
            You can only view this password once, please copy and keep it safe
          </p>
          <button
            onClick={handleCopy}
            className="bg-dark-600 text-gray-200 p-2 gap-3 rounded-lg flex items-center"
          >
            <span className="text-lg">{password}</span>
            <ClipboardIcon />
          </button>
        </div>
      </Modal>

      <DeleteModal
        deleteModal={removeAdminModal}
        setDeleteModal={setRemoveAdminModal}
        remove={removeAdmin}
        title="Admin"
      />
    </div>
  );
};

export default AdminServicePage;

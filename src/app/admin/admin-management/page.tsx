"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

import DeleteModal from "@/components/admin/DeleteModal";
import InputSearch from "@/components/admin/InputSearch";
import PaginationButtons from "@/components/admin/PaginationButtons";
import PreLoader from "@/components/admin/PreLoader";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import PlusIcon from "@/components/icons/Plus";
import { UserData } from "@/services/auth/user";
import { formatDate } from "@/utilities/date";
import { useAdminManagement } from "./hook";
import CreateModal from "./CreateModal";

const AdminServicePage = () => {
  const [removeModal, setRemoveModal] = useState(false);
  const adminManagement = useAdminManagement(setRemoveModal);

  return (
    <div>
      <section className="w-full flex-center py-6">
        <InputSearch
          value={adminManagement.search}
          onChange={(e) => adminManagement.setSearch(e.target.value)}
        />
      </section>

      <section>
        <div className="flex justify-between items-center my-3">
          <Button
            icon={<PlusIcon />}
            iconPosition="right"
            onClick={() => adminManagement.setModal(true)}
          >
            Add New Admin
          </Button>

          <PaginationButtons
            page={adminManagement.page}
            setPage={adminManagement.setPage}
            pagination={adminManagement.users.data?.data.pagination}
          />
        </div>
        <PreLoader status={adminManagement.users.status}>
          <Table
            tableHeaders={[
              { title: "Full Name" },
              { title: "Email Address" },
              { title: "Date Added" },
              { title: "Remove Admin" },
            ]}
            tableKeys={["fullname", "email", "created_at"]}
            tableData={adminManagement.users.data?.data.results.map(
              (user: UserData) => {
                return {
                  ...user,
                  created_at: formatDate(user.created_at),
                };
              }
            )}
            tableActions={[
              (data) => (
                <Button
                  variant="outline"
                  colorScheme="danger"
                  onClick={() => {
                    if (adminManagement.user?.data?.data.email === data.email) {
                      toast.error("You cannot remove yourself as an admin");
                      return;
                    }

                    adminManagement.setAdminId(data.uuid);
                    setRemoveModal(true);
                  }}
                >
                  Remove
                </Button>
              ),
            ]}
          />
        </PreLoader>
      </section>

      <CreateModal />

      <DeleteModal
        deleteModal={removeModal}
        setDeleteModal={setRemoveModal}
        remove={adminManagement.remove}
        title="Admin"
      />
    </div>
  );
};

export default AdminServicePage;

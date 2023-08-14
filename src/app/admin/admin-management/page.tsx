"use client";
import { useQuery } from "@tanstack/react-query";

import InputSearch from "@/components/admin/InputSearch";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import ChevronRightIcon from "@/components/icons/ChevronRight";
import PlusIcon from "@/components/icons/Plus";
import { UserData, UserService } from "@/services/auth/user";
import { formatDate } from "@/utilities/date";

const AdminServicePage = () => {
  const userService = new UserService();

  const { data, isError, isLoading } = useQuery(
    ["admins"],
    async () => await userService.getAllAdmins()
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError)
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
          <Button icon={<PlusIcon />} iconPosition="right">
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
          tableData={data.data.map((user: UserData) => {
            return {
              ...user,
              created_at: formatDate(user.created_at),
            };
          })}
          tableActions={[
            (data) => (
              <Button variant="outline" colorScheme="danger">
                Remove
              </Button>
            ),
          ]}
        />
      </section>
    </div>
  );
};

export default AdminServicePage;

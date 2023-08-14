import Link from "next/link";

import InputSearch from "@/components/admin/InputSearch";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import ChevronRightIcon from "@/components/icons/ChevronRight";
import { UserData, UserService } from "@/services/auth/user";
import { formatDate } from "@/utilities/date";

const AdminUsersPage = async () => {
  const userService = new UserService();

  const { data } = await userService.getAllUsers();

  return (
    <div>
      <section className="w-full flex-center py-6">
        <InputSearch />
      </section>

      <section>
        <div className="flex justify-end items-center">
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
            { title: "Email Verified" },
            { title: "Date Joined" },
            { title: "View Orders" },
          ]}
          tableKeys={["fullname", "email", "isEmailVerified", "created_at"]}
          tableData={data.map((user: UserData) => {
            return {
              ...user,
              created_at: formatDate(user.created_at),
              isEmailVerified: user.isEmailVerified ? "Yes" : "No",
            };
          })}
          tableActions={[
            (data) => {
              return (
                <Link href={"/admin/users/" + data.uuid}>
                  <Button variant="outline">View</Button>
                </Link>
              );
            },
          ]}
        />
      </section>
    </div>
  );
};

export default AdminUsersPage;

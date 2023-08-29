"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

import InputSearch from "@/components/admin/InputSearch";
import PaginationButtons from "@/components/admin/PaginationButtons";
import PreLoader from "@/components/admin/PreLoader";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import { UserData, UserService } from "@/services/auth/user";
import { formatDate } from "@/utilities/date";

const AdminUsersPage = () => {
  const userService = new UserService();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, status } = useQuery(
    ["users", search, page],
    async () => await userService.getAllUsers(search, page)
  );

  return (
    <div>
      <section className="w-full flex-center py-6">
        <InputSearch
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section>
        <div className="flex justify-end items-center">
          <PaginationButtons
            page={page}
            setPage={setPage}
            pagination={data?.data.pagination}
          />
        </div>

        <PreLoader status={status}>
          <Table
            tableHeaders={[
              { title: "Full Name" },
              { title: "Email Address" },
              { title: "Email Verified" },
              { title: "Date Joined" },
              { title: "View Orders" },
            ]}
            tableKeys={["fullname", "email", "isEmailVerified", "created_at"]}
            tableData={data?.data.results.map((user: UserData) => {
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
        </PreLoader>
      </section>
    </div>
  );
};

export default AdminUsersPage;

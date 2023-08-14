"use client";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Link from "next/link";

import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import { UserService } from "@/services/auth/user";
import { formatDate } from "@/utilities/date";
import { OrderData, OrderService } from "@/services/order";

interface Params {
  params: {
    id: string;
  };
}

const AdminUsersPage: NextPage<Params> = ({ params }) => {
  const userService = new UserService();
  const orderService = new OrderService();

  const user = useQuery(
    ["user", params.id],
    async () => await userService.getUser(params.id)
  );
  const orders = useQuery(
    ["user-orders", params.id],
    async () => await orderService.getUserOrders(params.id)
  );

  const isLoading = user.isLoading || orders.isLoading;
  const isError = user.isError || orders.isError;

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <p className="text-red-600 text-lg">
        Any Error Occured while loading your data
      </p>
    );

  return (
    <div>
      <div className="w-full flex justify-start mb-8">
        <Link href="/admin/users" className="flex-center gap-1 text-dark-600">
          <ChevronLeftIcon width={18} height={18} strokeColor="#525252" />
          <span>Go Back</span>
        </Link>
      </div>

      <section className="font-medium space-y-4 pb-2">
        <div>
          <span className="text-hover">Fullname: </span>
          <span className="text-dark-600">{user.data.data.fullname}</span>
        </div>
        <div>
          <span className="text-hover">Email Address: </span>
          <span className="text-dark-600">{user.data.data.email}</span>
        </div>
        <div>
          <span className="text-hover">Date Joined: </span>
          <span className="text-dark-600">
            {formatDate(user.data.data.createdAt)}
          </span>
        </div>
      </section>

      <section>
        <div className="flex justify-start items-center my-4">
          <h2 className="text-hover text-xl font-semibold">Order History</h2>
        </div>
        <Table
          tableHeaders={[
            { title: "Reference" },
            { title: "Title" },
            { title: "User's FullName" },
            { title: "Order Status" },
            { title: "View Details" },
          ]}
          tableKeys={["reference", "service_title", "user_fullname", "status"]}
          tableData={orders.data.data.map((order: Required<OrderData>) => {
            return {
              ...order,
              user_fullname: order.user.fullname,
              service_title: order.service.title,
            };
          })}
          tableActions={[
            (data) => {
              return (
                <Link href={"/admin/orders/" + data.id}>
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

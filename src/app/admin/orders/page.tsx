"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import InputSearch from "@/components/admin/InputSearch";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import ChevronRightIcon from "@/components/icons/ChevronRight";
import { OrderData, OrderService } from "@/services/order";

const AdminOrderPage = () => {
  const orderService = new OrderService();

  const { data, isError, isLoading } = useQuery(
    ["orders"],
    async () => await orderService.listAllOrders()
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
        <InputSearch placeholder="Search order with reference" />
      </section>

      <section>
        <div className="flex justify-end items-center my-3">
          <div className="flex justify-end items-center">
            <Button variant="outline" className="border-none">
              <ChevronLeftIcon strokeColor="#d4d4d4" />
            </Button>
            <span className="text-dark-600">1 - 20 of 100</span>
            <Button variant="outline" className="border-none">
              <ChevronRightIcon />
            </Button>
          </div>
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
          tableData={data.data.map((order: Required<OrderData>) => {
            return {
              ...order,
              user_fullname: order.user.fullname,
              service_title: order.service.title,
            };
          })}
          tableActions={[
            (data) => (
              <Link href={"/admin/orders/" + data.uuid}>
                <Button variant="outline">View Details</Button>,
              </Link>
            ),
          ]}
        />
      </section>
    </div>
  );
};

export default AdminOrderPage;

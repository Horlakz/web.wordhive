"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

import InputSearch from "@/components/admin/InputSearch";
import PaginationButtons from "@/components/admin/PaginationButtons";
import PreLoader from "@/components/admin/PreLoader";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import { OrderData, OrderService } from "@/services/order";

const AdminOrderPage = () => {
  const [search, setSearch] = useState<Uppercase<string>>("");
  const [page, setPage] = useState(1);

  const orderService = new OrderService();

  const { data, status } = useQuery(
    ["orders", search, page],
    async () => await orderService.listAllOrders(search, page)
  );

  return (
    <div>
      <section className="w-full flex-center py-6">
        <InputSearch
          value={search}
          onChange={(e) =>
            setSearch(e.target.value.toLocaleUpperCase() as Uppercase<string>)
          }
          placeholder="Search order with reference"
        />
      </section>

      <section>
        <div className="flex justify-end items-center my-3">
          <PaginationButtons
            page={page}
            setPage={setPage}
            pagination={data?.data.pagination}
          />
        </div>
        <PreLoader status={status}>
          <Table
            tableHeaders={[
              { title: "Reference" },
              { title: "Title" },
              { title: "User's FullName" },
              { title: "Order Status" },
              { title: "View Details" },
            ]}
            tableKeys={[
              "reference",
              "service_title",
              "user_fullname",
              "status",
            ]}
            tableData={data?.data.results.map((order: Required<OrderData>) => {
              return {
                ...order,
                user_fullname: order.user.fullname,
                service_title: order.service.title,
              };
            })}
            tableActions={[
              (data) => (
                <Link href={"/admin/orders/" + data.reference}>
                  <Button variant="outline">View Details</Button>,
                </Link>
              ),
            ]}
          />
        </PreLoader>
      </section>
    </div>
  );
};

export default AdminOrderPage;

"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { OrderService } from "@/services/order";
import LoadingPage from "@/app/loading";
import OrderCard, { OrderData } from "@/components/account/OrderCard";
import Button from "@/components/common/Button";

const AccountOrdersPage = () => {
  const orderService = new OrderService();

  const orders = useQuery(
    ["orders"],
    async () => await orderService.listOrder()
  );
  if (orders.isLoading) return <LoadingPage />;
  if (orders.isError) return <p>An Error Occured while loading UI</p>;

  return (
    <main className="py-10 px-32">
      <h1 className="text-primary text-3xl font-semibold mb-4">My Orders</h1>

      <div className="w-full flex-center">
        <section className="grid sm:grid-cols-3 sm:gap-10 gap-6 w-fit">
          {orders.data.data.map((order: OrderData) => (
            <OrderCard key={order.uuid} {...order} />
          ))}

          {orders.data.data.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-dark-600 text-xl font-semibold mb-4">
                You have no orders yet
              </p>
              <Button>Shop Now</Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AccountOrdersPage;

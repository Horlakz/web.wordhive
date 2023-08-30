import React from "react";

import { UserService } from "@/services/auth/user";
import { useQuery } from "@tanstack/react-query";
import { ApplicationService } from "@/services/services";
import { OrderService } from "@/services/order";

export function useDashboard() {
  const userService = new UserService();
  const appService = new ApplicationService();
  const orderService = new OrderService();

  const users = useQuery(
    ["users"],
    async () => await userService.getAllUsers("")
  );

  const services = useQuery(
    ["services"],
    async () => await appService.listServices("", "")
  );

  const orders = useQuery(
    ["orders"],
    async () => await orderService.listAllOrders("")
  );

  return {
    users: users.data?.data.pagination.total,
    usersLoading: users.isLoading,
    services: services.data?.data.pagination.total,
    servicesLoading: services.isLoading,
    orders: orders.data?.data.pagination.total,
    ordersLoading: orders.isLoading,
  };
}

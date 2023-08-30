"use client";

import React from "react";
import { useDashboard } from "./hook";
import { useBlog } from "./blogs/hook";
import Link from "next/link";

const AdminDashboard = () => {
  const {
    users,
    usersLoading,
    services,
    servicesLoading,
    orders,
    ordersLoading,
  } = useDashboard();
  const { blogs } = useBlog();

  const stats = [
    { name: "Users", value: users, loading: usersLoading, url: "/users" },
    {
      name: "Posts",
      value: blogs.data?.data.pagination.total,
      loading: blogs.isLoading,
      url: "/blogs",
    },
    {
      name: "Services",
      value: services,
      loading: servicesLoading,
      url: "services",
    },
    { name: "Orders", value: orders, loading: ordersLoading, url: "orders" },
  ];

  return (
    <section className="grid grid-cols-2 gap-8">
      {stats.map((stat: any, i) => (
        <div
          key={i}
          className="bg-gray-200 px-6 py-2 rounded-lg drop-shadow-md"
        >
          <Link href={`/admin/${stat.url}`}>
            <h4 className="text-gray-600 text-xl hover:text-admin-primary cursor-pointer default-transition">
              {stat.name}
            </h4>
          </Link>
          {stat.loading ? (
            <div className="h-10 w-14 bg-gray-400 rounded-3xl animate-pulse" />
          ) : (
            <span className="text-4xl font-bold">{stat.value}</span>
          )}
        </div>
      ))}
    </section>
  );
};

export default AdminDashboard;

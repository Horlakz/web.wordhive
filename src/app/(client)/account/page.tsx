"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import { UserService } from "@/services/auth/user";
import OrderCard, { OrderData } from "@/components/account/OrderCard";
import { OrderService } from "@/services/order";
import LoadingPage from "../loading";

function AccountPage() {
  const userService = new UserService();
  const orderService = new OrderService();
  const router = useRouter();

  const user = useQuery(["user"], async () => await userService.getProfile(), {
    onSuccess: (res) => res.data.is_admin && router.push("/admin"),
  });
  const orders = useQuery(
    ["orders"],
    async () => await orderService.listOrder()
  );

  if (user.isLoading || orders.isLoading) return <LoadingPage />;
  if (user.isError || orders.isError)
    return <p>An Error Occured while loading UI</p>;

  return (
    <div className="bg-dashboard bg-cover bg-no-repeat sm:px-28 px-6 sm:py-32 py-6">
      <main className="bg-white sm:px-20 sm:py-10 py-4 space-y-8 drop-shadow-lg shadow-gray-300 rounded-3xl">
        <h3 className="text-secondary sm:text-5xl text-4xl text-center sm:font-extrabold font-bold">
          Account Dashboard
        </h3>

        <div className="relative bg-primary h-32 rounded-t-3xl">
          <Image
            src={`https://ui-avatars.com/api/?name=${user.data.data.fullname}&background=random`}
            width={100}
            height={100}
            alt="profile icon"
            className="absolute -bottom-8 sm:left-10 left-6 rounded-full border-2 border-[#f5f5f5]"
          />
        </div>

        <section className="flex justify-between pt-2 px-4">
          <span className="text-2xl font-semibold text-dark-900">
            {user.data.data.fullname}
          </span>
          <span className="sm:text-xl text-dark-600">
            {user.data.data.email}
          </span>
        </section>

        <section className="space-y-4">
          <h1 className="text-2xl font-semibold mb-4">My Orders</h1>

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
                  <Button href="/services">Shop Now</Button>
                </div>
              )}
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AccountPage;

"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import OrderCard, { OrderData } from "@/components/account/OrderCard";
import Button from "@/components/common/Button";
import { UserService } from "@/services/auth/user";
import { OrderService } from "@/services/order";
import LoadingPage from "../loading";

function AccountPage() {
  const userService = new UserService();
  const orderService = new OrderService();

  const user = useQuery(["user"], async () => await userService.getProfile());
  const orders = useQuery(
    ["orders"],
    async () => await orderService.listOrder()
  );

  if (user.isLoading || orders.isLoading) return <LoadingPage />;
  if (user.isError || orders.isError)
    return <p>An Error Occured while loading UI</p>;

  return (
    <div className="bg-dashboard bg-cover bg-no-repeat sm:px-36 px-6 sm:py-40 py-6">
      <main className="bg-white sm:px-20 sm:py-10 py-4 space-y-8 shadow-md">
        <h3 className="text-secondary sm:text-5xl text-4xl text-center sm:font-extrabold font-bold">
          Account Dashboard
        </h3>

        <div className="relative bg-primary h-32 rounded-t-3xl">
          <Image
            src={
              "https://ui-avatars.com/api/" +
              user?.data?.data?.fullname +
              "?background=random"
            }
            width={100}
            height={100}
            alt="profile icon"
            className="absolute -bottom-8 sm:left-10 left-6 rounded-full border-2 border-[#f5f5f5]"
          />
        </div>

        <section className="flex justify-between items-end pt-2 px-4">
          <div className="grid">
            <span className="text-2xl font-semibold text-dark-900">
              {user.data?.data?.fullname}
            </span>
            <span className="sm:text-xl text-dark-600">
              {user.data?.data?.email}
            </span>
            <span className="sm:text-xl text-dark-600">+234 814 3740 522</span>
          </div>
          <Button
            variant="outline"
            className="border-none text-lg hidden sm:block"
            // onClick={() => console.log("edit profile")}
          >
            Edit profile
          </Button>
        </section>

        <section className="space-y-4">
          <div className="px-4 w-full flex-between-center">
            <h6 className="text-xl font-semibold">List of orders</h6>
            <Link href="/account/orders" className="text-primary font-medium">
              View All
            </Link>
          </div>

          {orders.data?.data?.length === 0 && (
            <div className="w-full flex-center">
              <p className="text-dark-600 text-center">
                You have no orders yet
              </p>
            </div>
          )}

          <div className="flex-center w-full justify-between gap-6 select-none cursor-grab">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={150}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
            >
              {orders.data?.data?.map((order: OrderData) => (
                <SwiperSlide key={order.uuid}>
                  <OrderCard {...order} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AccountPage;

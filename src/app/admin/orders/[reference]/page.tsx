"use client";

import type { NextPage } from "next";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import Image from "next/image";

import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import { OrderService } from "@/services/order";
import { StatusDetails } from "@/components/account/OrderCard";
import tickCircleIcon from "@/assets/icons/tick-circle.svg";
import tickCircleGrayIcon from "@/assets/icons/tick-circle-gray.svg";
import { formatDate } from "@/utilities/date";

interface Params {
  params: {
    reference: string;
  };
}

const OrderDetailsPage: NextPage<Params> = ({ params }) => {
  const orderService = new OrderService();
  const router = useRouter();
  const { reference } = params;

  const viewOrder = useQuery(
    ["order", reference],
    async () => await orderService.viewOrder(reference)
  );

  const status: Record<string, StatusDetails> = {
    orderPlaced: {
      name: "Order Placed",
      status: true,
      timestamp: viewOrder.data?.data.created_at,
    },
    awaitingConfirmation: viewOrder.data?.data.awaitingConfirmation,
    workInProgress: viewOrder.data?.data.workInProgress,
    sentOut: viewOrder.data?.data.sentOut,
    delivered: viewOrder.data?.data.delivered,
  };

  const process = status["awaitingConfirmation"]?.status
    ? Object.keys(status)
    : Object.keys(status).slice(0, 2);

  // get all status details that their status is true
  const processStatusTrue = Object.keys(status).filter(
    (key) => status[key]?.status
  );

  const latestStatus =
    status[
      processStatusTrue[processStatusTrue.length - 1] as keyof typeof status
    ];

  const isPaid = status["awaitingConfirmation"]?.status
    ? latestStatus.name
    : "Payment not successful";

  if (viewOrder.isLoading) return <div>Loading...</div>;
  if (viewOrder.isError)
    return (
      <p className="text-red-600 text-lg">
        Any Error Occured while loading your data
      </p>
    );

  return (
    <div>
      <div className="w-full flex justify-start">
        <button
          onClick={() => router.back()}
          className="flex-center gap-1 text-dark-600"
        >
          <ChevronLeftIcon width={18} height={18} strokeColor="#525252" />
          <span>Go Back</span>
        </button>
      </div>

      <div className="py-6">
        <h2 className="text-xl text-admin-primary font-semibold">
          Order Details
        </h2>

        <div className="my-4 space-y-4 pr-96 mr-64">
          <div className="flex justify-between">
            <span className="text-admin-primary font-medium">Ordered By:</span>
            <span className="w-96">{viewOrder.data.data.user.fullname}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-admin-primary font-medium">
              Service Name:
            </span>
            <span className="w-96">{viewOrder.data.data.service.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-admin-primary font-medium">Description:</span>
            <span className="w-96">{viewOrder.data.data.service.body}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-admin-primary font-medium">
              Volume (pages):
            </span>
            <span className="w-96">{viewOrder.data.data.serviceVolume}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-admin-primary font-medium">Quality:</span>
            <span className="w-96">{viewOrder.data.data.serviceQuality}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-admin-primary font-medium">Price:</span>
            <span className="w-96">{viewOrder.data.data.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-admin-primary font-medium">
              Reference Number:
            </span>
            <span className="w-96">{reference}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl text-admin-primary font-semibold">
          Order Status
        </h2>

        <div className="flex w-full my-4">
          {process.map((key: string, i) => {
            const lastElement = i === Object.keys(status).length - 1;
            const timeline = status[key as keyof typeof status];
            const notConfirmed =
              timeline.name === "Awaiting Confirmation" &&
              timeline.status == false;

            return (
              <div
                key={i}
                className={classNames(
                  "uppercase grid border-t-4 relative",
                  lastElement || notConfirmed ? "pr-0 pt-7" : "pr-4 pt-6",
                  lastElement || notConfirmed
                    ? "border-none"
                    : timeline.status
                    ? "border-order-blue"
                    : "border-gray-500"
                )}
              >
                <div
                  className={classNames(
                    "absolute bg-white",
                    lastElement || notConfirmed ? "-top-2.5" : "-top-3.5"
                  )}
                >
                  <Image
                    src={timeline.status ? tickCircleIcon : tickCircleGrayIcon}
                    alt="tick circle"
                  />
                </div>
                <span
                  className={classNames(
                    "text-white px-2 py-1 h-fit rounded-md",
                    timeline.status ? "bg-order-blue" : "bg-gray-500"
                  )}
                >
                  {notConfirmed ? "Payment not successful" : timeline.name}
                </span>
                <span className="text-dark-600">
                  {timeline.timestamp == null
                    ? ""
                    : formatDate(timeline.timestamp)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

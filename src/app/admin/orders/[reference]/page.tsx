"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import tickCircleGrayIcon from "@/assets/icons/tick-circle-gray.svg";
import tickCircleIcon from "@/assets/icons/tick-circle.svg";
import { StatusDetails } from "@/components/account/OrderCard";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import { OrderService } from "@/services/order";
import { formatDate } from "@/utilities/date";
import ConfirmOrderModal from "./ConfirmOrderModal";
import StatusBtn from "./StatusBtn";
import UpdateOrderModal from "./UpdateOrderModal";

interface Params {
  params: {
    reference: string;
  };
}

const OrderDetailsPage: NextPage<Params> = ({ params }) => {
  const orderService = new OrderService();
  const router = useRouter();
  const [confirmOrderModal, setConfirmOrderModal] = useState(false);
  const [updateOrderModal, setUpdateOrderModal] = useState(false);
  const { reference } = params;

  const viewOrder = useQuery(
    ["order", reference],
    async () => await orderService.viewOrder(reference)
  );

  const updateOrder = useMutation(
    async (status: string) =>
      await orderService.updateOrder(viewOrder.data?.data.uuid, { status }),
    {
      onSuccess: () => {
        setConfirmOrderModal(false);
        setUpdateOrderModal(false);
        viewOrder.refetch();
        toast.success("Order updated successfully");
      },
      onError: (err: any) =>
        toast.error(
          err?.response?.data.message ?? "An error occured while updating order"
        ),
    }
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
          {[
            { label: "Ordered By:", value: viewOrder.data.data.user.fullname },
            {
              label: "Service Name:",
              value: viewOrder.data.data.service.title,
            },
            { label: "Description:", value: viewOrder.data.data.service.body },
            {
              label: "Volume (pages):",
              value: viewOrder.data.data.serviceVolume,
            },
            { label: "Quality:", value: viewOrder.data.data.serviceQuality },
            { label: "Price:", value: viewOrder.data.data.price },
            { label: "Reference Number:", value: reference },
          ].map(({ label, value }, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-admin-primary font-medium">{label}</span>
              <span className="w-96">{value}</span>
            </div>
          ))}
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

                {timeline.timestamp == null ? (
                  timeline.name == "Work in Progress" ? (
                    <StatusBtn onClick={() => setConfirmOrderModal(true)}>
                      Confirm Order
                    </StatusBtn>
                  ) : (
                    timeline.name == "Out for delivery" && (
                      <StatusBtn
                        disabled={status["workInProgress"].status !== true}
                        onClick={() => setUpdateOrderModal(true)}
                      >
                        update order
                      </StatusBtn>
                    )
                  )
                ) : (
                  <span className="text-dark-600">
                    {formatDate(timeline.timestamp)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ConfirmOrderModal
        modal={confirmOrderModal}
        setModal={setConfirmOrderModal}
        mutation={updateOrder}
      />

      <UpdateOrderModal
        modal={updateOrderModal}
        setModal={setUpdateOrderModal}
        mutation={updateOrder}
      />
    </div>
  );
};

export default OrderDetailsPage;

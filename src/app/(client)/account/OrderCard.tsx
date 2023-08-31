import { useState } from "react";
import { twMerge } from "tailwind-merge";

import Modal from "@/components/common/Modal";
import OrderModal from "./OrderModal";

export interface StatusDetails {
  name: string;
  status: boolean;
  timestamp: Date;
}

export interface OrderData {
  uuid: string;
  reference: string;
  serviceVolume: string;
  serviceQuality: string;
  service: { title: string };
  status: string;
  price: number;
  awaitingConfirmation: StatusDetails;
  workInProgress: StatusDetails;
  sentOut: StatusDetails;
  delivered: StatusDetails;
  created_at: Date;
}

interface OrderCardProps extends OrderData {
  className?: string;
}

function OrderCard({
  reference,
  service,
  serviceQuality,
  serviceVolume,
  price,
  awaitingConfirmation,
  workInProgress,
  sentOut,
  delivered,
  created_at,
  className,
}: OrderCardProps) {
  const [open, setOpen] = useState(false);

  const cardDetails = [
    { title: "Order", value: `#${reference}` },
    { title: "Title", value: service?.title },
    { title: "Volume", value: serviceVolume },
    { title: "Quality", value: serviceQuality },
    { title: "Price", value: price },
  ];

  const status: Record<string, StatusDetails> = {
    orderPlaced: {
      name: "Order Placed",
      status: true,
      timestamp: created_at,
    },
    awaitingConfirmation,
    workInProgress,
    sentOut,
    delivered,
  };

  const process = status["awaitingConfirmation"].status
    ? Object.keys(status)
    : Object.keys(status).slice(0, 2);

  // get all status details that their status is true
  const processStatusTrue = Object.keys(status).filter(
    (key) => status[key].status
  );

  const latestStatus =
    status[
      processStatusTrue[processStatusTrue.length - 1] as keyof typeof status
    ];

  const isPaid = status["awaitingConfirmation"].status
    ? latestStatus.name
    : "Payment not successful";

  return (
    <>
      <div
        className={twMerge(
          "w-80 flex flex-col justify-start gap-2 p-4 border-[#E5E5E5] border shadow hover:bg-gray-100 default-transition rounded-3xl cursor-pointer",
          className
        )}
        onClick={() => setOpen(true)}
      >
        {cardDetails.map((detail, i) => (
          <div
            key={i}
            className="text-dark-600 w-full flex justify-between items-center"
          >
            <span
              className={twMerge(
                "text-dark-900",
                i == 0 ? "font-semibold text-lg" : ""
              )}
            >
              {detail.title}
            </span>
            <span className={twMerge(i == 0 ? "text-gray-500" : "")}>
              {detail.value}
            </span>
          </div>
        ))}
        <div className="text-dark-600 w-full flex justify-between items-center">
          <span>Status: </span>
          <span
            className={twMerge(
              "text-white px-2 w-fit rounded-md",
              latestStatus.name == "Delivered" ? "bg-success" : "bg-gray-500"
            )}
          >
            {isPaid}
          </span>
        </div>
      </div>

      <Modal visibility={open} setVisibility={() => setOpen(false)}>
        <OrderModal status={status} process={process} />
      </Modal>
    </>
  );
}

export default OrderCard;

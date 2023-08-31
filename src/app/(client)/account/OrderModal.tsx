import React from "react";
import Image from "next/image";
import classNames from "classnames";

import arrowLeftIcon from "@/assets/icons/arrow-left.svg";
import tickCircleIcon from "@/assets/icons/tick-circle.svg";
import tickCircleGrayIcon from "@/assets/icons/tick-circle-gray.svg";
import { StatusDetails } from "./OrderCard";
import { formatDate } from "@/utilities/date";

interface Props {
  status: Record<string, StatusDetails>;
  process: string[];
}

function OrderModal({ status, process }: Props) {
  return (
    <div className="p-8">
      <div className="flex items-center justify-start gap-2 pb-6">
        <Image src={arrowLeftIcon} alt="arrow left icon" />
        <span className="text-lg font-semibold">Order History</span>
      </div>

      <div className="px-10 text-sm">
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
                "uppercase grid border-l-4 relative",
                lastElement || notConfirmed ? "pb-0 pl-7" : "pb-4 pl-6",
                lastElement || notConfirmed
                  ? "border-none"
                  : timeline.status
                  ? "border-order-blue"
                  : "border-gray-500"
              )}
            >
              <div
                className={classNames(
                  "absolute top-0 bg-white",
                  lastElement || notConfirmed ? "-left-2.5" : "-left-3.5"
                )}
              >
                <Image
                  src={timeline.status ? tickCircleIcon : tickCircleGrayIcon}
                  alt="tick circle"
                />
              </div>
              <span
                className={classNames(
                  "text-white px-2 py-1 w-fit rounded-md",
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
  );
}

export default OrderModal;

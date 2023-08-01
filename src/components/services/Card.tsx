"use client";

import Image, { type StaticImageData } from "next/image";
import React from "react";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import Order from "./Order";

interface Quality {
  type: string;
  price: number;
}

interface Volume {
  name: string;
  qualities: Quality[];
}

export interface CardProps {
  image: string | StaticImageData;
  title: string;
  body: string;
  volumes: Volume[];
}

function ServiceCard({ image, title, body, volumes }: CardProps) {
  const [showModal, setShowModal] = React.useState(false);
  const price = volumes[0].qualities[0].price;

  return (
    <>
      <div className="border-2 rounded-2xl p-4">
        <div className="relative overflow-hidden rounded-3xl">
          <Image src={image} height={250} alt={title} className="rounded-3xl" />

          <span className="absolute -top-5 -right-4 bg-secondary text-white text-xl pr-10 pl-6 pt-6 pb-2 font-semibold rounded-3xl">
            ${price}
          </span>
        </div>

        <h4 className="text-2xl text-dark-900 mt-2 font-semibold">{title}</h4>

        <p className="text-dark-600 line-clamp-4">{body}</p>

        <div className="flex w-full justify-end">
          <Button
            colorScheme="secondary"
            onClick={() => setShowModal(true)}
            className="mt-4"
          >
            Order Service
          </Button>
        </div>
      </div>

      <Modal visibility={showModal} setVisibility={() => setShowModal(false)}>
        <Order image={image} title={title} body={body} volumes={volumes} />
      </Modal>
    </>
  );
}

export default ServiceCard;

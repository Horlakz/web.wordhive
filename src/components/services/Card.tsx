import React from "react";
import Image, { type StaticImageData } from "next/image";

import Button from "../common/Button";

interface CardProps {
  image: string | StaticImageData;
  title: string;
  description: string;
  price: number;
}

function ServiceCard({ image, title, description, price }: CardProps) {
  return (
    <div className="border-2 rounded-2xl p-4">
      <div className="relative overflow-hidden rounded-3xl">
        <Image src={image} height={250} alt={title} className="rounded-3xl" />

        <span className="absolute -top-5 -right-4 bg-secondary text-white text-xl pr-10 pl-6 pt-6 pb-2 font-semibold rounded-3xl">
          ${price}
        </span>
      </div>

      <h6 className="text-2xl text-dark-900 mt-2 font-semibold">{title}</h6>

      <p className="text-dark-600 line-clamp-4">{description}</p>

      <div className="flex w-full justify-end">
        <Button variant="outline" className="p-0 border-none">
          View Full Details
        </Button>
      </div>
    </div>
  );
}

export default ServiceCard;

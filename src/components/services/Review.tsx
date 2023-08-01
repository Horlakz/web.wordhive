import Image from "next/image";

import { CardProps } from "./Card";

interface Props extends CardProps {
  price: number;
  selectedQuality: string;
}

function Review({
  title,
  image,
  body,
  volumes,
  selectedQuality,
  price,
}: Props) {
  const qualities =
    volumes.find((vol) => vol.name === selectedQuality)?.qualities || [];

  // get quality type from price
  const qualityType = qualities.find((qual) => qual.price === price)?.type;

  return (
    <div aria-label="modal" className="sm:p-10 py-4 sm:w-[40rem] space-y-4">
      <div className="flex sm:flex-row flex-col sm:items-center gap-6">
        <Image
          src={image}
          height={500}
          width={500}
          alt={title}
          className="sm:w-1/4"
        />

        <div className="space-y-2">
          <h4 className="text-2xl font-semibold">{title}</h4>
          <p className="text-dark-600">{body}</p>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col justify-between items-center gap-4">
        <div className="">
          <span className="text-dark-600">Volume(Pages): </span>
          <span className="text-secondary font-semibold">
            {selectedQuality}
          </span>
        </div>

        <div className="">
          <span className="text-dark-600">Service Quality: </span>
          <span className="text-secondary font-semibold">
            {qualityType || qualities[0].type}
          </span>
        </div>

        <div className="flex gap-2">
          <span>Price</span>
          <span className="text-secondary font-semibold">₦{price}000</span>
        </div>
      </div>
    </div>
  );
}

export default Review;

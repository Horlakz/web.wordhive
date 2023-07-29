import React from "react";
import Image from "next/image";

import InputGroup from "@/components/common/InputGroup";
import Button from "@/components/common/Button";
import { CardProps } from "./Card";

interface Props extends CardProps {
  price: number;
  setPrice: (price: number) => void;
}

function Details({ title, image, body, volumes, price, setPrice }: Props) {
  const [selectedQuality, setSelectedQuality] = React.useState<string>(
    volumes[0].name
  );

  const qualities =
    volumes.find((vol) => vol.name === selectedQuality)?.qualities || [];

  return (
    <div aria-label="modal" className="sm:p-10 p-4 sm:w-[40rem] space-y-4">
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

      <InputGroup.Select
        label="Select Service Quality"
        onChange={(e) => {
          setSelectedQuality(e.target.value);
          // set the price to the first quality of the selected volume or use the default price
          setPrice(
            volumes.find((vol) => vol.name === e.target.value)?.qualities[0]
              .price || volumes[0].qualities[0].price
          );
        }}
        options={volumes.slice(1).map((vol) => {
          return {
            label: vol.name,
            value: vol.name,
          };
        })}
        defaultOption={{ label: volumes[0].name, value: volumes[0].name }}
      />
      <InputGroup.Select
        label="Select Volume(Pages)"
        onChange={(e) => setPrice(Number(e.target.value))}
        options={
          qualities?.slice(1).map((qual) => {
            return {
              label: qual.type,
              value: qual.price.toLocaleString(),
            };
          }) || []
        }
        defaultOption={{
          label: qualities[0].type,
          value: qualities[0].price.toLocaleString(),
        }}
      />

      <div className="flex items-center gap-2 w-full">
        <div className="flex justify-between items-center bg-[#f5f5f5] text-lg font-semibold px-3 py-2 w-full rounded-lg">
          <span>Price</span>
          <span className="text-secondary">${price}</span>
        </div>

        <Button colorScheme="secondary" className="w-full flex-center">
          Pay Now
        </Button>
      </div>
    </div>
  );
}

export default Details;

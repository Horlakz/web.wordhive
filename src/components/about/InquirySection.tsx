import React from "react";
import Image from "next/image";

import customerCare from "@/assets/images/customer-care.png";
import Button from "@/components/Button";

function InquirySection() {
  return (
    <section className="px-48 sm:flex center gap-10 hidden">
      <div>
        <h5 className="text-2xl font-semibold text-primary">
          Have any Inquiries?
        </h5>
        <p className="text-dark-600 mb-4 w-[35rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nihil
          ipsa quos similique alias. Deleniti optio, dolorum nostrum ab
          perspiciatis est fugiat, sed quaerat omnis eligendi quibusdam,
          repellat atque ex.
        </p>
        <Button>Contact us now!</Button>
      </div>

      <Image src={customerCare} width={400} height={400} alt="customer care" />
    </section>
  );
}

export default InquirySection;

import React from "react";
import Image from "next/image";

import customerCare from "@/assets/images/customer-care.png";
import Button from "@/components/Button";

function InquirySection() {
  return (
    <section className="sm:px-48 flex center gap-10">
      <div>
        <h5 className="text-2xl font-semibold text-primary">
          Have any Inquiries?
        </h5>
        <p className="text-dark-600 mb-4 sm:w-[35rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nihil
          ipsa quos similique alias. Deleniti optio, dolorum nostrum ab
          perspiciatis est fugiat, sed quaerat omnis eligendi quibusdam,
          repellat atque ex.
        </p>
        <Button>Contact us now!</Button>
      </div>

      <Image
        src={customerCare}
        width={400}
        height={400}
        alt="customer care"
        className="sm:block hidden"
      />
    </section>
  );
}

export default InquirySection;

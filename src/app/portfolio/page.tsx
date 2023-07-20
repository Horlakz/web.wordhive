import Image from "next/image";
import React from "react";

import dummy from "@/assets/images/dummy.png";
import success from "@/assets/icons/success.svg";

const Portfolio = () => {
  return (
    <main className="grid sm:grid-cols-3 sm:p-20 p-6 gap-10">
      {[...new Array(10)].map((portfolio, i) => (
        <div key={i} className="border-2 rounded-2xl p-4">
          <Image
            src={dummy}
            height={250}
            alt={i.toString()}
            className="rounded-3xl"
          />

          <h6 className="text-2xl text-dark-900 mt-2 font-semibold">
            Portfolio Title {i + 1}
          </h6>

          <span className="text-[#A3A3A3] text-sm">Category</span>

          <p className="text-dark-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quas
            dolor voluptatibus odit architecto debitis obcaecati nobis ducimus
            accusamus unde?
          </p>

          <div className="flex items-center gap-x-6 gap-y-2 flex-wrap mt-6">
            {[...new Array(Math.floor(Math.random() * 4) + 1)].map((tag, i) => (
              <div
                key={i}
                className="flex-center bg-secondary bg-opacity-10 w-fit gap-1 p-1 rounded-full"
              >
                <Image src={success} alt="success icon" width={20} />
                <span className="text-xs text-secondary">First Tag</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
};

export default Portfolio;

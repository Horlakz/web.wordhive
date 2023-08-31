import classnames from "classnames";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

import heroImage from "@/assets/images/hero.svg";
import ValueCard from "./ValueCard";
import * as pageData from "./data";
import InquirySection from "./InquirySection";

function About() {
  return (
    <main className="sm:p-20 p-6 space-y-16">
      <section className="flex-center gap-40">
        <div className="space-y-6 p-0 sm:pr-20">
          <h4 className="sm:text-5xl text-[2.625rem] leading-[1.2] text-primary font-medium capitalize">
            Inspiring Creativity and Connection: The Wordhive Story
          </h4>

          <p className="text-dark-600 text-2xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
            ab quas fugit! Est error laudantium labore repellendus architecto
            quo soluta dolorum similique veniam.
          </p>
        </div>

        <Image
          src={heroImage}
          width={390}
          height={390}
          alt="Hero"
          className="sm:block hidden"
        />
      </section>

      <section className="flex-center sm:flex-row flex-col sm:gap-40 gap-10">
        <div className="sm:text-left text-center">
          <h3 className="text-3xl font-semibold text-primary">Our Mission</h3>
          <p className="text-dark-600">
            To empower individuals and businesses with the perfect expression
            through exceptional content creation, fostering connection,
            engagement and growth
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:p-0 px-10">
          {pageData.missions.map((cont, i) => {
            const diagonal = i == 1 || i == 2;
            const leftElem = i == 0 || i == 2;
            return (
              <div key={i} className={classnames({ "sm:pt-12": leftElem })}>
                <div
                  className={classnames(
                    "px-4 py-6 text-lg text-white rounded-2xl",
                    diagonal ? "sm:bg-primary" : "sm:bg-secondary",
                    i % 2 ? "bg-secondary" : "bg-primary"
                  )}
                >
                  {cont}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex-col-center gap-10">
        <div className="text-center">
          <h3 className="text-primary sm:text-3xl text-2xl font-semibold">
            Our Key Attributes
          </h3>
          <p className="sm:text-lg text-dark-600">
            Our values that fuels every WordHive project
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-10 rounded-2xl">
          {pageData.values.map((value, i) => (
            <ValueCard
              key={i}
              title={value.title}
              body={value.body}
              switchColors={i == 0 || i == 3}
            />
          ))}
        </div>
      </section>

      <InquirySection />
    </main>
  );
}

export default About;

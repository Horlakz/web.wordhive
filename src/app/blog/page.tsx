import React from "react";
import Image from "next/image";
import Link from "next/link";

import dot from "@/assets/icons/dot.svg";

const Blog = () => {
  return (
    <main className="py-5 sm:px-20 px-8">
      <section className="flex-center flex-wrap gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="text-lg text-dark-600 hover:text-secondary default-transition cursor-pointer"
          >
            Category
          </span>
        ))}
      </section>

      <section className="grid sm:grid-cols-3 gap-10 py-5">
        {[...new Array(10)].map((blog, i) => {
          const startOfYear = new Date(
            new Date().getFullYear(),
            0,
            1
          ).getTime();
          const currentDate = new Date().getTime();
          const randomDate = new Date(
            startOfYear + Math.random() * (currentDate - startOfYear)
          ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });

          return (
            <Link key={i} href={`/blog/${i}`} className="cursor-pointer">
              <div className="border-2 rounded-2xl space-y-6 p-4 hover:bg-[#e5e5e5] default-transition">
                <h6 className="text-xl text-dark-900 mt-2 font-semibold">
                  Blog Title {i + 1}
                </h6>

                <p className="text-dark-600 line-clamp-6">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad,
                  amet. Animi dolorum tempora molestiae labore laudantium
                  repellat officia hic odit, veritatis eligendi? Esse distinctio
                  dolorum neque eveniet consequatur veritatis repellendus ab,
                  quos numquam eaque animi laudantium praesentium accusantium
                  ratione optio, quas id, dolore qui deleniti vel dignissimos!
                  Ullam, tenetur at eius unde tempora quasi rerum voluptatum
                  error ad accusantium. Neque natus consectetur hic praesentium
                  temporibus ex eveniet nisi, deserunt ab vitae doloribus,
                  cupiditate ipsum maxime ea dicta explicabo voluptates numquam
                  eligendi necessitatibus beatae quae voluptatibus incidunt.
                  Impedit voluptate, id quae praesentium nulla odio architecto
                  asperiores consequuntur numquam perferendis inventore ea!
                </p>

                <div className="flex items-center text-sm">
                  <span>Category</span>
                  <Image
                    src={dot}
                    alt="dot"
                    width={4}
                    height={4}
                    className="mx-2"
                  />
                  <span>{randomDate}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default Blog;

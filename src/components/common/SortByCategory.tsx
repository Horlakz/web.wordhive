"use client";

import { useRouter } from "next/navigation";
import { Key } from "react";
import classNames from "classnames";

import { BlogCategoryData } from "@/services/blog/category";

interface Props {
  categories: BlogCategoryData[];
  active: string;
}

function SortByCategory({ categories, active }: Props) {
  const router = useRouter();

  const allCategories = [...categories, { name: "All", uuid: "all" }];

  return (
    <section className="flex-center flex-wrap gap-5">
      {allCategories?.map((category: BlogCategoryData, i: Key) => (
        <button
          key={i}
          className={classNames(
            "text-lg text-dark-600 hover:text-secondary default-transition cursor-pointer disabled:cursor-not-allowed",
            active == category.uuid && "text-secondary",
            active == null && category.uuid == "all" && "text-secondary"
          )}
          onClick={() => {
            if (category.uuid == "all") {
              router.push("?");
            } else {
              router.push("?limit=20&category=" + category.uuid);
            }
          }}
          disabled={
            active == category.uuid ||
            (active == null && category.uuid == "all")
          }
        >
          <span>{category.name}</span>
        </button>
      ))}
    </section>
  );
}

export default SortByCategory;

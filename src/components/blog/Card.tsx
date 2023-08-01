import React from "react";
import Image from "next/image";
import Link from "next/link";

import dot from "@/assets/icons/dot.svg";

interface BlogProps {
  slug: string;
  date: string;
  title: string;
  body: string;
  category: string;
}

function BlogCard({ slug, date, title, body, category }: BlogProps) {
  return (
    <Link key={slug} href={`/blog/${slug}`} className="cursor-pointer">
      <div className="border-2 rounded-2xl space-y-6 p-4 hover:bg-[#e5e5e5] default-transition">
        <h6 className="text-xl text-dark-900 mt-2 font-semibold">{title}</h6>

        <p className="text-dark-600 line-clamp-6">{body}</p>

        <div className="flex items-center text-sm">
          <span>{category}</span>
          <Image src={dot} alt="dot" width={4} height={4} className="mx-2" />
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;

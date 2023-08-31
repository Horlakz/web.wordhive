import type { Key } from "react";
import type { NextPage } from "next";

import BlogCard from "./Card";
import { BlogService } from "@/services/blog";
import {
  BlogCategoryData,
  BlogCategoryService,
} from "@/services/blog/category";
import { formatDate } from "@/utilities/date";
import Pagination from "../../../components/common/Pagination";
import SortByCategory from "../../../components/common/SortByCategory";

const blogService = new BlogService();
const blogCategoryService = new BlogCategoryService();

interface BlogData {
  title: string;
  slug: string;
  category: BlogCategoryData;
  body: string;
  created_at: string;
}

interface Props {
  searchParams: {
    page: number;
    category: string;
    limit: number;
  };
}

const Blog: NextPage<Props> = async ({ searchParams }) => {
  const blogData = blogService.listBlog(searchParams);
  const categoriesData = blogCategoryService.listBlogCategory();

  const [blogs, categories] = await Promise.all([blogData, categoriesData]);

  return (
    <main className="py-5 sm:px-20 px-8">
      <SortByCategory
        categories={categories.data}
        active={searchParams.category}
      />

      <section className="grid sm:grid-cols-3 gap-10 py-5">
        {blogs.data.results.map((blog: BlogData, i: Key) => {
          return (
            <BlogCard
              key={i}
              title={blog.title}
              slug={blog.slug}
              body={blog.body}
              category={blog.category?.name}
              date={formatDate(blog.created_at)}
            />
          );
        })}
      </section>

      <section className="flex-center flex-wrap gap-5">
        <Pagination
          current={searchParams.page}
          total={blogs.data.pagination.totalPages}
        />
      </section>
    </main>
  );
};

export default Blog;

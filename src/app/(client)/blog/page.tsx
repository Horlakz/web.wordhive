import { Key } from "react";

import BlogCard from "@/components/blog/Card";
import { BlogService } from "@/services/blog";
import {
  BlogCategoryData,
  BlogCategoryService,
} from "@/services/blog/category";
import { formatDate } from "@/utilities/date";
import Pagination from "./Pagination";
import { useBlog } from "./hook";

const blogService = new BlogService();
const blogCategoryService = new BlogCategoryService();

interface BlogData {
  title: string;
  slug: string;
  category: BlogCategoryData;
  body: string;
  created_at: string;
}

const Blog = async () => {
  // const { page } = useBlog();
  const blogData = blogService.listBlog();
  const categoriesData = blogCategoryService.listBlogCategory();

  const [blogs, categories] = await Promise.all([blogData, categoriesData]);

  return (
    <main className="py-5 sm:px-20 px-8">
      <section className="flex-center flex-wrap gap-5">
        {categories?.data.map((category: BlogCategoryData, i: Key) => (
          <span
            key={i}
            className="text-lg text-dark-600 hover:text-secondary default-transition cursor-pointer"
          >
            {category.name}
          </span>
        ))}
      </section>

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
        <Pagination />
      </section>
    </main>
  );
};

export default Blog;

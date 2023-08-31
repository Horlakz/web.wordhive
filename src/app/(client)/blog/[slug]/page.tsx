import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import chevronLeft from "@/assets/icons/chevron-left.svg";
import dot from "@/assets/icons/dot.svg";
import BlogCard from "../Card";
import { BlogService } from "@/services/blog";
import { BlogCategoryData } from "@/services/blog/category";
import { BlogCommentData, BlogCommentService } from "@/services/blog/comment";
import { formatDate } from "@/utilities/date";
import { Key } from "react";
import PostComment from "./PostComment";

const blogService = new BlogService();
const blogCommentService = new BlogCommentService();

interface BlogData {
  title: string;
  slug: string;
  category: BlogCategoryData;
  body: string;
  created_at: string;
}

interface Params {
  params: {
    slug: string;
  };
}

const ViewBlog: NextPage<Params> = async ({ params }) => {
  const { slug } = params;

  const blogData = blogService.getBlog(slug);
  const blogsData = blogService.listBlog();
  const commentsData = blogCommentService.listBlogComment(slug);

  const [blog, blogs, comments] = await Promise.all([
    blogData,
    blogsData,
    commentsData,
  ]);

  const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
  const currentDate = new Date().getTime();
  const randomDate = new Date(
    startOfYear + Math.random() * (currentDate - startOfYear)
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="px-10 py-6 w-full flex gap-8">
      <section className="space-y-2 w-full">
        <Link href="/blog">
          <div className="flex items-center gap-1 text-dark-900">
            <Image src={chevronLeft} alt="arrow left icon" />
            <span>Back to blog page</span>
          </div>
        </Link>

        <h2 className="sm:text-4xl text-2xl text-primary font-bold">
          {blog.data.title}
        </h2>

        <div className="flex items-center font-semibold text-[#B1B1B1]">
          <span>{blog.data.category.name}</span>
          <Image src={dot} alt="dot" width={4} height={4} className="mx-2" />
          <span>{formatDate(blog.data.created_at)}</span>
        </div>

        <p className="text-dark-600 leading-loose">{blog.data.body}</p>

        <div className="space-y-4">
          <h3 className="text-xl text-primary font-semibold">Comments</h3>

          <div>
            {comments.data.map((comment: BlogCommentData, i: Key) => (
              <div key={i}>
                <span className="font-semibold text-lg">
                  {comment.fullname}
                </span>
                <p>{comment.message}</p>
              </div>
            ))}
          </div>

          <PostComment slug={slug} />
        </div>
      </section>

      <div className="border-l-4 border-primary relative mt-8 sm:block hidden">
        <span className="w-4 h-4 bg-primary absolute -top-7" />
      </div>

      <section className="sm:grid hidden gap-4 border-t-4 border-primary w-2/5 py-5">
        <h2 className="font-semibold text-2xl text-primary">Latest Blogs</h2>

        {blogs.data.results.map((blog: BlogData, i: Key) => {
          return (
            <BlogCard
              key={i}
              title={blog.title}
              slug={blog.slug}
              body={blog.body}
              category={blog.category.name}
              date={formatDate(blog.created_at)}
            />
          );
        })}
      </section>
    </main>
  );
};

export default ViewBlog;

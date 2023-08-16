"use client";
import Link from "next/link";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import InputGroup from "@/components/common/InputGroup";
import Button from "@/components/common/Button";
import {
  BlogCategoryData,
  BlogCategoryService,
} from "@/services/blog/category";
import { BlogService } from "@/services/blog";

const CreateNewBlogPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const blogService = new BlogService();
  const blogServiceCategory = new BlogCategoryService();
  const data = { title, category, body };

  const categories = useQuery(
    ["categories"],
    async () => await blogServiceCategory.listBlogCategory()
  );

  const create = useMutation(async () => await blogService.createBlog(data), {
    onSuccess: () => {
      toast.success("Blog Post Created Successfully");
      router.push("/admin/blogs");
    },
    onError: (err: any) => {
      toast.error(
        err.response.data.message ?? "Error Occured while creating blog post"
      );
    },
  });

  if (categories.isLoading) return <div>Loading...</div>;
  if (categories.isError)
    return (
      <p className="text-red-600 text-lg">
        Any Error Occured while loading your data
      </p>
    );

  return (
    <div>
      <div className="w-full flex justify-start mb-8">
        <Link href="/admin/users" className="flex-center gap-1 text-dark-600">
          <ChevronLeftIcon width={18} height={18} strokeColor="#525252" />
          <span>Go Back</span>
        </Link>
      </div>

      <h2 className="text-xl font-semibold">Create Blog Post</h2>
      <form className="space-y-6 my-4 w-[50rem]">
        <div className="w-full flex gap-6">
          <InputGroup.Input
            showLabel={false}
            className="w-full"
            label="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputGroup.Select
            showLabel={false}
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categories.data.data.map((category: BlogCategoryData) => ({
              label: category.name,
              value: category.uuid,
            }))}
            className="w-3/6"
          />
        </div>
        <InputGroup.TextArea
          showLabel={false}
          label="Post Body"
          rows={10}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <Button
          className="bg-admin-primary"
          isLoading={create.isLoading}
          onClick={() => create.mutate()}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateNewBlogPage;

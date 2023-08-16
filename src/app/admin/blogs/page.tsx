"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import InputSearch from "@/components/admin/InputSearch";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import Table from "@/components/common/Table";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import ChevronRightIcon from "@/components/icons/ChevronRight";
import PlusIcon from "@/components/icons/Plus";
import { BlogData, BlogService } from "@/services/blog";
import { BlogCategoryService } from "@/services/blog/category";

const AdminBlogPage = () => {
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const blogService = new BlogService();
  const blogServiceCategory = new BlogCategoryService();

  const blogs = useQuery(["blogs"], async () => await blogService.listBlog());
  const categories = useQuery(
    ["categories"],
    async () => await blogServiceCategory.listBlogCategory()
  );

  const removeBlog = useMutation(async () => await blogService.deleteBlog(id), {
    onSuccess: () => {
      blogs.refetch();
      setDeleteModal(false);
      toast.success("Blog deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message ?? "An error occured while deleting Blog"
      );
    },
  });

  const isLoading = blogs.isLoading || categories.isLoading;
  const isError = blogs.isError || categories.isError;

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <p className="text-red-600 text-lg">
        Any Error Occured while loading your data
      </p>
    );

  return (
    <div>
      <section className="w-full flex-center py-6">
        <InputSearch />
      </section>

      <section>
        <div className="flex justify-between items-center my-3">
          <Button
            icon={<PlusIcon />}
            iconPosition="right"
            onClick={() => router.push("/admin/blogs/new")}
          >
            Add New Blog Post
          </Button>

          <div className="flex items-center gap-4">
            <label htmlFor="category">Sort by category: </label>
            <select
              name="category"
              id="category"
              className="bg-white drop-shadow-md p-3"
              onChange={(e) => {
                if (e.target.value === "manage-categories") {
                  router.push("/admin/blogs/categories");
                } else {
                  return;
                }
              }}
            >
              {categories.data.data.map(
                (category: { uuid: string; name: string }) => (
                  <option key={category.uuid} value={category.uuid}>
                    {category.name}
                  </option>
                )
              )}
              <option value="manage-categories" className="text-sm">
                Manage Categories
              </option>
            </select>
          </div>

          <div className="flex justify-end items-center">
            <Button variant="outline" className="border-none">
              <ChevronLeftIcon strokeColor="#d4d4d4" />
            </Button>
            <span className="text-dark-600">1 - 20 of 100</span>
            <Button variant="outline" className="border-none">
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
        <Table
          tableHeaders={[
            { title: "Blog Post Title" },
            { title: "Category" },
            { title: "Actions" },
          ]}
          tableKeys={["title", "category"]}
          tableData={blogs.data.data.map((blog: Required<BlogData>) => ({
            ...blog,
            category: (blog.category as { name: string }).name,
          }))}
          tableActions={[
            (data) => (
              <Link href={"/blog/" + data.slug}>
                <Button variant="outline">View</Button>
              </Link>
            ),
            (data) => (
              <Button
                variant="outline"
                colorScheme="danger"
                onClick={() => {
                  setId(data.uuid);
                  setDeleteModal(true);
                }}
              >
                Delete
              </Button>
            ),
          ]}
        />
      </section>

      <Modal
        visibility={deleteModal}
        setVisibility={() => setDeleteModal(false)}
      >
        <div className="p-12 space-y-4">
          <p className="my-2 text-danger text-center w-80">
            Are you sure you want to delete blog?
          </p>

          <div className="flex center gap-2">
            <Button variant="outline" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              colorScheme="danger"
              isLoading={removeBlog.isLoading}
              onClick={() => removeBlog.mutate()}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminBlogPage;

"use client";
import { useContext } from "react";

import BackButton from "@/components/admin/BackButton";
import PreLoader from "@/components/admin/PreLoader";
import Button from "@/components/common/Button";
import InputGroup from "@/components/common/InputGroup";
import { BlogCategoryData } from "@/services/blog/category";
import { BlogContext } from "../context";
import { useBlog } from "../hook";
import { NextPage } from "next";

interface Params {
  params: {
    slug: string;
  };
}

const UpdateBlogPage: NextPage<Params> = ({ params }) => {
  const { formData, setForm } = useContext(BlogContext);
  const { categories, update, setSlug } = useBlog();

  return (
    <div>
      <div className="w-full flex justify-start mb-8">
        <BackButton />
      </div>

      <h2 className="text-xl font-semibold">Update Blog Post</h2>
      <PreLoader status={categories.status}>
        <form className="space-y-6 my-4 w-[50rem]">
          <div className="w-full flex gap-6">
            <InputGroup.Input
              showLabel={false}
              className="w-full"
              label="Post Title"
              value={formData.title}
              onChange={(e) => setForm({ ...formData, title: e.target.value })}
            />
            <InputGroup.Select
              showLabel={false}
              label="Category"
              value={formData.category as string}
              onChange={(e) =>
                setForm({ ...formData, category: e.target.value })
              }
              options={categories.data?.data.map(
                (category: BlogCategoryData) => ({
                  label: category.name,
                  value: category.uuid,
                })
              )}
              className="w-3/6"
            />
          </div>
          <InputGroup.TextArea
            showLabel={false}
            label="Post Body"
            rows={10}
            value={formData.body}
            onChange={(e) => setForm({ ...formData, body: e.target.value })}
          />

          <Button
            className="bg-admin-primary"
            isLoading={update.isLoading}
            onClick={() => {
              setSlug(params.slug);
              update.mutate();
            }}
          >
            Update
          </Button>
        </form>
      </PreLoader>
    </div>
  );
};

export default UpdateBlogPage;

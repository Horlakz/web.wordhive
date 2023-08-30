import { useQuery, useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { BlogAPIParams, BlogData, BlogService } from "@/services/blog";
import { BlogCategoryService } from "@/services/blog/category";
import { BlogContext } from "./context";

export const INITIAL_FORM: BlogData = { title: "", category: "", body: "" };

export function useBlogForm() {
  const [formData, setFormData] = useState<BlogData>(INITIAL_FORM);

  function setForm(data: BlogData) {
    setFormData((prev) => ({ ...prev, ...data }));
  }

  return { formData, setForm };
}

export function useBlog() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [slug, setSlug] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const { formData } = useContext(BlogContext);
  const blogService = new BlogService();
  const blogServiceCategory = new BlogCategoryService();

  const params: Omit<BlogAPIParams, "limit"> = { search, page, category };

  function onError(err: any) {
    toast.error(err.response.data.message ?? "An Error Occured");
  }

  const blogs = useQuery(
    ["blogs", params],
    async () => await blogService.listBlog(params)
  );
  const categories = useQuery(
    ["categories"],
    async () => await blogServiceCategory.listBlogCategory()
  );

  const create = useMutation(
    async () => await blogService.createBlog(formData),
    {
      onSuccess: () => {
        toast.success("Blog Post Created Successfully");
        router.push("/admin/blogs");
      },
      onError,
    }
  );

  const update = useMutation(
    async () => await blogService.updateBlog(slug, formData),
    {
      onSuccess: () => {
        toast.success("Blog Post Updated Successfully");
        router.push("/admin/blogs");
      },
      onError,
    }
  );

  const remove = useMutation(async () => await blogService.deleteBlog(slug), {
    onSuccess: () => {
      blogs.refetch();
      setModal(false);
      toast.success("Blog deleted successfully");
    },
    onError,
  });

  return {
    blogs,
    categories,
    remove,
    create,
    update,
    modal,
    search,
    page,
    setModal,
    setPage,
    setSearch,
    setCategory,
    setSlug,
  };
}

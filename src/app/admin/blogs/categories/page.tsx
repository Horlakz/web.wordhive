"use client";

import CategoryManagement from "@/components/admin/category";
import { BlogCategoryService } from "@/services/blog/category";

const AdminBlogCategoriesPage = () => {
  const blogCategory = new BlogCategoryService();

  return (
    <CategoryManagement
      list={() => blogCategory.listBlogCategory()}
      create={(data) => blogCategory.createBlogCategory(data)}
      update={(id, data) => blogCategory.updateBlogCategory(id, data)}
      remove={(id) => blogCategory.deleteBlogCategory(id)}
      title="Blog"
    />
  );
};

export default AdminBlogCategoriesPage;

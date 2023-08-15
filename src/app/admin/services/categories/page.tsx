"use client";

import CategoryManagement from "@/components/admin/category";
import { ApplicationServiceCategory } from "@/services/services/category";

const AdminServicePage = () => {
  const appServiceCategory = new ApplicationServiceCategory();

  return (
    <CategoryManagement
      list={() => appServiceCategory.listServiceCategories()}
      create={(data) => appServiceCategory.createServiceCategory(data)}
      update={(id, data) => appServiceCategory.updateServiceCategory(id, data)}
      remove={(id) => appServiceCategory.deleteServiceCategory(id)}
      title="Service"
    />
  );
};

export default AdminServicePage;

"use client";

import CategoryManagement from "@/components/admin/category";
import { PortfolioFieldService } from "@/services/portfolio/field";

const AdminPortfolioFieldsPage = () => {
  const portfolioFieldService = new PortfolioFieldService();

  return (
    <CategoryManagement
      list={() => portfolioFieldService.listPorfolioField()}
      create={(data) => portfolioFieldService.createPortfolioField(data)}
      update={(id, data) =>
        portfolioFieldService.updatePortfolioField(id, data)
      }
      remove={(id) => portfolioFieldService.deletePortfolioField(id)}
      title="Portfolio"
      field="field"
    />
  );
};

export default AdminPortfolioFieldsPage;

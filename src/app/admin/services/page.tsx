"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import InputSearch from "@/components/admin/InputSearch";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import ChevronRightIcon from "@/components/icons/ChevronRight";
import PlusIcon from "@/components/icons/Plus";
import { ApplicationService } from "@/services/services";
import { ApplicationServiceCategory } from "@/services/services/category";

interface ServiceData {
  uuid: string;
  title: string;
  body: string;
  category: { name: string };
}

const AdminServicePage = () => {
  const router = useRouter();
  const appService = new ApplicationService();
  const appServiceCategory = new ApplicationServiceCategory();

  const services = useQuery(
    ["services"],
    async () => await appService.listServices()
  );
  const categories = useQuery(
    ["categories"],
    async () => await appServiceCategory.listServiceCategories()
  );

  const isLoading = services.isLoading || categories.isLoading;
  const isError = services.isError || categories.isError;

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
            onClick={() => router.push("/admin/services/new")}
          >
            Add New Service
          </Button>

          <div className="flex items-center gap-4">
            <label htmlFor="category">Sort by category: </label>
            <select
              name="category"
              id="category"
              className="bg-white drop-shadow-md p-3"
              onChange={(e) => {
                if (e.target.value === "manage-categories") {
                  router.push("/admin/services/categories");
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
              <ChevronLeftIcon />
            </Button>
            <span className="text-dark-600">1 - 20 of 100</span>
            <Button variant="outline" className="border-none">
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
        <Table
          tableHeaders={[
            { title: "Service Title" },
            { title: "Description" },
            { title: "Category" },
            { title: "Actions" },
          ]}
          tableKeys={["title", "body", "category"]}
          tableData={services.data.data.map((service: ServiceData) => ({
            ...service,
            category: service.category.name,
          }))}
          tableActions={[
            (data) => (
              <Button variant="outline" colorScheme="danger">
                Delete
              </Button>
            ),
          ]}
        />
      </section>
    </div>
  );
};

export default AdminServicePage;

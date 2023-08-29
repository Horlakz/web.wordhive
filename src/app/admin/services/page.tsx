"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import DeleteModal from "@/components/admin/DeleteModal";
import InputSearch from "@/components/admin/InputSearch";
import PaginationButtons from "@/components/admin/PaginationButtons";
import PreLoader from "@/components/admin/PreLoader";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
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
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const appService = new ApplicationService();
  const appServiceCategory = new ApplicationServiceCategory();

  const services = useQuery(
    ["services", search, category, page],
    async () => await appService.listServices(category, search, page)
  );
  const categories = useQuery(
    ["categories"],
    async () => await appServiceCategory.listServiceCategories()
  );

  const remove = useMutation(async () => await appService.deleteService(id), {
    onSuccess: () => {
      services.refetch();
      setDeleteModal(false);
      toast.success("Service deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message ?? "An error occured while deleting service"
      );
    },
  });

  return (
    <div>
      <section className="w-full flex-center py-6">
        <InputSearch
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
                } else if (e.target.value == "all") {
                  setCategory("");
                } else {
                  setCategory(e.target.value);
                }
              }}
            >
              <option value="all">All</option>
              {categories.data?.data?.map(
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

          <PaginationButtons
            page={page}
            setPage={setPage}
            pagination={services.data?.data.pagination}
          />
        </div>
        <PreLoader status={services.status}>
          <Table
            tableHeaders={[
              { title: "Service Title" },
              { title: "Description" },
              { title: "Category" },
              { title: "Actions" },
            ]}
            tableKeys={["title", "body", "category"]}
            tableData={services.data?.data.results.map(
              (service: ServiceData) => ({
                ...service,
                category: service.category.name,
              })
            )}
            tableActions={[
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
        </PreLoader>
      </section>

      <DeleteModal
        title="Service"
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        remove={remove}
      />
    </div>
  );
};

export default AdminServicePage;

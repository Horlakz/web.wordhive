"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import DeleteModal from "@/components/admin/DeleteModal";
import InputSearch from "@/components/admin/InputSearch";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import ChevronRightIcon from "@/components/icons/ChevronRight";
import PlusIcon from "@/components/icons/Plus";
import { PortfolioService } from "@/services/portfolio";
import { PortfolioFieldService } from "@/services/portfolio/field";

const AdminPortfolioPage = () => {
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const portfolioService = new PortfolioService();
  const portfolioServiceField = new PortfolioFieldService();

  const portfolios = useQuery(
    ["portfolios"],
    async () => await portfolioService.listPortfolios()
  );
  const fields = useQuery(
    ["fields"],
    async () => await portfolioServiceField.listPorfolioField()
  );

  const removePortfolio = useMutation(
    async () => await portfolioService.deletePortfolio(id),
    {
      onSuccess: () => {
        portfolios.refetch();
        setDeleteModal(false);
        toast.success("Portfolio deleted successfully");
      },
      onError: (error: any) => {
        toast.error(
          error.response.data.message ??
            "An error occured while deleting portfolio"
        );
      },
    }
  );

  const isLoading = portfolios.isLoading || fields.isLoading;
  const isError = portfolios.isError || fields.isError;

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
            onClick={() => router.push("/admin/portfolio/new")}
          >
            Add New Portfolio
          </Button>

          <div className="flex items-center gap-4">
            <label htmlFor="field">Sort by Field: </label>
            <select
              name="field"
              id="field"
              className="bg-white drop-shadow-md p-3"
              onChange={(e) => {
                if (e.target.value === "manage-categories") {
                  router.push("/admin/portfolio/fields");
                } else {
                  return;
                }
              }}
            >
              {fields.data.data.map((field: { uuid: string; name: string }) => (
                <option key={field.uuid} value={field.uuid}>
                  {field.name}
                </option>
              ))}
              <option value="manage-categories" className="text-sm">
                Manage Fields
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
            { title: "Porfolio Title" },
            { title: "Category" },
            { title: "Actions" },
          ]}
          tableKeys={["title", "category"]}
          tableData={portfolios.data.data.results.map((portfolio: any) => ({
            ...portfolio,
            category: portfolio.field.name,
          }))}
          tableActions={[
            () => (
              <Link href={"/portfolio/"}>
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

      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        remove={removePortfolio}
        title="Portfolio"
      />
    </div>
  );
};

export default AdminPortfolioPage;

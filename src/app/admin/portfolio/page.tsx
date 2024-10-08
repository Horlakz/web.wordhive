"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import DeleteModal from "@/components/admin/DeleteModal";
import InputSearch from "@/components/admin/InputSearch";
import PaginationButtons from "@/components/admin/PaginationButtons";
import PreLoader from "@/components/admin/PreLoader";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import PlusIcon from "@/components/icons/Plus";
import { PortfolioService } from "@/services/portfolio";
import { PortfolioFieldService } from "@/services/portfolio/field";
import SortByCategory from "@/components/admin/SortByCategory";

const AdminPortfolioPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");
  const [field, setField] = useState("");
  const [page, setPage] = useState(1);
  const portfolioService = new PortfolioService();
  const portfolioServiceField = new PortfolioFieldService();

  const portfolios = useQuery(
    ["portfolios", search, field, page],
    async () => await portfolioService.listPortfolios(field, search, page)
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
            onClick={() => router.push("/admin/portfolio/new")}
          >
            Add New Portfolio
          </Button>

          <SortByCategory
            name="Field"
            data={fields.data?.data}
            setCategory={setField}
            pageUrl={pathname.replace("/admin", "")}
          />

          <PaginationButtons
            page={page}
            setPage={setPage}
            pagination={portfolios.data?.data.pagination}
          />
        </div>
        <PreLoader status={portfolios.status}>
          <Table
            tableHeaders={[
              { title: "Porfolio Title" },
              { title: "Category" },
              { title: "Actions" },
            ]}
            tableKeys={["title", "category"]}
            tableData={portfolios.data?.data.results.map((portfolio: any) => ({
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
        </PreLoader>
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

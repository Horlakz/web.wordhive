import InputSearch from "@/components/admin/InputSearch";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import ChevronRightIcon from "@/components/icons/ChevronRight";
import PlusIcon from "@/components/icons/Plus";
import Link from "next/link";

const AdminServicePage = () => {
  return (
    <div>
      <section className="w-full flex-center py-6">
        <InputSearch />
      </section>

      <section>
        <div className="flex justify-between items-center my-3">
          <Button icon={<PlusIcon />} iconPosition="right">
            Add New Service
          </Button>

          <div className="flex items-center gap-4">
            <label htmlFor="category">Sort by category: </label>
            <select
              name="category"
              id="category"
              className="bg-white drop-shadow-md p-3"
            >
              <option value="all">All</option>
              <option value="hair">Hair</option>
              <option value="nails">Nails</option>
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
            { title: "Service Name" },
            { title: "Category" },
            { title: "Actions" },
          ]}
          tableKeys={["name", "category"]}
          tableData={[
            {
              id: "1",
              name: "John Doe",
              category: "Textbook",
              date: "May 31, 2021",
            },
            {
              id: "2",
              name: "John Doe",
              category: "Textbook",
              date: "May 31, 2021",
            },
          ]}
          tableActions={[
            (data) => (
              <Link href={"/services/" + data.id}>
                <Button variant="outline">View</Button>
              </Link>
            ),
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

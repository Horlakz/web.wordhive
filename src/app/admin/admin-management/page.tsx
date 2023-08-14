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
            Add New Admin
          </Button>

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
            { title: "Full Name" },
            { title: "Email Address" },
            { title: "Date Added" },
            { title: "Remove Admin" },
          ]}
          tableKeys={["name", "email", "date"]}
          tableData={[
            {
              id: "1",
              name: "John Doe",
              email: "horlakz@hndwok.com",
              date: "May 31, 2021",
            },
            {
              id: "2",
              name: "John Doe",
              email: "horlakz@hndwok.com",
              date: "May 31, 2021",
            },
          ]}
          tableActions={[
            (data) => (
              <Button variant="outline" colorScheme="danger">
                Remove
              </Button>
            ),
          ]}
        />
      </section>
    </div>
  );
};

export default AdminServicePage;

import InputSearch from "@/components/admin/InputSearch";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import ChevronRightIcon from "@/components/icons/ChevronRight";
import Link from "next/link";

const AdminUsersPage = () => {
  return (
    <div>
      <section className="w-full flex-center py-6">
        <InputSearch />
      </section>

      <section>
        <div className="flex justify-end items-center">
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
            { title: "Date Joined" },
            { title: "View Orders" },
          ]}
          tableKeys={["name", "email", "date"]}
          tableData={[
            {
              id: "1",
              name: "John Doe",
              email: "johndoe@gmail.com",
              date: "May 31, 2021",
            },
            {
              id: "2",
              name: "John Doe",
              email: "johndoe@email.com",
              date: "May 31, 2021",
            },
          ]}
          tableActions={[
            (data) => {
              return (
                <Link href={"/admin/users/" + data.id}>
                  <Button variant="outline">View</Button>
                </Link>
              );
            },
          ]}
        />
      </section>
    </div>
  );
};

export default AdminUsersPage;

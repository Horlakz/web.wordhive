import Link from "next/link";

import InputSearch from "@/components/admin/InputSearch";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import ChevronRightIcon from "@/components/icons/ChevronRight";
import PlusIcon from "@/components/icons/Plus";

const AdminOrderPage = () => {
  return (
    <div>
      <section className="w-full flex-center py-6">
        <InputSearch />
      </section>

      <section>
        <div className="flex justify-end items-center my-3">
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
            { title: "Reference" },
            { title: "Title" },
            { title: "User's FullName" },
            { title: "Order Status" },
            { title: "View Details" },
          ]}
          tableKeys={["reference", "title", "fullname", "status"]}
          tableData={[
            {
              id: "1",
              reference: "#SVC_X9MT0FLYJ6P4",
              title: "Opinion Paper",
              fullname: "John Doe",
              status: "Payment not successful",
              date: "May 31, 2021",
            },
            {
              id: "2",
              reference: "#SVC_X9MT0FLYJ6P4",
              title: "Opinion Paper",
              fullname: "John Doe",
              status: "Delivered",
              date: "May 31, 2021",
            },
            {
              id: "3",
              reference: "#SVC_X9MT0FLYJ6P4",
              title: "Opinion Paper",
              fullname: "John Doe",
              status: "Pending",
              date: "May 31, 2021",
            },
            {
              id: "4",
              reference: "#SVC_X9MT0FLYJ6P4",
              title: "Opinion Paper",
              fullname: "John Doe",
              status: "Payment not successful",
              date: "May 31, 2021",
            },
          ]}
          tableActions={[
            (data) => (
              <Link href={"/admin/orders/" + data.id}>
                <Button variant="outline">View Details</Button>,
              </Link>
            ),
          ]}
        />
      </section>
    </div>
  );
};

export default AdminOrderPage;

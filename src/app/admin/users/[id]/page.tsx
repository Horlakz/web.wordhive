import Link from "next/link";

import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import ChevronRightIcon from "@/components/icons/ChevronRight";

const AdminUsersPage = () => {
  return (
    <div>
      <div className="w-full flex justify-start mb-8">
        <Link href="/admin/users" className="flex-center gap-1 text-dark-600">
          <ChevronLeftIcon width={18} height={18} strokeColor="#525252" />
          <span>Go Back</span>
        </Link>
      </div>

      <section className="font-medium space-y-4 pb-2">
        <div>
          <span className="text-hover">Fullname: </span>
          <span className="text-dark-600">John Doe</span>
        </div>
        <div>
          <span className="text-hover">Email Address: </span>
          <span className="text-dark-600">horlakz@hndwok.com</span>
        </div>
        <div>
          <span className="text-hover">Date Joined: </span>
          <span className="text-dark-600">May 31st, 2023</span>
        </div>
      </section>

      <section>
        <div className="flex justify-start items-center my-4">
          <h2 className="text-hover text-xl font-semibold">Order History</h2>
        </div>
        <Table
          tableHeaders={[
            { title: "Service Purchased" },
            { title: "Category" },
            // { title: "Date Joined" },
            { title: "View Order" },
          ]}
          tableKeys={["name", "email"]}
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

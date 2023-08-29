"use client";

import InputSearch from "@/components/admin/InputSearch";
import PreLoader from "@/components/admin/PreLoader";
import Table from "@/components/common/Table";
import { AddBtn, DeleteBtn, UpdateBtn } from "./Buttons";
import FormModal from "./FormModal";
import { FaqProvider } from "./context";
import { useFAQ } from "./hook";

const FAQsPage = () => {
  const { data, status } = useFAQ();

  return (
    <PreLoader status={status}>
      <FaqProvider>
        <div>
          <section className="w-full flex-center py-6">
            <InputSearch />
          </section>

          <section>
            <div className="flex items-center my-3">
              <AddBtn />
            </div>

            <Table
              tableHeaders={[
                { title: "Question" },
                { title: "Answer" },
                { title: "Manage FAQ" },
              ]}
              tableKeys={["question", "answer"]}
              tableData={data?.data}
              tableActions={[
                (data) => <UpdateBtn data={data} />,
                (data) => <DeleteBtn data={data} />,
              ]}
            />
          </section>
        </div>

        <FormModal />
      </FaqProvider>
    </PreLoader>
  );
};

export default FAQsPage;

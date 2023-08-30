"use client";

import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

import DeleteModal from "@/components/admin/DeleteModal";
import InputSearch from "@/components/admin/InputSearch";
import PaginationButtons from "@/components/admin/PaginationButtons";
import PreLoader from "@/components/admin/PreLoader";
import SortByCategory from "@/components/admin/SortByCategory";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import PlusIcon from "@/components/icons/Plus";
import { BlogData } from "@/services/blog";
import { BlogContext } from "./context";
import { useBlog, INITIAL_FORM } from "./hook";

const AdminBlogPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setForm } = useContext(BlogContext);
  const {
    blogs,
    categories,
    remove,
    search,
    page,
    modal,
    setPage,
    setSearch,
    setCategory,
    setSlug,
    setModal,
  } = useBlog();

  return (
    <div>
      <section className="w-full flex-center py-6">
        <InputSearch
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </section>

      <section>
        <div className="flex justify-between items-center my-3">
          <Button
            icon={<PlusIcon />}
            iconPosition="right"
            onClick={() => {
              setForm(INITIAL_FORM);
              router.push("/admin/blogs/new");
            }}
          >
            Add New Blog Post
          </Button>

          <SortByCategory
            data={categories.data?.data}
            setCategory={setCategory}
            pageUrl={pathname.replace("/admin", "")}
          />

          <PaginationButtons
            page={page}
            setPage={setPage}
            pagination={blogs.data?.data.pagination}
          />
        </div>
        <PreLoader status={blogs.status}>
          <Table
            tableHeaders={[
              { title: "Blog Post Title" },
              { title: "Category" },
              { title: "Actions" },
            ]}
            tableKeys={["title", "category"]}
            tableData={
              blogs.data?.data.pagination.total == 0
                ? []
                : blogs.data?.data.results.map((blog: Required<BlogData>) => ({
                    ...blog,
                    category: (blog.category as { name: string }).name,
                  }))
            }
            tableActions={[
              (data) => (
                <Button
                  onClick={() => {
                    router.push("/admin/blogs/" + data.slug);
                    setForm({
                      title: data.title,
                      category: data.category,
                      body: data.body,
                    });
                  }}
                >
                  Update
                </Button>
              ),
              (data) => (
                <Button
                  variant="outline"
                  colorScheme="danger"
                  onClick={() => {
                    setSlug(data.uuid);
                    setModal(true);
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
        deleteModal={modal}
        setDeleteModal={setModal}
        remove={remove}
        title="blog"
      />
    </div>
  );
};

export default AdminBlogPage;

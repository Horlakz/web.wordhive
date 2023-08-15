"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";

import CategoryModal from "@/components/admin/category/CategoryModal";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import PlusIcon from "@/components/icons/Plus";

interface Props {
  list: () => Promise<any>;
  create: (data: any) => Promise<any>;
  update: (id: string, data: any) => Promise<any>;
  remove: (id: string, data: any) => Promise<any>;
  title: string;
  field?: string;
}

const CategoryManagement: FC<Props> = ({
  list,
  create,
  update,
  remove,
  title,
  field = "Category",
}) => {
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [name, setValue] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  function onSuccess(msg: string = "Category Created Successfully") {
    toast.success(msg);
    setCreateModal(false);
    setUpdateModal(false);
    setDeleteModal(false);
    setValue("");
    setCategoryId("");
    queryClient.invalidateQueries(["categories"]);
  }

  function onError(err: any) {
    toast.error(
      err.response.data.message ?? "Error Occured while creating category"
    );
  }

  const categories = useQuery(["categories"], async () => await list());

  const createCategory = useMutation(async () => await create({ name }), {
    onSuccess: () => onSuccess(),
    onError,
  });

  const updateCategory = useMutation(
    async () => await update(categoryId, { name }),
    { onSuccess: () => onSuccess("Category Updated Successfully"), onError }
  );

  const deleteCategory = useMutation(
    async () => await remove(categoryId, { name }),
    { onSuccess: () => onSuccess("Category Deleted Successfully"), onError }
  );

  const isLoading = categories.isLoading;
  const isError = categories.isError;

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <p className="text-red-600 text-lg">
        Any Error Occured while loading your data
      </p>
    );

  return (
    <div>
      <div className="w-full flex justify-start mb-6">
        <button
          className="flex-center gap-1 text-dark-600"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon width={18} height={18} strokeColor="#525252" />
          <span>Go Back</span>
        </button>
      </div>

      <section>
        <div className="flex justify-start items-center my-3">
          <Button
            icon={<PlusIcon />}
            iconPosition="right"
            onClick={() => setCreateModal(true)}
          >
            Add New&nbsp;{title}&nbsp;{field}
          </Button>
        </div>
        <Table
          tableHeaders={[{ title: "Name" }, { title: "Actions", colSpan: 2 }]}
          tableKeys={["name"]}
          tableData={categories.data.data}
          tableActions={[
            (data) => (
              <Button
                variant="outline"
                onClick={() => {
                  setUpdateModal(true);
                  setCategoryId(data.uuid);
                  setValue(data.name);
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
                  setDeleteModal(true);
                  setCategoryId(data.uuid);
                  setValue(data.name);
                }}
              >
                Delete
              </Button>
            ),
          ]}
        />
      </section>

      <CategoryModal
        title={title}
        field={field}
        visible={createModal}
        onClose={() => setCreateModal(false)}
        value={name}
        setValue={(e) => setValue(e.target.value)}
        isLoading={createCategory.isLoading}
        onSubmit={() => createCategory.mutate()}
      />

      <CategoryModal
        title={title}
        field={field}
        visible={updateModal}
        onClose={() => {
          setUpdateModal(false);
          setCategoryId("");
          setValue("");
        }}
        value={name}
        setValue={(e) => setValue(e.target.value)}
        isLoading={updateCategory.isLoading}
        onSubmit={() => updateCategory.mutate()}
        btnName={"Update " + field}
      />

      <CategoryModal
        title={title}
        field={field}
        isDelete
        visible={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setCategoryId("");
          setValue("");
        }}
        value={name}
        isLoading={deleteCategory.isLoading}
        onSubmit={() => deleteCategory.mutate()}
        btnName={"Delete " + field}
      />
    </div>
  );
};

export default CategoryManagement;

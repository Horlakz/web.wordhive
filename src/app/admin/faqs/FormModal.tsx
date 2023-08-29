import { useContext } from "react";

import Button from "@/components/common/Button";
import InputGroup from "@/components/common/InputGroup";
import Modal from "@/components/common/Modal";
import { FaqContext } from "./context";
import { useFAQ } from "./hook";
import DeleteModal from "@/components/admin/DeleteModal";

function FormModal() {
  const { formData, modal, formFunction, setModal, setForm } =
    useContext(FaqContext);
  const { create, update, remove } = useFAQ();

  function handleSubmit() {
    if (formFunction == "create") {
      create.mutate();
    } else {
      update.mutate();
    }
  }

  if (formFunction == "delete")
    return (
      <DeleteModal
        deleteModal={modal}
        setDeleteModal={() => setModal(false)}
        remove={remove}
        title="FAQ"
      />
    );

  return (
    <Modal visibility={modal} setVisibility={() => setModal(false)}>
      <div className="p-12 space-y-4 min-w-[30rem]">
        <h3 className="text-xl text-center font-semibold">
          {formFunction == "create" ? "Add New" : "Update"} FAQ
        </h3>

        <InputGroup.Input
          label="Question"
          showLabel={false}
          value={formData.question}
          onChange={(e) => setForm({ ...formData, question: e.target.value })}
        />
        <InputGroup.TextArea
          label="Answer"
          showLabel={false}
          placeholder="Enter answer to question"
          value={formData.answer}
          onChange={(e) => setForm({ ...formData, answer: e.target.value })}
        />

        <div className="flex center gap-2">
          <Button
            variant="outline"
            colorScheme="danger"
            onClick={() => setModal(false)}
          >
            Cancel
          </Button>
          <Button
            isLoading={create.isLoading || update.isLoading}
            onClick={handleSubmit}
          >
            {formFunction == "create" ? "Add" : "Update"} FAQ
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default FormModal;

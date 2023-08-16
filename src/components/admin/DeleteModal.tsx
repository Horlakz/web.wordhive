import { UseMutationResult } from "@tanstack/react-query";
import React from "react";

import Button from "../common/Button";
import Modal from "../common/Modal";

interface Props {
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  remove: UseMutationResult<any, unknown, void, unknown>;
  title: string;
}

function DeleteModal({ deleteModal, setDeleteModal, remove, title }: Props) {
  return (
    <Modal visibility={deleteModal} setVisibility={() => setDeleteModal(false)}>
      <div className="p-12 space-y-4">
        <p className="my-2 text-danger text-center w-80">
          Are you sure you want to remove {title}?
        </p>

        <div className="flex center gap-2">
          <Button variant="outline" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            colorScheme="danger"
            isLoading={remove.isLoading}
            onClick={() => remove.mutate()}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;

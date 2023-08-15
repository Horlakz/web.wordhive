import { ChangeEvent } from "react";

import Button from "../../common/Button";
import InputGroup from "../../common/InputGroup";
import Modal from "../../common/Modal";

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  btnName?: string;
  placeholder?: string;
  value: string;
  setValue?: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  onSubmit: () => void;
  isDelete?: boolean;
  field?: string;
  title: string;
}

function CategoryModal({
  visible,
  onClose,
  field = "category",
  btnName = "Create " + field,
  placeholder = "Enter name of " + field,
  value,
  setValue,
  isLoading = false,
  onSubmit,
  isDelete = false,
  title,
}: CategoryModalProps) {
  return (
    <Modal visibility={visible} setVisibility={onClose}>
      <div className="p-10 grid center">
        {isDelete ? (
          <div className="text-center">
            <p className="text-lg font-medium">
              Are you sure you want to delete this {field}&nbsp;
              <span className="font-semibold text-dark-600">{value}</span>
            </p>
            <p className="text-danger">
              All {title}s related to this {field} will be deleted
            </p>
          </div>
        ) : (
          <InputGroup.Input
            label="Name"
            placeholder={placeholder}
            value={value}
            onChange={setValue}
          />
        )}

        <div className="flex gap-4 mt-6">
          <Button
            variant="outline"
            colorScheme={isDelete ? "primary" : "danger"}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            colorScheme={isDelete ? "danger" : "primary"}
            isLoading={isLoading}
            onClick={onSubmit}
          >
            {btnName}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CategoryModal;

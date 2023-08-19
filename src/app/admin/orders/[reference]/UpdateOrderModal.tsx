import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { FC } from "react";
import { ConfirmOrderModalProps } from "./ConfirmOrderModal";

interface UpdateOrderModalProps extends ConfirmOrderModalProps {}

const UpdateOrderModal: FC<UpdateOrderModalProps> = ({
  modal,
  setModal,
  mutation,
}) => {
  return (
    <Modal visibility={modal} setVisibility={() => setModal(false)}>
      <div className="flex flex-col items-center justify-center space-y-4 w-[30rem] p-10">
        <h2 className="text-xl text-admin-primary font-semibold">
          Update Order
        </h2>

        <p className="text-center text-dark-600">
          Order will be marked as&nbsp;
          <span className="font-semibold">out for delivered</span>&nbsp;and the
          user will receive a notification that the order is out for delivery
        </p>

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => setModal(false)}>
            Cancel
          </Button>
          <Button
            colorScheme="success"
            isLoading={mutation.isLoading}
            onClick={() => mutation.mutate("COMPLETED")}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateOrderModal;

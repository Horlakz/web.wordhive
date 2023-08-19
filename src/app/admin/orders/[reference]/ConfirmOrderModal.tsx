import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { FC } from "react";

export interface ConfirmOrderModalProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
  mutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    string,
    unknown
  >;
}

const ConfirmOrderModal: FC<ConfirmOrderModalProps> = ({
  modal,
  setModal,
  mutation,
}) => {
  return (
    <Modal visibility={modal} setVisibility={() => setModal(false)}>
      <div className="flex flex-col items-center justify-center space-y-4 w-[30rem] p-10">
        <h2 className="text-xl text-admin-primary font-semibold">
          Confirm Order
        </h2>

        <p className="text-center text-dark-600">
          Order will be marked as&nbsp;
          <span className="font-semibold">work in progress</span>&nbsp;and the
          user will receive a notification that the order has been confirmed and
          work is in progress
        </p>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            colorScheme="danger"
            onClick={() => setModal(false)}
          >
            Cancel
          </Button>
          <Button
            isLoading={mutation.isLoading}
            onClick={() => mutation.mutate("IN_PROGRESS")}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmOrderModal;

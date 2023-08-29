import { useContext } from "react";

import Button from "@/components/common/Button";
import PlusIcon from "@/components/icons/Plus";
import { FaqData } from "@/services/faq";
import { FaqContext, FormFunction } from "./context";

export function AddBtn() {
  const { setModal, setFormFunction } = useContext(FaqContext);

  return (
    <Button
      icon={<PlusIcon />}
      iconPosition="right"
      onClick={() => {
        setFormFunction(FormFunction.Create);
        setModal(true);
      }}
    >
      Add New FAQ
    </Button>
  );
}

export function UpdateBtn({ data }: { data: FaqData & { uuid: string } }) {
  const { setModal, setForm, setFormFunction, setId } = useContext(FaqContext);

  return (
    <Button
      onClick={() => {
        setForm({ question: data.question, answer: data.answer });
        setId(data.uuid);
        setModal(true);
        setFormFunction(FormFunction.Update);
      }}
    >
      Update
    </Button>
  );
}

export function DeleteBtn({ data }: { data: FaqData & { uuid: string } }) {
  const { setId, setModal, setFormFunction } = useContext(FaqContext);

  return (
    <Button
      variant="outline"
      colorScheme="danger"
      onClick={() => {
        setId(data.uuid);
        setModal(true);
        setFormFunction(FormFunction.Delete);
      }}
    >
      Delete
    </Button>
  );
}

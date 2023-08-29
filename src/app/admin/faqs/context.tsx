import { FC, createContext, useState } from "react";

import { FaqData } from "@/services/faq";
import { useFormData } from "./hook";

export enum FormFunction {
  Create = "create",
  Update = "update",
  Delete = "delete",
}

interface FaqContextType {
  formData: FaqData;
  setForm: (data: FaqData) => void;
  formFunction: FormFunction;
  setFormFunction: (formFunction: FormFunction) => void;
  id: string;
  setId: (id: string) => void;
  modal: boolean;
  setModal: (status: boolean) => void;
}

interface FaqProviderProps {
  children: React.ReactNode;
}

export const FaqContext = createContext<FaqContextType>({
  formData: { question: "", answer: "" },
  setForm: () => {},
  formFunction: FormFunction.Create,
  id: "",
  setId: () => {},
  setFormFunction: () => {},
  modal: false,
  setModal: () => {},
});

export const FaqProvider: FC<FaqProviderProps> = ({ children }) => {
  const { formData, setForm } = useFormData();
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [formFunction, setFormFunction] = useState(FormFunction.Create);

  const faqContextValue = {
    formData,
    setForm,
    formFunction,
    setFormFunction,
    id,
    setId,
    modal,
    setModal,
  };

  return (
    <FaqContext.Provider value={faqContextValue}>
      {children}
    </FaqContext.Provider>
  );
};

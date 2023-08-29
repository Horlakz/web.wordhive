import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { FaqData, FaqService } from "@/services/faq";
import { FaqContext } from "./context";

export const INITIAL_FORM_DATA: FaqData = {
  question: "",
  answer: "",
};

export function useFormData() {
  const [formData, setFormData] = useState<FaqData>(INITIAL_FORM_DATA);

  function setForm(data: FaqData) {
    setFormData((prev) => ({ ...prev, ...data }));
  }

  return { formData, setForm };
}

export function useFAQ() {
  const [search, setSearch] = useState("");
  const { formData, id, setId, setForm, setModal } = useContext(FaqContext);
  const faqService = new FaqService();

  const { data, status, refetch } = useQuery(
    ["faqs", search],
    async () => await faqService.listFaq(search)
  );

  function onSuccess(message: string) {
    refetch();
    setModal(false);
    setForm(INITIAL_FORM_DATA);
    setId("");
    toast.success(`Faq ${message} successfully`);
  }

  function onError(error: any) {
    toast.error(
      error.response.data.message ?? "An error occured while creating FAQ"
    );
  }

  const create = useMutation(async () => await faqService.createFaq(formData), {
    onSuccess: () => onSuccess("created"),
    onError,
  });

  const update = useMutation(
    async () => await faqService.updateFaq(id, formData),
    {
      onSuccess: () => onSuccess("updated"),
      onError,
    }
  );

  const remove = useMutation(async () => await faqService.deleteFaq(id), {
    onSuccess: () => onSuccess("deleted"),
    onError,
  });
  return { data, status, create, update, remove, search, setSearch };
}

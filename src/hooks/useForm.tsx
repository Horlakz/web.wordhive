import { useState, ChangeEvent } from "react";

export function useForm<T>(initialState: T) {
  const [form, setForm] = useState(initialState);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    let target = e.target;
    setForm((prevState: any) => {
      let state = { ...prevState };
      state[target.name] = target.value;
      return state;
    });
  }

  return { form, handleChange };
}

import React from "react";

interface Option {
  label: string;
  value: string;
}

interface InputProps<T = HTMLInputElement> {
  className?: string;
  label: string;
  type?: HTMLInputElement["type"];
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<T>) => void;
}

interface TextAreaProps extends Omit<InputProps<HTMLTextAreaElement>, "type"> {
  rows?: number;
}

interface SelectProps
  extends Omit<InputProps<HTMLSelectElement>, "type" | "placeholder"> {
  options: Option[];
  defaultOption?: Option;
}

function Input({
  className,
  label = "First Name",
  type = "text",
  placeholder,
  value,
  name,
  onChange,
}: InputProps) {
  const id = label.toLowerCase().replace(" ", "_");

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-dark-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name || id}
        className="bg-gray-50 border border-gray-300 text-dark-900 text-sm rounded-lg focus:ring-2 focus:ring-primary focus:outline-0 block w-full p-2.5"
        placeholder={placeholder ? placeholder : `Enter your ${label}`}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

function TextArea({
  className,
  label = "Message",
  placeholder,
  rows = 4,
  value,
  name,
  onChange,
}: TextAreaProps) {
  const id = label.toLowerCase().replace(" ", "_");

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-dark-900"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name || id}
        rows={rows}
        className="block p-2.5 w-full text-sm text-dark-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-0"
        placeholder={placeholder ? placeholder : `Enter your ${label}`}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

function Select({
  className,
  label = "Select an option",
  options,
  defaultOption,
  value,
  name,
  onChange,
}: SelectProps) {
  function ConvertLabelToDefaultOption(text: string) {
    const textToLowercase = text.toLocaleLowerCase();
    const selectIsPresent = textToLowercase.includes("select");
    const replaceText = textToLowercase.replace("select", "choose a");

    if (selectIsPresent) {
      return replaceText;
    }
    return `Choose a ${textToLowercase}`;
  }

  const id = label.toLowerCase().replace(" ", "_");

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        id={id}
        name={name || id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
        value={value}
        onChange={onChange}
      >
        <option
          defaultValue={defaultOption?.value ? defaultOption.value : ""}
          value={defaultOption?.value ? defaultOption.value : ""}
          className="capitalize"
        >
          {defaultOption?.label
            ? defaultOption.label
            : ConvertLabelToDefaultOption(label)}
        </option>
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const InputGroup = {
  Input,
  TextArea,
  Select,
};

export default InputGroup;

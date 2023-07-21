import React from "react";

interface InputProps<T = HTMLInputElement> {
  className?: string;
  label: string;
  type?: HTMLInputElement["type"];
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<T>) => void;
}

interface TextAreaProps extends Omit<InputProps<HTMLTextAreaElement>, "type"> {
  rows?: number;
}

function Input({
  className,
  label = "First Name",
  type = "text",
  placeholder,
  value,
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
        rows={rows}
        className="block p-2.5 w-full text-sm text-dark-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-0"
        placeholder={placeholder ? placeholder : `Enter your ${label}`}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

const InputGroup = {
  Input,
  TextArea,
};

export default InputGroup;

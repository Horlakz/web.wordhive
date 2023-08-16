import classNames from "classnames";
import { useEffect, useState } from "react";

export type OptionT = {
  name: string;
  uuid: string;
};

type MultipleSelectProps = {
  value: OptionT[];
  onChange: (value: OptionT[]) => void;
};

type SelectProps = {
  options: OptionT[];
} & MultipleSelectProps;

export default function MultiSelectInput({
  value,
  onChange,
  options,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  function clearOptions() {
    onChange([]);
  }

  function selectOption(option: OptionT) {
    if (value.includes(option)) {
      onChange(value.filter((o) => o !== option));
    } else {
      onChange([...value, option]);
    }
  }

  function isOptionSelected(option: OptionT) {
    return value.includes(option);
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className="relative w-full min-h-6 flex items-center gap-2 p-2 border rounded-lg"
    >
      <span className="flex gap-2 flex-grow flex-wrap">
        {value.map((v) => (
          <button
            key={v?.uuid}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(v);
            }}
            type="button"
            className="flex items-center border border-gray-400 rounded-md p-1 gap-1 cursor-pointer"
          >
            {v?.name}
            <span className="text-gray-400">&times;</span>
          </button>
        ))}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        type="button"
        className="text-gray-400 text-lg p-0 cursor-pointer"
      >
        &times;
      </button>
      <div className="bg-gray-400 self-stretch w-0.5"></div>
      <div
        style={{
          translate: "0 25%",
          border: ".25rem solid transparent",
          borderTopColor: "#777",
        }}
        // className="border border-transparent border-t border-gray-400"
      ></div>
      <ul
        className={`absolute max-h-60 overflow-y-auto border border-gray-400 rounded-md w-full left-0 top-[100%] bg-white z-10 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.uuid}
            className={classNames(
              "block",
              isOptionSelected(option) && "text-admin-primary",
              index === highlightedIndex && "bg-success"
            )}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

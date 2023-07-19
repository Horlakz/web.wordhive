"use client";

import React from "react";
import classNames from "classnames";

interface AccordionProps {
  title: string;
  descr: string;
}

function Accordion({ title, descr }: AccordionProps) {
  const [showInfo, setShowInfo] = React.useState(true);

  const handleClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="grid">
      <div
        className="flex justify-between items-center px-4 py-2 h-fit mb-4 border-gray-200 border rounded-xl cursor-pointer select-none"
        onClick={handleClick}
      >
        <h2>{title}</h2>
        <span className="text-2xl font-semibold">{showInfo ? "+" : "-"}</span>
      </div>
      <p
        className={classNames(
          showInfo
            ? "h-0 overflow-hidden default-transition"
            : "h-fit default-transition",
          "px-6"
        )}
      >
        {descr}
      </p>
    </div>
  );
}

export default Accordion;

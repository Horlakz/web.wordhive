import React from "react";

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="rounded-md px-6 py-2.5 bg-primary text-white ">
      {children}
    </button>
  );
};

export default Button;

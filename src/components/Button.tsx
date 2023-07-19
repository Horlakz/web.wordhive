import React from "react";
import { twMerge } from "tailwind-merge";

type Variant = "solid" | "outline";
type ColorScheme =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  variant?: Variant;
  colorScheme?: ColorScheme;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  iconPosition = "left",
  className,
  variant = "solid",
  colorScheme = "primary",
  onClick,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return `border-2 border-${colorScheme} text-${colorScheme} bg-transparent`;
      default:
        return `bg-${colorScheme} text-white`;
    }
  };

  return (
    <button
      className={twMerge(
        "rounded-md px-6 py-2.5 flex items-center",
        getVariantClasses(),
        className
      )}
      onClick={onClick}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;

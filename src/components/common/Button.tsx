import React from "react";
import { twMerge } from "tailwind-merge";

import Spinner from "./Spinner";

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
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  iconPosition = "left",
  className,
  variant = "solid",
  colorScheme = "primary",
  onClick,
  disabled = false,
  isLoading,
  icon,
}) => {
  const isIcon = isLoading ? <Spinner /> : icon;

  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return `border-2 border-${colorScheme} text-${colorScheme} bg-transparent default-transition`;
      default:
        return `bg-${colorScheme} text-white hover:bg-opacity-80 default-transition`;
    }
  };

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={twMerge(
        "rounded-md px-6 py-2.5 flex items-center disabled:cursor-not-allowed disabled:bg-gray-400",
        getVariantClasses(),
        className
      )}
      onClick={onClick}
    >
      {isIcon && iconPosition === "left" && (
        <span className="mr-2">{isIcon}</span>
      )}
      {children}
      {isIcon && iconPosition === "right" && (
        <span className="ml-2">{isIcon}</span>
      )}
    </button>
  );
};

export default Button;

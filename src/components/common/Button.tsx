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
  href?: string;
}

const colorSchemeSolidClasses: Record<ColorScheme, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  success: "bg-success",
  danger: "bg-danger",
  warning: "bg-warning",
  info: "bg-info",
};

const colorSchemeOutlineClasses: Record<ColorScheme, string> = {
  primary: "text-primary border-primary",
  secondary: "text-secondary border-secondary",
  success: "text-success border-success",
  danger: "text-danger border-danger",
  warning: "text-warning border-warning",
  info: "text-info border-info",
};

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
  href,
}) => {
  const isIcon = isLoading ? <Spinner /> : icon;

  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return `border-2 ${colorSchemeOutlineClasses[colorScheme]} bg-transparent default-transition`;
      default:
        return `${colorSchemeSolidClasses[colorScheme]} text-white hover:bg-opacity-80 default-transition`;
    }
  };

  const elementClassName = twMerge(
    "rounded-md px-6 py-1.5 flex items-center disabled:cursor-not-allowed disabled:bg-gray-400",
    href && "w-fit",
    getVariantClasses(),
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={elementClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={elementClassName}
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

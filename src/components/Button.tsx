
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "neu";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  icon,
  iconPosition = "left",
}: ButtonProps) => {
  const variants = {
    primary:
      "bg-neuch-800 text-white hover:bg-neuch-700 focus:ring-neuch-500",
    secondary:
      "bg-neuch-100 text-neuch-800 hover:bg-neuch-200 focus:ring-neuch-300",
    outline:
      "bg-transparent border border-neuch-300 text-neuch-800 hover:bg-neuch-50 focus:ring-neuch-200",
    ghost:
      "bg-transparent text-neuch-800 hover:bg-neuch-100 focus:ring-neuch-200",
    neu: "neu-button text-neuch-800",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 rounded",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-6 py-3 rounded-lg",
  };

  const variantClass = variants[variant];
  const sizeClass = sizes[size];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantClass} ${sizeClass} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <span className={`flex items-center justify-center gap-2`}>
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </span>
    </motion.button>
  );
};

export default Button;

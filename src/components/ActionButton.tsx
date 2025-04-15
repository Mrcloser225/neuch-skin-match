
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const ActionButton = ({
  icon,
  label,
  onClick,
  className = "",
  disabled = false,
}: ActionButtonProps) => {
  return (
    <motion.button
      className={`flex flex-col items-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      disabled={disabled}
    >
      <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-neuch-100 shadow-subtle ${disabled ? 'bg-opacity-70' : ''}`}>
        {icon}
      </div>
      <span className="text-xs text-neuch-700">{label}</span>
    </motion.button>
  );
};

export default ActionButton;

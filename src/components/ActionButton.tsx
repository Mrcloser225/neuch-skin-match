
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

const ActionButton = ({
  icon,
  label,
  onClick,
  className = "",
}: ActionButtonProps) => {
  return (
    <motion.button
      className={`flex flex-col items-center gap-2 ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neuch-100 shadow-subtle">
        {icon}
      </div>
      <span className="text-xs text-neuch-700">{label}</span>
    </motion.button>
  );
};

export default ActionButton;

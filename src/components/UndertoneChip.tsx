
import { motion } from "framer-motion";

type UndertoneType = "warm" | "cool" | "neutral";

interface UndertoneChipProps {
  type: UndertoneType;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
}

const UndertoneChip = ({
  type,
  className = "",
  selected = false,
  onClick,
}: UndertoneChipProps) => {
  const colors = {
    warm: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      selectedBg: "bg-amber-100",
    },
    cool: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      selectedBg: "bg-blue-100",
    },
    neutral: {
      bg: "bg-gray-50",
      border: "border-gray-200",
      text: "text-gray-800",
      selectedBg: "bg-gray-100",
    },
  };

  const labels = {
    warm: "Warm",
    cool: "Cool",
    neutral: "Neutral",
  };

  const color = colors[type];

  return (
    <motion.div
      className={`px-3 py-1.5 rounded-full border ${color.border} ${
        selected ? color.selectedBg : color.bg
      } ${color.text} text-sm font-medium ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      whileHover={onClick ? { scale: 1.03 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      animate={{ scale: selected ? 1.05 : 1 }}
    >
      {labels[type]}
    </motion.div>
  );
};

export default UndertoneChip;


import { motion } from "framer-motion";

interface ShadeCardProps {
  brand: string;
  name: string;
  shade: string;
  color: string;
  match: number;
  onClick?: () => void;
}

const ShadeCard = ({
  brand,
  name,
  shade,
  color,
  match,
  onClick,
}: ShadeCardProps) => {
  return (
    <motion.div
      className="relative overflow-hidden bg-white rounded-xl shadow-subtle cursor-pointer"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div
        className="h-20 w-full"
        style={{ backgroundColor: color }}
      />
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-neuch-900">{brand}</h3>
            <p className="text-sm text-neuch-600">{name}</p>
            <p className="text-xs text-neuch-500 mt-1">{shade}</p>
          </div>
          <div className="flex items-center bg-neuch-100 px-2 py-1 rounded-full text-xs font-medium">
            {match}% match
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShadeCard;

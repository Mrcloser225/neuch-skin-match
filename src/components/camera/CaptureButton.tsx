
import { motion } from "framer-motion";

interface CaptureButtonProps {
  onCapture: () => void;
}

const CaptureButton = ({ onCapture }: CaptureButtonProps) => {
  return (
    <motion.button
      className="w-16 h-16 rounded-full border-4 border-white bg-white/20 backdrop-blur-sm"
      onClick={onCapture}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
    />
  );
};

export default CaptureButton;

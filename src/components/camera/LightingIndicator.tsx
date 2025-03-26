
import { Sun, CloudSun, Moon } from "lucide-react";
import { motion } from "framer-motion";

interface LightingIndicatorProps {
  lightingQuality: "good" | "medium" | "poor" | null;
}

const LightingIndicator = ({ lightingQuality }: LightingIndicatorProps) => {
  if (!lightingQuality) return null;

  const getLightingIcon = () => {
    switch (lightingQuality) {
      case "good": return <Sun size={20} className="text-green-500" />;
      case "medium": return <CloudSun size={20} className="text-amber-500" />;
      case "poor": return <Moon size={20} className="text-red-500" />;
      default: return null;
    }
  };

  const getLightingMessage = () => {
    switch (lightingQuality) {
      case "good": return "Great lighting! Ready to capture.";
      case "medium": return "Decent lighting. Try to find more natural light.";
      case "poor": return "Poor lighting. Move to a brighter area for best results.";
      default: return "Assessing lighting...";
    }
  };

  return (
    <motion.div 
      className="absolute top-16 left-0 right-0 flex items-center justify-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-black/50 text-white px-4 py-2 rounded-full flex items-center gap-2">
        {getLightingIcon()}
        <span className="text-sm">{getLightingMessage()}</span>
      </div>
    </motion.div>
  );
};

export default LightingIndicator;

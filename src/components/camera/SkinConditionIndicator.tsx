
import { AlertCircle } from "lucide-react";

interface SkinConditionIndicatorProps {
  skinCondition: string | null;
}

const SkinConditionIndicator = ({ skinCondition }: SkinConditionIndicatorProps) => {
  if (!skinCondition) return null;
  
  return (
    <div className="absolute left-4 top-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5">
      <AlertCircle size={14} />
      <span>Analyzing for {skinCondition} skin</span>
    </div>
  );
};

export default SkinConditionIndicator;

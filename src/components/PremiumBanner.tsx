
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumBannerProps {
  onUpgrade: () => void;
}

const PremiumBanner = ({ onUpgrade }: PremiumBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 mb-6 border border-amber-200">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={18} className="text-amber-500" />
        <h3 className="font-medium text-neuch-900">Unlock Premium Features</h3>
      </div>
      <p className="text-sm text-neuch-700 mb-3">
        Get access to premium brands like Fenty Beauty, Charlotte Tilbury, and Giorgio Armani. 
        Advanced matching algorithms, confidence scoring, and detailed matching reasons included.
      </p>
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-neuch-600">
        <div>• Premium brands (12+ options)</div>
        <div>• Advanced matching algorithms</div>
        <div>• Confidence scoring</div>
        <div>• Save and compare results</div>
      </div>
      <Button 
        onClick={onUpgrade} 
        className="w-full bg-amber-500 hover:bg-amber-600"
      >
        Upgrade to Premium
      </Button>
    </div>
  );
};

export default PremiumBanner;

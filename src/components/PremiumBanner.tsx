
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumBannerProps {
  onUpgrade: () => void;
}

const PremiumBanner = ({ onUpgrade }: PremiumBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 mb-2 border border-amber-200">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={18} className="text-amber-500" />
        <h3 className="font-medium text-neuch-900">Unlock Premium Features</h3>
      </div>
      <p className="text-sm text-neuch-700 mb-3">
        Get unlimited access to all makeup recommendations, personalized shade matching, 
        shopping links, and exclusive beauty content.
      </p>
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

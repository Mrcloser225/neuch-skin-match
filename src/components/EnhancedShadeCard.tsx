
import { motion } from "framer-motion";
import { Heart, Star, ShoppingBag, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface EnhancedShadeCardProps {
  brand: string;
  name: string;
  shade: string;
  color: string;
  match: number;
  confidence?: number;
  reasons?: string[];
  isPremium?: boolean;
  onClick?: () => void;
  onShop?: () => void;
  className?: string;
}

const EnhancedShadeCard = ({
  brand,
  name,
  shade,
  color,
  match,
  confidence,
  reasons = [],
  isPremium = false,
  onClick,
  onShop,
  className = "",
}: EnhancedShadeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-blue-600 bg-blue-100";
    if (score >= 70) return "text-amber-600 bg-amber-100";
    return "text-gray-600 bg-gray-100";
  };

  const getMatchLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Great";
    if (score >= 70) return "Good";
    return "Fair";
  };

  return (
    <motion.div
      className={`bg-white rounded-xl border border-neuch-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="aspect-square relative p-4 bg-gradient-to-br from-neuch-50 to-neuch-100">
        <div
          className="w-full h-full rounded-lg border-2 border-white shadow-sm"
          style={{ backgroundColor: color }}
        />
        
        {isPremium && (
          <Badge className="absolute top-2 right-2 bg-amber-500 text-white text-xs">
            Premium
          </Badge>
        )}
        
        <div className="absolute bottom-2 left-2 right-2">
          <Badge className={`${getMatchColor(match)} text-xs font-medium`}>
            {match}% {getMatchLabel(match)}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-medium text-sm text-neuch-900 truncate">{brand}</h3>
          <p className="text-xs text-neuch-600 truncate">{name}</p>
          <p className="text-xs font-medium text-neuch-800">{shade}</p>
        </div>

        {isPremium && confidence && (
          <div className="mb-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-neuch-600">Confidence</span>
              <div className="flex items-center gap-1">
                <TrendingUp size={10} className="text-green-500" />
                <span className="text-xs font-medium">{confidence}%</span>
              </div>
            </div>
            
            {reasons.length > 0 && (
              <div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  {isExpanded ? 'Hide' : 'Show'} match details
                </button>
                
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 space-y-1"
                  >
                    {reasons.slice(0, 2).map((reason, index) => (
                      <div key={index} className="flex items-start gap-1">
                        <Star className="text-amber-500 mt-0.5" size={8} />
                        <span className="text-xs text-neuch-700">{reason}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          {onClick && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClick}
              className="flex-1 text-xs"
              disabled={!isPremium}
            >
              <Heart size={12} className="mr-1" />
              Save
            </Button>
          )}
          
          {onShop && (
            <Button
              size="sm"
              onClick={onShop}
              className="flex-1 text-xs"
              disabled={!isPremium}
            >
              <ShoppingBag size={12} className="mr-1" />
              Shop
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedShadeCard;

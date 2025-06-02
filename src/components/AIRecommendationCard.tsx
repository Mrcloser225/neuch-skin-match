
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Sparkles, Leaf, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { AIRecommendation, getPricePointLabel, getPricePointColor } from "@/services/aiRecommendations";

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
  isPremium: boolean;
  onSave?: () => void;
  onShop?: () => void;
  className?: string;
}

const AIRecommendationCard = ({
  recommendation,
  isPremium,
  onSave,
  onShop,
  className = "",
}: AIRecommendationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getMatchColor = (score: number) => {
    if (score >= 95) return "text-emerald-600 bg-emerald-100";
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 85) return "text-blue-600 bg-blue-100";
    return "text-amber-600 bg-amber-100";
  };

  const getMatchLabel = (score: number) => {
    if (score >= 95) return "Perfect";
    if (score >= 90) return "Excellent";
    if (score >= 85) return "Great";
    return "Good";
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
          style={{ backgroundColor: recommendation.color }}
        />
        
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs">
            <Sparkles size={10} className="mr-1" />
            AI Pick
          </Badge>
          {recommendation.specialFeatures.includes('Clean ingredients') && (
            <Badge className="bg-green-500 text-white text-xs">
              <Leaf size={10} className="mr-1" />
              Clean
            </Badge>
          )}
        </div>
        
        <div className="absolute bottom-2 left-2 right-2 flex gap-2">
          <Badge className={`${getMatchColor(recommendation.match)} text-xs font-medium flex-1`}>
            {recommendation.match}% {getMatchLabel(recommendation.match)}
          </Badge>
          <Badge className={`${getPricePointColor(recommendation.pricePoint)} text-xs`}>
            {getPricePointLabel(recommendation.pricePoint)}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-medium text-sm text-neuch-900 truncate">{recommendation.brand}</h3>
          <p className="text-xs text-neuch-600 truncate">{recommendation.productName}</p>
          <p className="text-xs font-medium text-neuch-800">{recommendation.shade}</p>
        </div>

        {isPremium && (
          <div className="mb-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-neuch-600">AI Confidence</span>
              <div className="flex items-center gap-1">
                <Award size={10} className="text-purple-500" />
                <span className="text-xs font-medium">{recommendation.confidence}%</span>
              </div>
            </div>
            
            <div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-purple-600 hover:text-purple-700 font-medium"
              >
                {isExpanded ? 'Hide' : 'Show'} AI insights
              </button>
              
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 space-y-1"
                >
                  {recommendation.reasons.slice(0, 2).map((reason, index) => (
                    <div key={index} className="flex items-start gap-1">
                      <Star className="text-purple-500 mt-0.5" size={8} />
                      <span className="text-xs text-neuch-700">{reason}</span>
                    </div>
                  ))}
                  {recommendation.specialFeatures.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {recommendation.specialFeatures.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {onSave && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
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
              className="flex-1 text-xs bg-purple-600 hover:bg-purple-700"
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

export default AIRecommendationCard;

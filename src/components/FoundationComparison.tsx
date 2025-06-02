
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingBag, X, Plus } from "lucide-react";
import { PremiumRecommendation } from "@/services/premiumRecommendations";
import { getShoppingUrl } from "@/services/premiumRecommendations";

interface FoundationComparisonProps {
  recommendations: PremiumRecommendation[];
  onAddToComparison: (recommendation: PremiumRecommendation) => void;
  onRemoveFromComparison: (id: string) => void;
  comparedItems: PremiumRecommendation[];
}

const FoundationComparison = ({ 
  recommendations, 
  onAddToComparison, 
  onRemoveFromComparison,
  comparedItems 
}: FoundationComparisonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleShop = (brand: string, shade: string) => {
    const url = getShoppingUrl(brand, shade);
    window.open(url, '_blank');
  };

  if (comparedItems.length === 0) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="text-amber-500" size={20} />
            Foundation Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neuch-600 text-sm mb-4">
            Add foundations to compare their matches, formulations, and find the perfect one for you.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {recommendations.slice(0, 4).map((rec) => (
              <div key={rec.foundation.id} className="border rounded-lg p-3 bg-neuch-50">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: rec.foundation.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs truncate">{rec.foundation.brand}</p>
                    <p className="text-xs text-neuch-600 truncate">{rec.foundation.shade}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAddToComparison(rec)}
                  className="w-full text-xs"
                >
                  <Plus size={12} className="mr-1" />
                  Compare
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="text-amber-500" size={20} />
            Comparing {comparedItems.length} Foundations
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-4 ${isExpanded ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {comparedItems.map((rec) => (
            <div key={rec.foundation.id} className="border rounded-lg p-4 bg-white relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFromComparison(rec.foundation.id)}
                className="absolute top-2 right-2 h-6 w-6 p-0"
              >
                <X size={12} />
              </Button>
              
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded border-2 border-neuch-200"
                  style={{ backgroundColor: rec.foundation.color }}
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{rec.foundation.brand}</h4>
                  <p className="text-xs text-neuch-600">{rec.foundation.name}</p>
                  <p className="text-xs font-medium">{rec.foundation.shade}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-neuch-600">Match Score</span>
                  <Badge variant={rec.match >= 80 ? "default" : rec.match >= 60 ? "secondary" : "outline"}>
                    {rec.match}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-neuch-600">Confidence</span>
                  <span className="text-xs font-medium">{rec.confidence}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-neuch-600">Undertone</span>
                  <span className="text-xs capitalize">{rec.foundation.undertone}</span>
                </div>
              </div>

              {isExpanded && (
                <div className="mb-4">
                  <p className="text-xs text-neuch-600 mb-2">Why this matches:</p>
                  <ul className="space-y-1">
                    {rec.reasons.slice(0, 3).map((reason, index) => (
                      <li key={index} className="text-xs text-neuch-700 flex items-start gap-1">
                        <span className="text-green-500 mt-0.5">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                size="sm"
                onClick={() => handleShop(rec.foundation.brand, rec.foundation.shade)}
                className="w-full text-xs"
              >
                <ShoppingBag size={12} className="mr-1" />
                Shop Now
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FoundationComparison;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Trash2, Star } from "lucide-react";
import { useSkin } from "@/contexts/SkinContext";
import { getShoppingUrl } from "@/services/premiumRecommendations";

const SavedFoundations = () => {
  const { savedFoundations, removeSavedFoundation } = useSkin();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleShop = (brand: string, shade: string) => {
    const url = getShoppingUrl(brand, shade);
    window.open(url, '_blank');
  };

  const handleRemove = (brand: string, shade: string) => {
    removeSavedFoundation({ brand, shade });
  };

  if (savedFoundations.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Heart className="mx-auto mb-3 text-neuch-400" size={32} />
          <h3 className="font-medium text-neuch-900 mb-2">No Saved Foundations</h3>
          <p className="text-sm text-neuch-600">
            Save your favorite foundation matches to access them anytime
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Heart className="text-red-500" size={20} />
        <h2 className="text-lg font-medium">Saved Foundations ({savedFoundations.length})</h2>
      </div>
      
      {savedFoundations.map((foundation, index) => (
        <Card key={`${foundation.brand}-${foundation.shade}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded border border-amber-300 flex items-center justify-center">
                  <Star className="text-amber-600" size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{foundation.brand}</h4>
                  <p className="text-xs text-neuch-600">{foundation.shade}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    Saved {new Date().toLocaleDateString()}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShop(foundation.brand, foundation.shade)}
                >
                  <ShoppingBag size={12} className="mr-1" />
                  Shop
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemove(foundation.brand, foundation.shade)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={12} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SavedFoundations;


import { Check, Star, Sparkles, ShoppingBag, Heart, Download, GitCompare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PremiumFeaturesListProps {
  userTier: string;
  compact?: boolean;
}

const PremiumFeaturesList = ({ userTier, compact = false }: PremiumFeaturesListProps) => {
  const isPremium = userTier === "premium" || userTier === "lifetime";

  const premiumFeatures = [
    {
      icon: <Sparkles className="text-amber-500" size={16} />,
      title: "Unlimited Skin Scans",
      description: "Scan your skin as many times as you want",
      enabled: isPremium
    },
    {
      icon: <Star className="text-amber-500" size={16} />,
      title: "Premium Brand Recommendations",
      description: "Access to Fenty Beauty, Charlotte Tilbury, Giorgio Armani, and more",
      enabled: isPremium
    },
    {
      icon: <GitCompare className="text-blue-500" size={16} />,
      title: "Advanced Matching Algorithm",
      description: "AI-powered confidence scoring and detailed matching reasons",
      enabled: isPremium
    },
    {
      icon: <Heart className="text-red-500" size={16} />,
      title: "Save & Compare Results",
      description: "Save your favorite foundations and compare multiple options",
      enabled: isPremium
    },
    {
      icon: <ShoppingBag className="text-green-500" size={16} />,
      title: "Direct Shopping Links",
      description: "One-click access to purchase recommended products",
      enabled: isPremium
    },
    {
      icon: <Download className="text-purple-500" size={16} />,
      title: "Export Reports",
      description: "Download detailed analysis reports (Lifetime members)",
      enabled: userTier === "lifetime"
    }
  ];

  if (compact) {
    return (
      <div className="space-y-2">
        {premiumFeatures.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            {feature.enabled ? (
              <Check className="text-green-500" size={14} />
            ) : (
              <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm" />
            )}
            <span className={`text-sm ${feature.enabled ? 'text-neuch-900' : 'text-neuch-500'}`}>
              {feature.title}
            </span>
            {feature.enabled && (
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                Active
              </Badge>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-amber-500" size={20} />
          Your Premium Features
          {isPremium && (
            <Badge className="bg-amber-500 text-white">
              {userTier === 'lifetime' ? 'LIFETIME' : 'PREMIUM'}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-neuch-50">
              <div className="mt-0.5">{feature.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-medium text-sm ${feature.enabled ? 'text-neuch-900' : 'text-neuch-500'}`}>
                    {feature.title}
                  </h4>
                  {feature.enabled ? (
                    <Check className="text-green-500" size={14} />
                  ) : (
                    <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm" />
                  )}
                </div>
                <p className={`text-xs ${feature.enabled ? 'text-neuch-700' : 'text-neuch-500'}`}>
                  {feature.description}
                </p>
                {feature.enabled && (
                  <Badge variant="outline" className="text-xs mt-1 bg-green-50 text-green-700 border-green-200">
                    Available
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumFeaturesList;

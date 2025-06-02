
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
      icon: <Sparkles className="text-neuch-600" size={20} />,
      title: "Unlimited Skin Scans",
      description: "Scan your skin as many times as you want",
      enabled: isPremium
    },
    {
      icon: <Star className="text-neuch-600" size={20} />,
      title: "Premium Brand Recommendations",
      description: "Access to Fenty Beauty, Charlotte Tilbury, Giorgio Armani, and more",
      enabled: isPremium
    },
    {
      icon: <GitCompare className="text-neuch-600" size={20} />,
      title: "Advanced Matching Algorithm",
      description: "AI-powered confidence scoring and detailed matching reasons",
      enabled: isPremium
    },
    {
      icon: <Heart className="text-red-500" size={20} />,
      title: "Save & Compare Results",
      description: "Save your favorite foundations and compare multiple options",
      enabled: isPremium
    },
    {
      icon: <ShoppingBag className="text-green-600" size={20} />,
      title: "Direct Shopping Links",
      description: "One-click access to purchase recommended products",
      enabled: isPremium
    },
    {
      icon: <Download className="text-neuch-600" size={20} />,
      title: "Export Reports",
      description: "Download detailed analysis reports (Lifetime members)",
      enabled: userTier === "lifetime"
    }
  ];

  if (compact) {
    return (
      <div className="space-y-3">
        {premiumFeatures.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-neuch-50 rounded-lg">
            {feature.enabled ? (
              <Check className="text-green-600" size={16} />
            ) : (
              <div className="w-4 h-4 border border-neuch-300 rounded-sm" />
            )}
            <span className={`text-sm font-medium ${feature.enabled ? 'text-neuch-900' : 'text-neuch-500'}`}>
              {feature.title}
            </span>
            {feature.enabled && (
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300 ml-auto">
                Active
              </Badge>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-neuch-900">
          <Sparkles className="text-neuch-600" size={24} />
          Your Premium Features
          {isPremium && (
            <Badge className="bg-neuch-800 text-white ml-auto">
              {userTier === 'lifetime' ? 'LIFETIME' : 'PREMIUM'}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-4">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-neuch-50 border border-neuch-100">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm mt-1">
                {feature.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className={`font-semibold ${feature.enabled ? 'text-neuch-900' : 'text-neuch-500'}`}>
                    {feature.title}
                  </h4>
                  {feature.enabled ? (
                    <Check className="text-green-600" size={16} />
                  ) : (
                    <div className="w-4 h-4 border border-neuch-300 rounded-sm" />
                  )}
                </div>
                <p className={`text-sm ${feature.enabled ? 'text-neuch-700' : 'text-neuch-500'}`}>
                  {feature.description}
                </p>
                {feature.enabled && (
                  <Badge variant="outline" className="text-xs mt-2 bg-green-50 text-green-700 border-green-300">
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

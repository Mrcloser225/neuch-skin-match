
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Heart, ShoppingBag, Download, Settings, Sparkles } from "lucide-react";

import PageTransition from "@/components/PageTransition";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import PremiumFeaturesList from "@/components/PremiumFeaturesList";
import SubscriptionManager from "@/components/SubscriptionManager";
import { useSkin } from "@/contexts/SkinContext";
import { useAuth } from "@/contexts/AuthContext";

const PremiumDashboard = () => {
  const navigate = useNavigate();
  const { subscriptionTier, savedFoundations } = useSkin();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  const isPremium = subscriptionTier === "premium" || subscriptionTier === "lifetime";

  if (!isPremium) {
    navigate("/pricing");
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-amber-100">
        <header className="p-6 flex items-center border-b border-amber-200">
          <BackButton to="/results" />
          <Logo className="mx-auto" />
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Crown className="text-amber-500" size={24} />
                <h1 className="text-3xl font-bold text-neuch-900">Premium Dashboard</h1>
              </div>
              <p className="text-neuch-600">
                Welcome to your premium experience! You now have access to all advanced features.
              </p>
              <Badge className="mt-2 bg-amber-500 text-white">
                {subscriptionTier === 'lifetime' ? 'LIFETIME MEMBER' : 'PREMIUM MEMBER'}
              </Badge>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-amber-200">
                <CardContent className="p-4 text-center">
                  <Sparkles className="text-amber-500 mx-auto mb-2" size={24} />
                  <h3 className="font-medium mb-1">Unlimited Scans</h3>
                  <p className="text-xs text-neuch-600 mb-3">
                    Scan your skin as many times as you want
                  </p>
                  <Button 
                    size="sm" 
                    onClick={() => navigate("/camera")}
                    className="w-full bg-amber-500 hover:bg-amber-600"
                  >
                    Start New Scan
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-4 text-center">
                  <Heart className="text-red-500 mx-auto mb-2" size={24} />
                  <h3 className="font-medium mb-1">Saved Foundations</h3>
                  <p className="text-xs text-neuch-600 mb-3">
                    {savedFoundations.length} foundations saved
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate("/saved-foundations")}
                    className="w-full"
                  >
                    View Saved
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardContent className="p-4 text-center">
                  <ShoppingBag className="text-green-500 mx-auto mb-2" size={24} />
                  <h3 className="font-medium mb-1">Premium Brands</h3>
                  <p className="text-xs text-neuch-600 mb-3">
                    Access to 12+ premium brands
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate("/results")}
                    className="w-full"
                  >
                    View Results
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Premium Features List */}
            <PremiumFeaturesList userTier={subscriptionTier} />

            {/* Subscription Management */}
            <div className="flex justify-center">
              <SubscriptionManager />
            </div>

            {/* Additional Actions */}
            <div className="text-center space-y-3">
              <h3 className="font-medium text-neuch-900">Need Help?</h3>
              <div className="flex justify-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/terms")}
                >
                  Terms of Service
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/privacy")}
                >
                  Privacy Policy
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default PremiumDashboard;

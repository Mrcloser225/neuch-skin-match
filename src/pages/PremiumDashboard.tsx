
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Heart, ShoppingBag, Settings, Sparkles } from "lucide-react";

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
      <div className="min-h-screen flex flex-col bg-white">
        <header className="p-6 flex items-center border-b border-neuch-200 bg-white">
          <BackButton to="/results" />
          <Logo className="mx-auto" />
        </header>

        <main className="flex-1 p-6 bg-neuch-50">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="text-center bg-white rounded-2xl p-8 shadow-subtle">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="text-neuch-600" size={28} />
                <h1 className="text-3xl font-bold text-neuch-900">Premium Dashboard</h1>
              </div>
              <p className="text-neuch-600 text-lg mb-4">
                Welcome to your premium experience! You now have access to all advanced features.
              </p>
              <Badge className="bg-neuch-800 text-white px-4 py-2">
                {subscriptionTier === 'lifetime' ? 'LIFETIME MEMBER' : 'PREMIUM MEMBER'}
              </Badge>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white border-neuch-200 shadow-subtle hover:shadow-elevated transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-neuch-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="text-neuch-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-neuch-900 mb-2">Unlimited Scans</h3>
                  <p className="text-sm text-neuch-600 mb-4">
                    Scan your skin as many times as you want
                  </p>
                  <Button 
                    size="sm" 
                    onClick={() => navigate("/camera")}
                    className="w-full bg-neuch-800 hover:bg-neuch-700 text-white"
                  >
                    Start New Scan
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-neuch-200 shadow-subtle hover:shadow-elevated transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="text-red-500" size={24} />
                  </div>
                  <h3 className="font-semibold text-neuch-900 mb-2">Saved Foundations</h3>
                  <p className="text-sm text-neuch-600 mb-4">
                    {savedFoundations.length} foundations saved
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate("/saved-foundations")}
                    className="w-full border-neuch-300 text-neuch-700 hover:bg-neuch-50"
                  >
                    View Saved
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-neuch-200 shadow-subtle hover:shadow-elevated transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="text-green-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-neuch-900 mb-2">Premium Brands</h3>
                  <p className="text-sm text-neuch-600 mb-4">
                    Access to 12+ premium brands
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate("/results")}
                    className="w-full border-neuch-300 text-neuch-700 hover:bg-neuch-50"
                  >
                    View Results
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Premium Features List */}
            <div className="bg-white rounded-2xl shadow-subtle">
              <PremiumFeaturesList userTier={subscriptionTier} />
            </div>

            {/* Subscription Management */}
            <div className="bg-white rounded-2xl p-6 shadow-subtle">
              <div className="flex justify-center">
                <SubscriptionManager />
              </div>
            </div>

            {/* Additional Actions */}
            <div className="text-center bg-white rounded-2xl p-6 shadow-subtle">
              <h3 className="font-semibold text-neuch-900 mb-4">Need Help?</h3>
              <div className="flex justify-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/terms")}
                  className="border-neuch-300 text-neuch-700 hover:bg-neuch-50"
                >
                  Terms of Service
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/privacy")}
                  className="border-neuch-300 text-neuch-700 hover:bg-neuch-50"
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

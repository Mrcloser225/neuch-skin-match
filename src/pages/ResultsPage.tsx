import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, RefreshCw, Share2, ShoppingBag, Lock, Star, BookOpen, Download, BarChart3 } from "lucide-react";

import PageTransition from "@/components/PageTransition";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import ShadeCard from "@/components/ShadeCard";
import ActionButton from "@/components/ActionButton";
import UndertoneChip from "@/components/UndertoneChip";
import FoundationComparison from "@/components/FoundationComparison";
import { useSkin } from "@/contexts/SkinContext";
import { useAuth } from "@/contexts/AuthContext";
import { getPremiumRecommendations, PremiumRecommendation, getShoppingUrl } from "@/services/premiumRecommendations";
import PremiumBanner from "@/components/PremiumBanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const ResultsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { undertone, skinTone, capturedImage, subscriptionTier, addSavedFoundation } = useSkin();
  const { checkSubscription, isAuthenticated } = useAuth();
  const [recommendations, setRecommendations] = useState<PremiumRecommendation[]>([]);
  const [comparedFoundations, setComparedFoundations] = useState<PremiumRecommendation[]>([]);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(false);
  
  const isPremium = subscriptionTier === "premium" || subscriptionTier === "lifetime";
  const isLifetime = subscriptionTier === "lifetime";

  // Check for payment success and update subscription status
  useEffect(() => {
    const success = searchParams.get('success');
    if (success === 'true' && isAuthenticated) {
      setIsCheckingSubscription(true);
      // Wait a moment for Stripe to process, then check subscription
      setTimeout(async () => {
        try {
          await checkSubscription();
          toast({
            title: "Payment Successful!",
            description: "Your premium subscription has been activated. You now have access to all premium features!",
          });
        } catch (error) {
          console.error('Error checking subscription after payment:', error);
        } finally {
          setIsCheckingSubscription(false);
        }
      }, 2000);
    }
  }, [searchParams, isAuthenticated, checkSubscription]);

  useEffect(() => {
    if (!undertone || !skinTone) {
      navigate("/");
      return;
    }

    // Get premium recommendations
    const results = getPremiumRecommendations(undertone, skinTone, isPremium);
    setRecommendations(results);
  }, [undertone, skinTone, navigate, isPremium]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const handleNewScan = () => {
    navigate("/camera");
  };

  const handleUpgrade = () => {
    navigate("/pricing");
  };

  const handleSave = (recommendation: PremiumRecommendation) => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Saving foundations requires a premium subscription",
        variant: "destructive"
      });
      return;
    }
    
    addSavedFoundation({
      brand: recommendation.foundation.brand,
      shade: recommendation.foundation.shade
    });
    
    toast({
      title: "Foundation Saved",
      description: `${recommendation.foundation.brand} ${recommendation.foundation.shade} has been saved to your collection`,
    });
  };
  
  const handleShareResults = () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Sharing results requires a premium subscription",
        variant: "destructive"
      });
      return;
    }
    
    // Create shareable content
    const shareData = {
      title: 'My Foundation Matches',
      text: `I found my perfect foundation matches! Check out these ${recommendations.length} personalized recommendations.`,
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      toast({
        title: "Results Copied",
        description: "Your results have been copied to clipboard for sharing",
      });
    }
  };
  
  const handleShop = (recommendation: PremiumRecommendation) => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Shopping links require a premium subscription",
        variant: "destructive"
      });
      return;
    }
    
    const url = getShoppingUrl(recommendation.foundation.brand, recommendation.foundation.shade);
    window.open(url, '_blank');
  };
  
  const handleViewTutorials = () => {
    if (!isLifetime) {
      toast({
        title: "Lifetime Exclusive",
        description: "Beauty tutorials are exclusively available for Lifetime members",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Beauty Tutorials",
      description: "Loading your exclusive beauty tutorials library",
    });
  };
  
  const handleExportReport = () => {
    if (!isLifetime) {
      toast({
        title: "Lifetime Exclusive",
        description: "Detailed reports are exclusively available for Lifetime members",
        variant: "destructive"
      });
      return;
    }
    
    // Generate and download report
    const report = generateDetailedReport();
    downloadReport(report);
  };

  const generateDetailedReport = () => {
    const reportData = {
      analysis: {
        undertone,
        skinTone,
        timestamp: new Date().toISOString()
      },
      recommendations: recommendations.map(rec => ({
        brand: rec.foundation.brand,
        name: rec.foundation.name,
        shade: rec.foundation.shade,
        match: rec.match,
        confidence: rec.confidence,
        reasons: rec.reasons
      })),
      summary: {
        totalMatches: recommendations.length,
        topMatch: recommendations[0],
        averageMatch: Math.round(recommendations.reduce((sum, r) => sum + r.match, 0) / recommendations.length)
      }
    };
    return reportData;
  };

  const downloadReport = (data: any) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foundation-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Downloaded",
      description: "Your comprehensive beauty report has been downloaded",
    });
  };

  const handleAddToComparison = (recommendation: PremiumRecommendation) => {
    if (comparedFoundations.length >= 4) {
      toast({
        title: "Comparison Limit",
        description: "You can compare up to 4 foundations at once",
        variant: "destructive"
      });
      return;
    }
    setComparedFoundations(prev => [...prev, recommendation]);
  };

  const handleRemoveFromComparison = (id: string) => {
    setComparedFoundations(prev => prev.filter(item => item.foundation.id !== id));
  };

  if (!undertone || !skinTone) {
    return null;
  }

  // Display limited results for free users
  const displayedRecommendations = isPremium 
    ? recommendations 
    : recommendations.slice(0, 2);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <header className="p-6 flex items-center">
          <BackButton to="/analysis" />
          <Logo className="mx-auto" />
        </header>

        <main className="flex-1 flex flex-col p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-medium text-neuch-900">Your Perfect Matches</h1>
              {isCheckingSubscription && (
                <Badge className="bg-blue-600 text-white text-xs animate-pulse">Updating...</Badge>
              )}
              {subscriptionTier === "premium" && (
                <Badge className="bg-green-600 text-white text-xs">Premium Member</Badge>
              )}
              {subscriptionTier === "lifetime" && (
                <Badge className="bg-violet-600 text-white text-xs">Lifetime Member</Badge>
              )}
              {undertone && <UndertoneChip type={undertone} className="ml-auto" />}
            </div>

            {isPremium && (
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="text-green-600" size={16} />
                  <h3 className="text-sm font-medium text-green-900">
                    Premium Analysis Complete
                  </h3>
                </div>
                <p className="text-xs text-green-700">
                  Found {recommendations.length} personalized matches from premium brands with detailed analysis
                </p>
              </div>
            )}

            {capturedImage && (
              <div className="flex gap-4 overflow-x-auto py-2 no-scrollbar">
                <div className="h-16 w-16 flex-shrink-0 rounded-full overflow-hidden border border-neuch-200">
                  <img
                    src={capturedImage}
                    alt="Your skin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="h-16 w-16 flex-shrink-0 rounded-full border border-neuch-200"
                  style={{ backgroundColor: skinTone }}
                />
              </div>
            )}

            {!isPremium && (
              <PremiumBanner onUpgrade={() => navigate("/pricing")} />
            )}

            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {displayedRecommendations.map((recommendation) => (
                <motion.div key={recommendation.foundation.id} variants={item}>
                  <ShadeCard
                    brand={recommendation.foundation.brand}
                    name={recommendation.foundation.name}
                    shade={recommendation.foundation.shade}
                    color={recommendation.foundation.color}
                    match={recommendation.match}
                    onClick={() => handleSave(recommendation)}
                    isPremium={isPremium}
                    confidence={recommendation.confidence}
                    reasons={recommendation.reasons}
                  />
                </motion.div>
              ))}
            </motion.div>

            {!isPremium && recommendations.length > 2 && (
              <div className="mt-4">
                <div className="bg-neuch-50 rounded-lg p-4 border border-neuch-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock size={16} className="text-neuch-700" />
                    <h3 className="text-sm font-medium text-neuch-900">
                      {recommendations.length - 2} more matches available with Premium
                    </h3>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => navigate("/pricing")}
                  >
                    Upgrade to Premium
                  </Button>
                </div>
              </div>
            )}

            {isPremium && (
              <FoundationComparison
                recommendations={recommendations}
                onAddToComparison={handleAddToComparison}
                onRemoveFromComparison={handleRemoveFromComparison}
                comparedItems={comparedFoundations}
              />
            )}
            
            {isLifetime && (
              <div className="mt-4">
                <div className="bg-violet-50 rounded-lg p-4 border border-violet-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={16} className="text-violet-600" />
                    <h3 className="text-sm font-medium text-neuch-900">
                      Lifetime Exclusive Features
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <Button 
                      variant="outline"
                      className="border-violet-300 hover:bg-violet-50 flex items-center gap-2"
                      onClick={handleViewTutorials}
                    >
                      <BookOpen size={14} />
                      <span>Beauty Tutorials</span>
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-violet-300 hover:bg-violet-50 flex items-center gap-2"
                      onClick={handleExportReport}
                    >
                      <Download size={14} />
                      <span>Export Report</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <footer className="p-6 border-t border-neuch-100">
          <div className="flex justify-around">
            <ActionButton
              icon={<Heart size={18} className="text-neuch-700" />}
              label="Save"
              onClick={() => recommendations[0] && handleSave(recommendations[0])}
              disabled={!isPremium}
            />
            <ActionButton
              icon={<Share2 size={18} className="text-neuch-700" />}
              label="Share"
              onClick={handleShareResults}
              disabled={!isPremium}
            />
            <ActionButton
              icon={<ShoppingBag size={18} className="text-neuch-700" />}
              label="Shop"
              onClick={() => recommendations[0] && handleShop(recommendations[0])}
              disabled={!isPremium}
            />
            <ActionButton
              icon={<RefreshCw size={18} className="text-neuch-700" />}
              label="New Scan"
              onClick={() => navigate("/camera")}
            />
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default ResultsPage;

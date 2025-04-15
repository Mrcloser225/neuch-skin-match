
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, RefreshCw, Share2, ShoppingBag, Lock, Star, BookOpen, Download } from "lucide-react";

import PageTransition from "@/components/PageTransition";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import ShadeCard from "@/components/ShadeCard";
import ActionButton from "@/components/ActionButton";
import UndertoneChip from "@/components/UndertoneChip";
import { useSkin } from "@/contexts/SkinContext";
import { Foundation, getRecommendations } from "@/data/foundations";
import PremiumBanner from "@/components/PremiumBanner";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Recommendation {
  foundation: Foundation;
  match: number;
}

const ResultsPage = () => {
  const navigate = useNavigate();
  const { undertone, skinTone, capturedImage, subscriptionTier, addSavedFoundation } = useSkin();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const isPremium = subscriptionTier === "premium" || subscriptionTier === "lifetime";
  const isLifetime = subscriptionTier === "lifetime";

  useEffect(() => {
    if (!undertone || !skinTone) {
      navigate("/");
      return;
    }

    // Get recommendations based on undertone and skin tone
    const results = getRecommendations(undertone, skinTone);
    setRecommendations(results);
  }, [undertone, skinTone, navigate]);

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
  
  const handleSave = (recommendation: Recommendation) => {
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
    
    toast({
      title: "Share Feature",
      description: "Your results have been prepared for sharing",
    });
    // In a real app, this would open a share dialog or generate a link
  };
  
  const handleShop = () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Shopping links require a premium subscription",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Shopping Links",
      description: "Redirecting to partner stores with your matched foundations",
    });
    // In a real app, this would redirect to shopping sites
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
    // In a real app, this would navigate to a tutorials page
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
    
    toast({
      title: "Report Generated",
      description: "Your comprehensive beauty report is being prepared for download",
    });
    // In a real app, this would generate and download a PDF report
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
              {subscriptionTier === "lifetime" && (
                <Badge className="bg-violet-600 text-white text-xs">Lifetime Member</Badge>
              )}
              {undertone && <UndertoneChip type={undertone} className="ml-auto" />}
            </div>

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
              <PremiumBanner onUpgrade={handleUpgrade} />
            )}

            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {displayedRecommendations.map(({ foundation, match }) => (
                <motion.div key={foundation.id} variants={item}>
                  <ShadeCard
                    brand={foundation.brand}
                    name={foundation.name}
                    shade={foundation.shade}
                    color={foundation.color}
                    match={match}
                    onClick={() => handleSave({ foundation, match })}
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
                    onClick={handleUpgrade}
                  >
                    Upgrade to Premium
                  </Button>
                </div>
              </div>
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
              onClick={() => handleSave(recommendations[0])}
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
              onClick={handleShop}
              disabled={!isPremium}
            />
            <ActionButton
              icon={<RefreshCw size={18} className="text-neuch-700" />}
              label="New Scan"
              onClick={handleNewScan}
            />
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default ResultsPage;

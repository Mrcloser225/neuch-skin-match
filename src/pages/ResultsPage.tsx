import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Download,
  GitCompare,
  HelpCircle,
  Image,
  Loader2,
  Palette,
  SlidersHorizontal,
  User,
  Sparkles,
  Settings,
  Heart,
} from "lucide-react";

import PageTransition from "@/components/PageTransition";
import PremiumBanner from "@/components/PremiumBanner";
import EnhancedShadeCard from "@/components/EnhancedShadeCard";
import ShadeCard from "@/components/ShadeCard";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import { useSkin } from "@/contexts/SkinContext";
import { useAuth } from "@/contexts/AuthContext";
import { getRecommendations, Foundation } from "@/data/foundations";
import { getPremiumRecommendations, PremiumRecommendation, getShoppingUrl } from "@/services/premiumRecommendations";
import { getAIRecommendations, AIRecommendation } from "@/services/aiRecommendations";
import AIRecommendationCard from "@/components/AIRecommendationCard";

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { skinTone, undertone, subscriptionTier, setSkinTone, setUndertone, savedFoundations, addSavedFoundation } = useSkin();
  const { isAuthenticated, user, profile, checkSubscription } = useAuth();

  const [recommendations, setRecommendations] = useState<PremiumRecommendation[]>([]);
  const [selectedFoundation, setSelectedFoundation] = useState<Foundation | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  useEffect(() => {
    // Check URL params for success from Stripe payment
    const urlParams = new URLSearchParams(location.search);
    const paymentSuccess = urlParams.get('success');
    
    if (paymentSuccess === 'true') {
      // Payment was successful, refresh subscription status
      checkSubscription();
      toast({
        title: "Payment successful!",
        description: "Welcome to premium! You now have access to all premium features.",
      });
    }

    // Try to restore skin data from localStorage if missing (after payment flow)
    if (!skinTone || !undertone) {
      const tempData = localStorage.getItem('temp_skin_data');
      if (tempData) {
        try {
          const { skinTone: tempSkinTone, undertone: tempUndertone } = JSON.parse(tempData);
          setSkinTone(tempSkinTone);
          setUndertone(tempUndertone);
          localStorage.removeItem('temp_skin_data');
        } catch (error) {
          console.error("Error parsing temporary skin data:", error);
        }
      }
    }

    // If we still don't have skin data after trying to restore, redirect to camera
    if (!skinTone || !undertone) {
      console.log("Missing skin data, redirecting to camera page");
      navigate("/camera");
      return;
    }

    setIsLoading(true);
    const premiumStatus = subscriptionTier === "premium" || subscriptionTier === "lifetime";
    setIsPremium(premiumStatus);

    const recs = getPremiumRecommendations(undertone, skinTone, premiumStatus);
    setRecommendations(recs);
    setIsLoading(false);
  }, [skinTone, undertone, subscriptionTier, navigate, location.search, checkSubscription, setSkinTone, setUndertone]);

  // Show loading while checking for skin data
  if (!skinTone || !undertone) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-neuch-50 to-neuch-100">
          <header className="p-6 flex items-center border-b border-gray-100">
            <BackButton to="/" />
            <Logo className="mx-auto" />
          </header>
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-neuch-600">Loading your skin analysis...</p>
            </div>
          </main>
        </div>
      </PageTransition>
    );
  }

  const exportReport = () => {
    toast({
      title: "Feature coming soon",
      description: "We're working on a report export feature for lifetime members.",
    });
  };

  const handleSaveFoundation = (foundation: Foundation) => {
    if (!isPremium) {
      toast({
        title: "Premium feature",
        description: "Saving foundations is a premium feature. Please upgrade to save your results.",
        variant: "destructive"
      });
      return;
    }

    const isAlreadySaved = savedFoundations.some(
      saved => saved.brand === foundation.brand && saved.shade === foundation.shade
    );

    if (isAlreadySaved) {
      toast({
        title: "Already saved",
        description: "This foundation is already in your saved list.",
      });
      return;
    }

    addSavedFoundation({
      brand: foundation.brand,
      shade: foundation.shade
    });

    toast({
      title: "Foundation saved!",
      description: `${foundation.brand} - ${foundation.shade} has been saved to your collection.`,
    });
  };

  const handleShopFoundation = (foundation: Foundation) => {
    const url = getShoppingUrl(foundation.brand, foundation.shade);
    window.open(url, '_blank');
  };

  const loadAIRecommendations = async () => {
    if (!isPremium) {
      toast({
        title: "Premium feature",
        description: "AI-powered comprehensive recommendations are a premium feature.",
        variant: "destructive"
      });
      return;
    }

    setIsLoadingAI(true);
    try {
      const aiRecs = await getAIRecommendations(skinTone!, undertone!);
      setAiRecommendations(aiRecs);
      setShowAIRecommendations(true);
      toast({
        title: "AI recommendations loaded!",
        description: `Found ${aiRecs.length} personalized recommendations from our comprehensive database.`,
      });
    } catch (error) {
      console.error('Error loading AI recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to load AI recommendations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleSaveAIRecommendation = (recommendation: AIRecommendation) => {
    if (!isPremium) {
      toast({
        title: "Premium feature",
        description: "Saving foundations is a premium feature.",
        variant: "destructive"
      });
      return;
    }

    const isAlreadySaved = savedFoundations.some(
      saved => saved.brand === recommendation.brand && saved.shade === recommendation.shade
    );

    if (isAlreadySaved) {
      toast({
        title: "Already saved",
        description: "This foundation is already in your saved list.",
      });
      return;
    }

    addSavedFoundation({
      brand: recommendation.brand,
      shade: recommendation.shade
    });

    toast({
      title: "AI recommendation saved!",
      description: `${recommendation.brand} - ${recommendation.shade} has been saved to your collection.`,
    });
  };

  const handleShopAIRecommendation = (recommendation: AIRecommendation) => {
    // For AI recommendations, we'll do a general search since we don't have direct URLs
    const searchQuery = `${recommendation.brand} ${recommendation.productName} ${recommendation.shade}`;
    const url = `https://www.sephora.com/search?keyword=${encodeURIComponent(searchQuery)}`;
    window.open(url, '_blank');
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-neuch-50 to-neuch-100">
        <header className="p-6 flex items-center border-b border-gray-100">
          <BackButton to="/" />
          <Logo className="mx-auto" />
          {isAuthenticated && profile?.avatar_url ? (
            <a href="/profile">
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-8 h-8 rounded-full ml-auto"
              />
            </a>
          ) : (
            <a href="/profile" className="ml-auto">
              <User className="text-neuch-600" size={24} />
            </a>
          )}
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Premium Welcome Banner - Show for new premium users */}
            {isPremium && (
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                      <Sparkles className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-neuch-900">Premium Features Active</h3>
                      <p className="text-sm text-neuch-700">
                        You now have access to advanced matching, premium brands, and unlimited scans!
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/premium-dashboard")}
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    <Settings size={14} className="mr-1" />
                    Dashboard
                  </Button>
                </div>
              </div>
            )}

            {/* Results Summary */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-neuch-900 mb-3">
                Here are your personalized foundation matches
              </h1>
              <p className="text-neuch-600">
                Based on your skin tone and undertone, we've found the following
                recommendations:
              </p>
              <div className="mt-4 flex items-center justify-center gap-4">
                <Badge variant="secondary">
                  Skin Tone:{" "}
                  <span className="font-medium text-neuch-900">{skinTone}</span>
                </Badge>
                <Badge variant="secondary">
                  Undertone:{" "}
                  <span className="font-medium text-neuch-900">{undertone}</span>
                </Badge>
                {isPremium && (
                  <Badge className="bg-amber-500 text-white">
                    {subscriptionTier === 'lifetime' ? 'LIFETIME' : 'PREMIUM'}
                  </Badge>
                )}
              </div>
            </div>

            {/* AI-Powered Comprehensive Recommendations */}
            {isPremium && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Sparkles className="text-white" size={16} />
                    </div>
                    <h2 className="text-xl font-bold text-neuch-900">
                      AI-Powered Comprehensive Recommendations
                      <Badge variant="outline" className="ml-2 text-xs border-purple-500 text-purple-700">
                        PREMIUM AI
                      </Badge>
                    </h2>
                  </div>
                  
                  <Button
                    onClick={loadAIRecommendations}
                    disabled={isLoadingAI}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    {isLoadingAI ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} className="mr-1" />
                        Get AI Recommendations
                      </>
                    )}
                  </Button>
                </div>

                {!showAIRecommendations && !isLoadingAI && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-6 border border-purple-200">
                    <div className="text-center">
                      <Sparkles className="mx-auto mb-3 text-purple-500" size={32} />
                      <h3 className="font-medium text-neuch-900 mb-2">Discover Hidden Gems</h3>
                      <p className="text-sm text-neuch-700 mb-4">
                        Our AI analyzes the entire makeup market to find perfect matches beyond household names. 
                        Get personalized recommendations from niche, indie, K-beauty, and emerging brands.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-neuch-600">
                        <div>• 500+ brands analyzed</div>
                        <div>• Ingredient compatibility</div>
                        <div>• Ethical & clean options</div>
                        <div>• All price points</div>
                      </div>
                    </div>
                  </div>
                )}

                {showAIRecommendations && aiRecommendations.length > 0 && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    {aiRecommendations.map((rec, index) => (
                      <AIRecommendationCard
                        key={`${rec.brand}-${rec.shade}-${index}`}
                        recommendation={rec}
                        isPremium={isPremium}
                        onSave={() => handleSaveAIRecommendation(rec)}
                        onShop={() => handleShopAIRecommendation(rec)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Foundation Recommendations */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                    <Palette className="text-white" size={16} />
                  </div>
                  <h2 className="text-xl font-bold text-neuch-900">
                    Standard Recommendations
                    {isPremium && (
                      <Badge variant="outline" className="ml-2 text-xs border-amber-500 text-amber-700">
                        {subscriptionTier === 'lifetime' ? 'LIFETIME' : 'PREMIUM'}
                      </Badge>
                    )}
                  </h2>
                </div>
                
                {isPremium && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowComparison(!showComparison)}
                      className="border-amber-200 text-amber-700 hover:bg-amber-50"
                    >
                      <GitCompare size={14} className="mr-1" />
                      {showComparison ? 'Hide' : 'Show'} Comparison
                    </Button>
                    {subscriptionTier === 'lifetime' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={exportReport}
                        className="border-purple-200 text-purple-700 hover:bg-purple-50"
                      >
                        <Download size={14} className="mr-1" />
                        Export Report
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/saved-foundations")}
                      className="border-red-200 text-red-700 hover:bg-red-50"
                    >
                      <Heart size={14} className="mr-1" />
                      Saved ({savedFoundations.length})
                    </Button>
                  </div>
                )}
              </div>

              {!isPremium && (
                <PremiumBanner
                  onUpgrade={() => navigate("/pricing")}
                />
              )}

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {recommendations.map((rec, index) => (
                    <EnhancedShadeCard
                      key={`${rec.foundation.brand}-${rec.foundation.shade}`}
                      brand={rec.foundation.brand}
                      name={rec.foundation.name}
                      shade={rec.foundation.shade}
                      color={rec.foundation.color}
                      match={rec.match}
                      confidence={rec.confidence}
                      reasons={rec.reasons}
                      isPremium={isPremium}
                      onClick={() => handleSaveFoundation(rec.foundation)}
                      onShop={() => handleShopFoundation(rec.foundation)}
                    />
                  ))}
                </div>
              )}

              {/* Shade Comparison Section */}
              {selectedFoundation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <Card className="max-w-md w-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-neuch-900 mb-4">
                        {selectedFoundation.brand} - {selectedFoundation.name}
                      </h3>
                      <div className="flex items-center justify-center mb-4">
                        <div
                          className="w-24 h-24 rounded-full"
                          style={{ backgroundColor: selectedFoundation.color }}
                        />
                      </div>
                      <p className="text-sm text-neuch-700 mb-4">
                        This shade is recommended based on your skin analysis.
                        Here's a detailed breakdown:
                      </p>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="shade-details">
                          <AccordionTrigger>
                            <SlidersHorizontal className="mr-2 h-4 w-4" /> Shade Details
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="py-2">
                              <Label>Brand</Label>
                              <Input
                                type="text"
                                value={selectedFoundation.brand}
                                disabled
                              />
                            </div>
                            <div className="py-2">
                              <Label>Name</Label>
                              <Input
                                type="text"
                                value={selectedFoundation.name}
                                disabled
                              />
                            </div>
                            <div className="py-2">
                              <Label>Shade</Label>
                              <Input
                                type="text"
                                value={selectedFoundation.shade}
                                disabled
                              />
                            </div>
                            <div className="py-2">
                              <Label>Color</Label>
                              <div
                                className="w-full h-8 rounded"
                                style={{ backgroundColor: selectedFoundation.color }}
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="matching-algorithm">
                          <AccordionTrigger>
                            <HelpCircle className="mr-2 h-4 w-4" /> Matching Algorithm
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="py-2">
                              <p className="text-sm text-neuch-700">
                                Our advanced algorithm analyzes your skin tone and
                                undertone to find the best matches.
                              </p>
                              <ul className="list-disc pl-5 mt-2 text-sm text-neuch-700">
                                <li>Analyzes color data from your skin scan</li>
                                <li>Compares against a database of foundation shades</li>
                                <li>Scores matches based on color similarity</li>
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <Button
                        className="w-full mt-4"
                        onClick={() => setSelectedFoundation(null)}
                      >
                        Close
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default ResultsPage;

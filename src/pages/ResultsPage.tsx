
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
import { getPremiumRecommendations, PremiumRecommendation } from "@/services/premiumRecommendations";

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { skinTone, undertone, subscriptionTier } = useSkin();
  const { isAuthenticated, user, profile } = useAuth();

  const [recommendations, setRecommendations] = useState<PremiumRecommendation[]>([]);
  const [selectedFoundation, setSelectedFoundation] = useState<Foundation | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Check if we have skin data, if not redirect to camera page instead of showing error
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
  }, [skinTone, undertone, subscriptionTier, navigate]);

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
              <p className="text-neuch-600">Redirecting to skin analysis...</p>
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
              </div>
            </div>

            {/* Foundation Recommendations */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                    <Palette className="text-white" size={16} />
                  </div>
                  <h2 className="text-xl font-bold text-neuch-900">
                    Foundation Recommendations
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
                      onClick={() => setSelectedFoundation(rec.foundation)}
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

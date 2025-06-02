
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSkin } from "@/contexts/SkinContext";
import { useAuth } from "@/contexts/AuthContext";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: Array<{text: string; included: boolean; premium?: boolean}>;
  popular?: boolean;
  tier: "free" | "premium";
  badge?: string;
  billingCycleText?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Limited access with basic features",
    tier: "free",
    billingCycleText: "",
    features: [
      { text: "Basic skin tone analysis", included: true },
      { text: "One skin scan only", included: true },
      { text: "Limited foundation recommendations (2)", included: true },
      { text: "Basic undertone detection", included: false },
      { text: "Unlimited skin scans", included: false, premium: true },
      { text: "Unlimited foundation recommendations", included: false, premium: true },
      { text: "Premium brand suggestions", included: false, premium: true },
      { text: "Personalized shade matching", included: false, premium: true },
      { text: "Save and compare results", included: false, premium: true },
      { text: "Shopping links to recommended products", included: false, premium: true },
      { text: "Input existing products for better recommendations", included: false, premium: true },
      { text: "AI-powered product suggestions", included: false, premium: true },
      { text: "Priority customer support", included: false, premium: true }
    ]
  },
  {
    id: "premium-monthly",
    name: "Premium Monthly",
    price: 9.99,
    description: "Full access to all features, billed monthly",
    tier: "premium",
    billingCycleText: "/month",
    features: [
      { text: "Basic skin tone analysis", included: true },
      { text: "One skin scan only", included: false },
      { text: "Limited foundation recommendations (2)", included: false },
      { text: "Basic undertone detection", included: true },
      { text: "Unlimited skin scans", included: true, premium: true },
      { text: "Unlimited foundation recommendations", included: true, premium: true },
      { text: "Premium brand suggestions", included: true, premium: true },
      { text: "Personalized shade matching", included: true, premium: true },
      { text: "Save and compare results", included: true, premium: true },
      { text: "Shopping links to recommended products", included: true, premium: true },
      { text: "Input existing products for better recommendations", included: true, premium: true },
      { text: "AI-powered product suggestions", included: true, premium: true },
      { text: "Priority customer support", included: true, premium: true }
    ]
  },
  {
    id: "premium-yearly",
    name: "Premium Yearly",
    price: 49.99,
    description: "Full access to all features, best value, billed yearly",
    tier: "premium",
    popular: true,
    badge: "Best Value",
    billingCycleText: "/year",
    features: [
      { text: "Basic skin tone analysis", included: true },
      { text: "One skin scan only", included: false },
      { text: "Limited foundation recommendations (2)", included: false },
      { text: "Basic undertone detection", included: true },
      { text: "Unlimited skin scans", included: true, premium: true },
      { text: "Unlimited foundation recommendations", included: true, premium: true },
      { text: "Premium brand suggestions", included: true, premium: true },
      { text: "Personalized shade matching", included: true, premium: true },
      { text: "Save and compare results", included: true, premium: true },
      { text: "Shopping links to recommended products", included: true, premium: true },
      { text: "Input existing products for better recommendations", included: true, premium: true },
      { text: "AI-powered product suggestions", included: true, premium: true },
      { text: "Priority customer support", included: true, premium: true }
    ]
  }
];

const PricingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { subscriptionTier, setSubscriptionTier, skinTone, undertone } = useSkin();
  const { isAuthenticated, user, checkSubscription } = useAuth();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleSubscribe = async (plan: PricingPlan) => {
    if (plan.tier === "free") {
      setSubscriptionTier("free");
      toast({
        title: "Free plan activated",
        description: "You are now using the free plan. Upgrade anytime to access premium features.",
      });
      
      // For free plan, check if user has skin data and redirect accordingly
      if (skinTone && undertone) {
        navigate("/results");
      } else {
        navigate("/camera");
      }
      return;
    }
    
    // For premium plans, check authentication first
    if (!isAuthenticated || !user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to subscribe to a premium plan",
      });
      navigate("/auth");
      return;
    }

    setIsProcessing(plan.id);
    
    try {
      console.log("Creating checkout session for plan:", plan.id);
      console.log("User authenticated:", isAuthenticated);
      console.log("User ID:", user?.id);
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        throw new Error("Authentication session error");
      }
      
      if (!session) {
        console.error("No active session found");
        throw new Error("No active authentication session");
      }

      console.log("Session token present:", !!session.access_token);

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planId: plan.id,
          userId: user.id 
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log("Supabase function response:", { data, error });

      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }

      if (!data?.url) {
        console.error("No checkout URL returned:", data);
        throw new Error("No checkout URL received from payment processor");
      }

      console.log("Redirecting to checkout URL:", data.url);

      toast({
        title: "Redirecting to checkout",
        description: "Opening Stripe checkout in a new tab...",
      });

      // Store current skin data before payment to preserve it
      if (skinTone && undertone) {
        localStorage.setItem('temp_skin_data', JSON.stringify({ skinTone, undertone }));
      }

      window.open(data.url, '_blank');
      
      // Set up a listener for when the user returns from Stripe
      const handleVisibilityChange = async () => {
        if (!document.hidden) {
          // User returned to the app, check subscription status
          setTimeout(async () => {
            try {
              await checkSubscription();
              
              // Restore skin data if it was temporarily stored
              const tempData = localStorage.getItem('temp_skin_data');
              if (tempData) {
                const { skinTone: tempSkinTone, undertone: tempUndertone } = JSON.parse(tempData);
                // The skin context should already have this data, but just in case
                localStorage.removeItem('temp_skin_data');
              }
              
              // Navigate to appropriate page based on whether user has skin data
              if (skinTone && undertone) {
                navigate("/results");
              } else {
                navigate("/premium-dashboard");
              }
            } catch (error) {
              console.error("Error checking subscription after payment:", error);
            }
          }, 2000); // Give some time for the payment to process
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Clean up listener after 5 minutes
      setTimeout(() => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }, 5 * 60 * 1000);
      
    } catch (error) {
      console.error("Payment processing error:", error);
      
      let errorMessage = "There was a problem processing your payment. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes("Authentication")) {
          errorMessage = "Authentication error. Please sign out and sign in again.";
        } else if (error.message.includes("network")) {
          errorMessage = "Network error. Please check your connection and try again.";
        } else if (error.message.includes("checkout")) {
          errorMessage = "Checkout initialization failed. Please try again.";
        }
      }
      
      toast({
        title: "Payment processing failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-white">
        <header className="p-6 flex items-center border-b border-gray-100">
          <BackButton to={skinTone && undertone ? "/results" : "/"} />
          <Logo className="mx-auto" />
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-gray-900">Choose Your Plan</h1>
              <p className="text-gray-600">
                Get access to premium features and unlock unlimited foundation matching
              </p>
              {!isAuthenticated && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    💡 <strong>Sign in required:</strong> Create an account to subscribe to premium plans and sync your data across devices.
                  </p>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative flex flex-col ${plan.popular ? 'border-2 border-black shadow-lg' : 'border border-gray-200'}`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-0 right-0 mx-auto w-fit bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
                      {plan.badge}
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      {plan.billingCycleText && <span className="text-gray-600">{plan.billingCycleText}</span>}
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          {feature.included ? (
                            <CheckIcon size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XIcon size={18} className="text-gray-300 mt-0.5 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${!feature.included ? 'text-gray-400' : feature.premium ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${plan.tier === "free" ? "bg-gray-200 hover:bg-gray-300 text-gray-800" : "bg-black hover:bg-gray-800 text-white"}`}
                      onClick={() => handleSubscribe(plan)}
                      disabled={isProcessing === plan.id || (subscriptionTier === plan.tier && plan.tier !== 'free')}
                    >
                      {subscriptionTier === plan.tier && plan.tier !== 'free' ? "Current Plan" : 
                       subscriptionTier === 'free' && plan.tier === 'free' ? "Current Plan" :
                        plan.tier === "free" ? "Select Free Plan" : 
                        !isAuthenticated ? "Sign In to Subscribe" : 
                        isProcessing === plan.id ? "Processing..." : `Get ${plan.name}`}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default PricingPage;

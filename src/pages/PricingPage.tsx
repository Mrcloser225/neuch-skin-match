
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSkin } from "@/contexts/SkinContext";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: Array<{text: string; included: boolean}>;
  popular?: boolean;
  tier: "free" | "premium" | "lifetime";
  badge?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Basic skin analysis and limited recommendations",
    tier: "free",
    features: [
      { text: "Basic skin tone analysis", included: true },
      { text: "Limited foundation recommendations (2)", included: true },
      { text: "Basic undertone detection", included: true },
      { text: "Unlimited foundation recommendations", included: false },
      { text: "Premium brand suggestions", included: false },
      { text: "Personalized shade matching", included: false },
      { text: "Save and compare results", included: false },
      { text: "Shopping links to recommended products", included: false },
      { text: "Priority customer support", included: false },
      { text: "Early access to new features", included: false },
      { text: "Exclusive beauty content and tutorials", included: false }
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: 49.99,
    description: "Full access to all makeup recommendations",
    tier: "premium",
    popular: true,
    badge: "Most Popular",
    features: [
      { text: "Basic skin tone analysis", included: true },
      { text: "Limited foundation recommendations (2)", included: true },
      { text: "Basic undertone detection", included: true },
      { text: "Unlimited foundation recommendations", included: true },
      { text: "Premium brand suggestions", included: true },
      { text: "Personalized shade matching", included: true },
      { text: "Save and compare results", included: true },
      { text: "Shopping links to recommended products", included: true },
      { text: "Priority customer support", included: false },
      { text: "Early access to new features", included: false },
      { text: "Exclusive beauty content and tutorials", included: false }
    ]
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: 129.99,
    description: "One-time payment for lifetime access",
    tier: "lifetime",
    badge: "Best Value",
    features: [
      { text: "Basic skin tone analysis", included: true },
      { text: "Limited foundation recommendations (2)", included: true },
      { text: "Basic undertone detection", included: true },
      { text: "Unlimited foundation recommendations", included: true },
      { text: "Premium brand suggestions", included: true },
      { text: "Personalized shade matching", included: true },
      { text: "Save and compare results", included: true },
      { text: "Shopping links to recommended products", included: true },
      { text: "Priority customer support", included: true },
      { text: "Early access to new features", included: true },
      { text: "Exclusive beauty content and tutorials", included: true }
    ]
  }
];

const PricingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { subscriptionTier, setSubscriptionTier } = useSkin();
  const { isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = (plan: PricingPlan) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a premium plan",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setSubscriptionTier(plan.tier);
      setIsProcessing(false);
      toast({
        title: "Subscription activated",
        description: `You are now subscribed to the ${plan.name} plan. Enjoy your premium features!`,
      });
      navigate("/results");
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <header className="p-6 flex items-center">
          <BackButton to="/results" />
          <Logo className="mx-auto" />
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif font-medium mb-2">Choose Your Plan</h1>
              <p className="text-neuch-700">
                Get access to premium features and unlock the full potential of your beauty journey
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative ${plan.popular ? 'border-amber-300 shadow-lg' : ''}`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-0 right-0 mx-auto w-fit bg-amber-400 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {plan.badge}
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      {plan.tier === "premium" && <span className="text-sm text-neuch-600">/year</span>}
                      {plan.tier === "lifetime" && <span className="text-sm text-neuch-600"> one-time</span>}
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          {feature.included ? (
                            <CheckIcon size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XIcon size={18} className="text-gray-300 mt-0.5 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${!feature.included ? 'text-gray-400' : ''}`}>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${plan.tier === "free" ? "bg-neuch-200 hover:bg-neuch-300 text-neuch-800" : 
                                plan.tier === "lifetime" ? "bg-violet-600 hover:bg-violet-700" : ""}`}
                      onClick={() => handleSubscribe(plan)}
                      disabled={isProcessing || subscriptionTier === plan.tier}
                    >
                      {subscriptionTier === plan.tier ? "Current Plan" : 
                        plan.tier === "free" ? "Free Plan" : `Get ${plan.name}`}
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


import { CheckIcon } from "lucide-react";
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

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  tier: "free" | "premium" | "lifetime";
}

const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Basic skin analysis and limited recommendations",
    tier: "free",
    features: [
      "Basic skin tone analysis",
      "Limited foundation recommendations (2)",
      "Basic undertone detection"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: 49.99,
    description: "Full access to all makeup recommendations",
    tier: "premium",
    popular: true,
    features: [
      "Advanced skin tone analysis",
      "Unlimited foundation recommendations",
      "Premium brand suggestions",
      "Personalized shade matching",
      "Save and compare results",
      "Shopping links to recommended products"
    ]
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: 129.99,
    description: "One-time payment for lifetime access",
    tier: "lifetime",
    features: [
      "All Premium features",
      "Lifetime access with no recurring payments",
      "Priority customer support",
      "Early access to new features",
      "Exclusive beauty content and tutorials"
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
        description: `You are now subscribed to the ${plan.name} plan`,
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
                  {plan.popular && (
                    <div className="absolute -top-3 left-0 right-0 mx-auto w-fit bg-amber-400 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
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
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckIcon size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${plan.tier === "free" ? "bg-neuch-200 hover:bg-neuch-300 text-neuch-800" : ""}`}
                      onClick={() => handleSubscribe(plan)}
                      disabled={isProcessing || subscriptionTier === plan.tier}
                    >
                      {subscriptionTier === plan.tier ? "Current Plan" : 
                        plan.tier === "free" ? "Free Plan" : "Subscribe"}
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

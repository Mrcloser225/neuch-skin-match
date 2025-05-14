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
  tier: "free" | "premium";
  badge?: string;
  stripePrice?: string;
  billingCycleText?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "One scan & limited recommendations",
    tier: "free",
    billingCycleText: "",
    features: [
      { text: "Basic skin tone analysis", included: true },
      { text: "One skin scan", included: true },
      { text: "Limited foundation recommendations (2)", included: true },
      { text: "Basic undertone detection", included: false },
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
    id: "premium-monthly",
    name: "Premium Monthly",
    price: 9.99,
    description: "Full access, billed monthly",
    tier: "premium",
    stripePrice: "price_YOUR_MONTHLY_PREMIUM_ID", // Replace with your actual Stripe price ID
    billingCycleText: "/month",
    features: [
      { text: "Basic skin tone analysis", included: true },
      { text: "One skin scan", included: true }, // Free users get one scan, premium users get this implicitly + more
      { text: "Limited foundation recommendations (2)", included: false }, // Premium gets unlimited
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
    id: "premium-yearly",
    name: "Premium Yearly",
    price: 49.99,
    description: "Full access, best value, billed yearly",
    tier: "premium",
    popular: true,
    badge: "Best Value",
    stripePrice: "price_YOUR_YEARLY_PREMIUM_ID", // Replace with your actual Stripe price ID
    billingCycleText: "/year",
    features: [
      { text: "Basic skin tone analysis", included: true },
      { text: "One skin scan", included: true }, // Free users get one scan, premium users get this implicitly + more
      { text: "Limited foundation recommendations (2)", included: false }, // Premium gets unlimited
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
  }
];

const PricingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { subscriptionTier, setSubscriptionTier } = useSkin();
  const { isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (plan: PricingPlan) => {
    // Free plan doesn't need payment processing
    if (plan.tier === "free") {
      setSubscriptionTier("free");
      toast({
        title: "Free plan activated",
        description: "You are now using the free plan. Upgrade anytime to access premium features.",
      });
      navigate("/results");
      return;
    }
    
    // Require authentication for paid plans
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a premium plan",
        variant: "destructive"
      });
      return;
    }

    if (!plan.stripePrice || plan.stripePrice.startsWith("price_YOUR_")) {
      toast({
        title: "Configuration Incomplete",
        description: "This plan is not yet configured for payments. Please contact support or replace placeholder Stripe Price ID.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    setIsProcessing(true);
    
    try {
      // For production, replace this with your actual Stripe checkout logic
      // This is a placeholder for demonstration purposes
      const createCheckoutSession = async () => {
        // In production, this should be replaced with a call to your backend
        // Example: const response = await fetch('/api/create-checkout-session', {...})
        // For now, simulating with placeholder Stripe Price ID
        console.log("Creating checkout session for Stripe Price ID:", plan.stripePrice);
        
        // Simulate a backend response
        return new Promise<{url: string}>((resolve) => {
          setTimeout(() => {
            // In production, this would be the actual Stripe checkout URL
            // The plan.id is just a local identifier, Stripe needs its own Price ID.
            const checkoutUrl = `https://checkout.stripe.com/pay/cs_test_YOUR_SESSION_ID_FOR_${plan.id}`; // This is a dummy URL
            resolve({url: checkoutUrl});
          }, 1000);
        });
      };
      
      // Get the checkout URL from your backend
      const { url } = await createCheckoutSession();
      
      // Open Stripe checkout in a new tab
      window.open(url, '_blank');
      
      // For demo purposes, we're setting the subscription anyway
      // In production, this should only happen after successful payment confirmation via webhooks or success page logic
      setTimeout(() => {
        setSubscriptionTier(plan.tier); // This will be 'premium' for both monthly and yearly
        setIsProcessing(false);
        toast({
          title: "Subscription processing", // Changed title
          description: `Your subscription to ${plan.name} is being processed. Please check your Stripe dashboard for confirmation.`,
        });
      }, 3000);
      
    } catch (error) {
      console.error("Payment processing error:", error);
      setIsProcessing(false);
      toast({
        title: "Payment processing failed",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive"
      });
    }
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
                  className={`relative flex flex-col ${plan.popular ? 'border-amber-300 shadow-lg' : ''}`}
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
                  <CardContent className="flex-grow">
                    <div className="mb-4">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      {plan.billingCycleText && <span className="text-sm text-neuch-600">{plan.billingCycleText}</span>}
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
                      className={`w-full ${plan.tier === "free" ? "bg-neuch-200 hover:bg-neuch-300 text-neuch-800" : ""}`}
                      onClick={() => handleSubscribe(plan)}
                      disabled={isProcessing || (subscriptionTier === plan.tier && plan.tier !== 'free') || (subscriptionTier === 'free' && plan.tier === 'free' && subscriptionTier === plan.id )} // More nuanced disabled logic might be needed if distinguishing between monthly/yearly active plans
                    >
                      {/* Simplified button text logic, assuming 'subscriptionTier' will be 'premium' for any paid plan */}
                      {subscriptionTier === plan.tier && plan.tier !== 'free' ? "Current Tier" : 
                       subscriptionTier === 'free' && plan.tier === 'free' ? "Current Plan" :
                        plan.tier === "free" ? "Select Free Plan" : `Get ${plan.name}`}
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

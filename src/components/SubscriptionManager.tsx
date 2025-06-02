
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSkin } from "@/contexts/SkinContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const SubscriptionManager = () => {
  const { isAuthenticated, checkSubscription } = useAuth();
  const { subscriptionTier } = useSkin();
  const [isLoading, setIsLoading] = useState(false);

  const handleManageSubscription = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to manage your subscription",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;
      
      // Open customer portal in a new tab
      window.open(data.url, '_blank');
      
      toast({
        title: "Opening subscription portal",
        description: "Redirecting to Stripe customer portal...",
      });
      
    } catch (error) {
      console.error("Error opening customer portal:", error);
      toast({
        title: "Error",
        description: "Failed to open subscription management portal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshSubscription = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      await checkSubscription();
      toast({
        title: "Subscription refreshed",
        description: "Your subscription status has been updated.",
      });
    } catch (error) {
      console.error("Error refreshing subscription:", error);
      toast({
        title: "Error",
        description: "Failed to refresh subscription status.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Subscription Status
          {subscriptionTier === "premium" && (
            <Badge variant="default">Premium</Badge>
          )}
          {subscriptionTier === "free" && (
            <Badge variant="secondary">Free</Badge>
          )}
        </CardTitle>
        <CardDescription>
          {subscriptionTier === "premium" 
            ? "You have access to all premium features" 
            : "Upgrade to premium for unlimited access"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefreshSubscription}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </Button>
          {subscriptionTier === "premium" && (
            <Button
              onClick={handleManageSubscription}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Settings size={16} />
              Manage Subscription
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionManager;

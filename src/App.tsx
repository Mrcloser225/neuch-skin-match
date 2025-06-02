import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SkinProvider } from "@/contexts/SkinContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import SplashScreen from "@/components/SplashScreen";

import Index from "./pages/Index";
import CameraPage from "./pages/CameraPage";
import AnalysisPage from "./pages/AnalysisPage";
import ResultsPage from "./pages/ResultsPage";
import PricingPage from "./pages/PricingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import ShopPage from "./pages/ShopPage";
import AuthPage from "./pages/AuthPage";
import PremiumDashboard from "./pages/PremiumDashboard";
import SavedFoundationsPage from "./pages/SavedFoundationsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  const [showingSplash, setShowingSplash] = useState(true);
  const [isCapacitor, setIsCapacitor] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  
  // Check if running in Capacitor environment and detect platform
  useEffect(() => {
    const checkPlatform = async () => {
      try {
        // Check if window.Capacitor exists
        if (window.Capacitor) {
          setIsCapacitor(true);
          // Check if running on iOS
          if (window.Capacitor.getPlatform() === 'ios') {
            setIsIOS(true);
            // Add iOS-specific body classes for safe area handling
            document.body.classList.add('ios-device');
          }
        }
      } catch (e) {
        console.log("Not running in Capacitor environment", e);
      }
    };
    
    checkPlatform();
  }, []);
  
  // Only show splash in Capacitor environment or on first load
  const handleSplashFinished = () => setShowingSplash(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait">
          {showingSplash && (
            <SplashScreen onFinish={handleSplashFinished} />
          )}
        </AnimatePresence>
        
        {!showingSplash && (
          <BrowserRouter>
            <LanguageProvider>
              <SkinProvider>
                <AuthProvider>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/camera" element={<CameraPage />} />
                    <Route path="/analysis" element={<AnalysisPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/premium-dashboard" element={<PremiumDashboard />} />
                    <Route path="/saved-foundations" element={<SavedFoundationsPage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AuthProvider>
              </SkinProvider>
            </LanguageProvider>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

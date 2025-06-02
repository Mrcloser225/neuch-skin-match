
import PageTransition from "@/components/PageTransition";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import SavedFoundations from "@/components/SavedFoundations";
import { useSkin } from "@/contexts/SkinContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SavedFoundationsPage = () => {
  const { subscriptionTier } = useSkin();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const isPremium = subscriptionTier === "premium" || subscriptionTier === "lifetime";

  useEffect(() => {
    if (!isAuthenticated || !isPremium) {
      navigate("/pricing");
    }
  }, [isAuthenticated, isPremium, navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <header className="p-6 flex items-center">
          <BackButton to="/results" />
          <Logo className="mx-auto" />
        </header>

        <main className="flex-1 p-6">
          <SavedFoundations />
        </main>
      </div>
    </PageTransition>
  );
};

export default SavedFoundationsPage;

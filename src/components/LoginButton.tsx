
import { useState } from "react";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginModal from "./LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "./UserMenu";
import { useLanguage } from "@/contexts/LanguageContext";

const LoginButton = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <span className="animate-pulse">Loading...</span>
      </Button>
    );
  }

  if (isAuthenticated) {
    return <UserMenu />;
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowLoginModal(true)}
        className="flex items-center gap-1"
      >
        <LogIn size={16} />
        <span className="hidden sm:inline">Sign In</span>
      </Button>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default LoginButton;

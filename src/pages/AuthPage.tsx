
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";

const AuthPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neuch-50 to-neuch-100">
      <div className="w-full max-w-md">
        <LoginModal isOpen={true} onClose={() => navigate("/")} />
      </div>
    </div>
  );
};

export default AuthPage;

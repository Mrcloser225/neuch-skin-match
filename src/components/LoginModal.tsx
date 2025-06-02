
import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { signIn, signUp, signInWithOAuth, isLoading } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleSocialLogin = async (provider: "tiktok" | "instagram" | "facebook") => {
    try {
      await signInWithOAuth(provider);
      // Don't close modal immediately as OAuth redirect will handle the flow
    } catch (error) {
      // Error handling is done in the auth context
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await signIn(loginEmail, loginPassword);
      onClose();
    } catch (error) {
      // Error handling is done in the auth context
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (registerPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await signUp(registerEmail, registerPassword, registerName);
      onClose();
    } catch (error) {
      // Error handling is done in the auth context
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-instagram">
            {activeTab === "login" ? "Sign In" : "Create Account"}
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <Tabs 
          defaultValue="login" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("tiktok")}
                disabled={isLoading}
                className="flex items-center justify-center"
              >
                <svg width="20" height="20" className="mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.321 5.562a5.124 5.124 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.966-1.305-2.07-1.305-3.212V1h-3.173v14.993c0 2.51-2.04 4.55-4.55 4.55s-4.55-2.04-4.55-4.55 2.04-4.55 4.55-4.55c.5 0 .982.081 1.433.23V7.61a8.195 8.195 0 00-1.433-.124c-4.05 0-7.327 3.277-7.327 7.327s3.277 7.327 7.327 7.327 7.327-3.277 7.327-7.327V9.035a9.96 9.96 0 005.49 1.62V7.482a6.947 6.947 0 01-2.21-.37z"/>
                </svg>
                TikTok
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("instagram")}
                disabled={isLoading}
                className="flex items-center justify-center"
              >
                <svg width="20" height="20" className="mr-2" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                  <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#405DE6" />
                      <stop offset="25%" stopColor="#5851DB" />
                      <stop offset="50%" stopColor="#833AB4" />
                      <stop offset="75%" stopColor="#C13584" />
                      <stop offset="100%" stopColor="#E1306C" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("facebook")}
                disabled={isLoading}
                className="flex items-center justify-center"
              >
                <svg width="20" height="20" className="mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                </svg>
                Facebook
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Your Name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input 
                  id="register-email" 
                  type="email" 
                  placeholder="your@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password" 
                  type="password" 
                  placeholder="••••••••"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 6 characters long
                </p>
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="text-sm text-muted-foreground">
                  By creating an account, you agree to our{" "}
                  <Link to="/terms" className="text-primary hover:underline" target="_blank">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline" target="_blank">
                    Privacy Policy
                  </Link>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or register with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("tiktok")}
                disabled={isLoading}
                className="flex items-center justify-center"
              >
                <svg width="20" height="20" className="mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.321 5.562a5.124 5.124 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.966-1.305-2.07-1.305-3.212V1h-3.173v14.993c0 2.51-2.04 4.55-4.55 4.55s-4.55-2.04-4.55-4.55 2.04-4.55 4.55-4.55c.5 0 .982.081 1.433.23V7.61a8.195 8.195 0 00-1.433-.124c-4.05 0-7.327 3.277-7.327 7.327s3.277 7.327 7.327 7.327 7.327-3.277 7.327-7.327V9.035a9.96 9.96 0 005.49 1.62V7.482a6.947 6.947 0 01-2.21-.37z"/>
                </svg>
                TikTok
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("instagram")}
                disabled={isLoading}
                className="flex items-center justify-center"
              >
                <svg width="20" height="20" className="mr-2" viewBox="0 0 24 24" fill="url(#instagram-gradient-2)">
                  <defs>
                    <linearGradient id="instagram-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#405DE6" />
                      <stop offset="25%" stopColor="#5851DB" />
                      <stop offset="50%" stopColor="#833AB4" />
                      <stop offset="75%" stopColor="#C13584" />
                      <stop offset="100%" stopColor="#E1306C" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("facebook")}
                disabled={isLoading}
                className="flex items-center justify-center"
              >
                <svg width="20" height="20" className="mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                </svg>
                Facebook
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;

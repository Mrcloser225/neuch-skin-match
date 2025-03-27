
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useSkin } from "./SkinContext";
import { secureStore, secureRetrieve, secureRemove } from "@/utils/secureStorage";
import { toast } from "@/hooks/use-toast";

// Define the authentication provider types
type SocialProvider = "google" | "facebook" | "instagram" | "tiktok" | "email";

// Define the user type
interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
  provider: SocialProvider;
  consentGiven: boolean;
  termsAccepted: boolean;
  dataProcessingAccepted: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (provider: SocialProvider) => Promise<void>;
  logout: () => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string, name: string, consentOptions: {
    termsAccepted: boolean;
    dataProcessingAccepted: boolean;
  }) => Promise<void>;
  updateUserConsent: (consentOptions: {
    termsAccepted?: boolean;
    dataProcessingAccepted?: boolean;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setIsLoggedIn } = useSkin();

  // Check for existing session on mount
  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const storedUser = await secureRetrieve("neuch_user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        await secureRemove("neuch_user");
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredUser();
  }, [setIsLoggedIn]);

  // Mock social login function (would be replaced with actual provider SDK implementations)
  const login = async (provider: SocialProvider) => {
    setIsLoading(true);
    try {
      // This is where you'd integrate with real provider SDKs
      console.log(`Logging in with ${provider}...`);
      
      // Mock successful login
      const mockUser: User = {
        id: `user_${Math.random().toString(36).substring(2, 11)}`,
        email: `user@example.com`,
        name: `Test User (${provider})`,
        photoUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
        provider,
        consentGiven: true,
        termsAccepted: true,
        dataProcessingAccepted: true
      };
      
      // Store user securely
      await secureStore("neuch_user", JSON.stringify(mockUser));
      setUser(mockUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(`Login with ${provider} failed:`, error);
      toast({
        title: "Login Failed",
        description: "An error occurred during authentication. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock logout function
  const logout = async () => {
    try {
      await secureRemove("neuch_user");
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout Failed",
        description: "An error occurred during logout. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Mock email login
  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock email login
      console.log(`Logging in with email: ${email}...`);
      const mockUser: User = {
        id: `user_${Math.random().toString(36).substring(2, 11)}`,
        email,
        name: email.split('@')[0],
        provider: "email",
        consentGiven: true,
        termsAccepted: true,
        dataProcessingAccepted: true
      };
      await secureStore("neuch_user", JSON.stringify(mockUser));
      setUser(mockUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Email login failed:", error);
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock email registration with consent options
  const registerWithEmail = async (
    email: string, 
    password: string, 
    name: string,
    consentOptions: {
      termsAccepted: boolean;
      dataProcessingAccepted: boolean;
    }
  ) => {
    setIsLoading(true);
    try {
      // Validate consent
      if (!consentOptions.termsAccepted || !consentOptions.dataProcessingAccepted) {
        throw new Error("You must accept the terms and data processing agreement");
      }
      
      // Mock email registration
      console.log(`Registering with email: ${email}...`);
      const mockUser: User = {
        id: `user_${Math.random().toString(36).substring(2, 11)}`,
        email,
        name,
        provider: "email",
        consentGiven: true,
        termsAccepted: consentOptions.termsAccepted,
        dataProcessingAccepted: consentOptions.dataProcessingAccepted
      };
      await secureStore("neuch_user", JSON.stringify(mockUser));
      setUser(mockUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Email registration failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Registration failed. Please try again.";
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update user consent
  const updateUserConsent = async (consentOptions: {
    termsAccepted?: boolean;
    dataProcessingAccepted?: boolean;
  }) => {
    if (!user) return;
    
    try {
      const updatedUser = {
        ...user,
        termsAccepted: consentOptions.termsAccepted ?? user.termsAccepted,
        dataProcessingAccepted: consentOptions.dataProcessingAccepted ?? user.dataProcessingAccepted,
        consentGiven: true
      };
      
      await secureStore("neuch_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Preferences Updated",
        description: "Your privacy preferences have been updated successfully."
      });
    } catch (error) {
      console.error("Failed to update consent:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update your preferences. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        loginWithEmail,
        registerWithEmail,
        updateUserConsent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

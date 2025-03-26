import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useSkin } from "./SkinContext";

// Define the authentication provider types
type SocialProvider = "google" | "facebook" | "instagram" | "tiktok" | "email";

// Define the user type
interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
  provider: SocialProvider;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (provider: SocialProvider) => Promise<void>;
  logout: () => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setIsLoggedIn } = useSkin();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("neuch_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("neuch_user");
      }
    }
    setIsLoading(false);
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
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem("neuch_user", JSON.stringify(mockUser));
      setUser(mockUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(`Login with ${provider} failed:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock logout function
  const logout = () => {
    localStorage.removeItem("neuch_user");
    setUser(null);
    setIsLoggedIn(false);
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
      };
      localStorage.setItem("neuch_user", JSON.stringify(mockUser));
      setUser(mockUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Email login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock email registration
  const registerWithEmail = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Mock email registration
      console.log(`Registering with email: ${email}...`);
      const mockUser: User = {
        id: `user_${Math.random().toString(36).substring(2, 11)}`,
        email,
        name,
        provider: "email",
      };
      localStorage.setItem("neuch_user", JSON.stringify(mockUser));
      setUser(mockUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Email registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
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

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useSkin } from "./SkinContext";
import { toast } from "@/hooks/use-toast";

// Define the authentication provider types
type SocialProvider = "google" | "facebook" | "instagram" | "tiktok" | "email";

// Define the user profile type from our database
interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithOAuth: (provider: Exclude<SocialProvider, "email">) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Pick<UserProfile, 'full_name' | 'avatar_url'>>) => Promise<void>;
  checkSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Rate limiting for subscription checks - increased cooldown
let lastSubscriptionCheck = 0;
const SUBSCRIPTION_CHECK_COOLDOWN = 60000; // 60 seconds
let subscriptionCheckInProgress = false;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setIsLoggedIn, setSubscriptionTier } = useSkin();

  // Fetch user profile from our database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  // Check subscription status with enhanced rate limiting and error handling
  const checkSubscription = async () => {
    if (!user) {
      console.log('No user, skipping subscription check');
      return;
    }
    
    const now = Date.now();
    if (now - lastSubscriptionCheck < SUBSCRIPTION_CHECK_COOLDOWN) {
      console.log('Subscription check skipped due to rate limiting');
      return;
    }
    
    if (subscriptionCheckInProgress) {
      console.log('Subscription check already in progress');
      return;
    }
    
    lastSubscriptionCheck = now;
    subscriptionCheckInProgress = true;
    
    try {
      console.log('Checking subscription status...');
      
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      
      if (error) {
        console.error('Error checking subscription:', error);
        // Don't throw error, just log it to prevent cascading failures
        return;
      }

      if (data?.subscribed) {
        setSubscriptionTier('premium');
      } else {
        setSubscriptionTier('free');
      }
      console.log('Subscription check completed:', data);
    } catch (error) {
      console.error('Failed to check subscription:', error);
      // Don't propagate error to prevent UI crashes
    } finally {
      subscriptionCheckInProgress = false;
    }
  };

  // Set up auth state listener
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoggedIn(!!session?.user);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
        // Only check subscription on initial load with delay
        setTimeout(() => checkSubscription(), 2000);
      }
      
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoggedIn(!!session?.user);
        
        if (session?.user && event === 'SIGNED_IN') {
          // Fetch profile when user logs in
          setTimeout(() => {
            fetchUserProfile(session.user.id);
            // Check subscription only on sign in, with delay
            setTimeout(() => checkSubscription(), 3000);
          }, 0);
        } else {
          setProfile(null);
          setSubscriptionTier('free');
        }

        if (event === 'SIGNED_OUT') {
          setProfile(null);
          setSubscriptionTier('free');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [setIsLoggedIn, setSubscriptionTier]);

  // Sign up with email and password
  const signUp = async (email: string, password: string, fullName?: string) => {
    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: fullName ? { full_name: fullName } : undefined
        }
      });

      if (error) throw error;

      toast({
        title: "Check your email",
        description: "We've sent you a confirmation link to complete your registration.",
      });
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        title: "Sign up failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      });
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: "Sign in failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with OAuth providers
  const signInWithOAuth = async (provider: Exclude<SocialProvider, "email">) => {
    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: redirectUrl
        }
      });

      if (error) throw error;
    } catch (error: any) {
      console.error(`OAuth sign in error (${provider}):`, error);
      toast({
        title: "Sign in failed",
        description: `Could not sign in with ${provider}. Please try again.`,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Update user profile
  const updateProfile = async (updates: Partial<Pick<UserProfile, 'full_name' | 'avatar_url'>>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Refresh profile
      await fetchUserProfile(user.id);

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isAuthenticated: !!user,
        isLoading,
        signUp,
        signIn,
        signInWithOAuth,
        signOut,
        updateProfile,
        checkSubscription,
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

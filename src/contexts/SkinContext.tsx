
import { createContext, useState, useContext, ReactNode } from "react";

// Define skin conditions type
type SkinCondition = "normal" | "eczema" | "vitiligo" | "albinism" | "hyperpigmentation" | null;

// Define subscription tier type
type SubscriptionTier = "free" | "premium" | "lifetime" | null;

interface SkinContextType {
  capturedImage: string | null;
  setCapturedImage: (image: string | null) => void;
  undertone: "cool" | "neutral" | "olive" | null;
  setUndertone: (undertone: "cool" | "neutral" | "olive" | null) => void;
  skinTone: string | null;
  setSkinTone: (tone: string | null) => void;
  skinCondition: SkinCondition;
  setSkinCondition: (condition: SkinCondition) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  subscriptionTier: SubscriptionTier; 
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  userProfile: {
    email: string | null;
    name: string | null;
    savedFoundations: Array<{ brand: string; shade: string }>;
  };
  setUserProfile: (profile: {
    email: string | null;
    name: string | null;
    savedFoundations?: Array<{ brand: string; shade: string }>;
  }) => void;
  addSavedFoundation: (foundation: { brand: string; shade: string }) => void;
}

const SkinContext = createContext<SkinContextType | null>(null);

export const SkinProvider = ({ children }: { children: ReactNode }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [undertone, setUndertone] = useState<"cool" | "neutral" | "olive" | null>(null);
  const [skinTone, setSkinTone] = useState<string | null>(null);
  const [skinCondition, setSkinCondition] = useState<SkinCondition>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>("free");
  const [userProfile, setUserProfileState] = useState<{
    email: string | null;
    name: string | null;
    savedFoundations: Array<{ brand: string; shade: string }>;
  }>({
    email: null,
    name: null,
    savedFoundations: [],
  });

  // Custom setter for userProfile that handles the optional savedFoundations
  const setUserProfile = (profile: {
    email: string | null;
    name: string | null;
    savedFoundations?: Array<{ brand: string; shade: string }>;
  }) => {
    setUserProfileState(prev => ({
      ...prev,
      email: profile.email,
      name: profile.name,
      savedFoundations: profile.savedFoundations || prev.savedFoundations,
    }));
  };

  const addSavedFoundation = (foundation: { brand: string; shade: string }) => {
    setUserProfileState(prev => ({
      ...prev,
      savedFoundations: [...prev.savedFoundations, foundation]
    }));
  };

  return (
    <SkinContext.Provider
      value={{
        capturedImage,
        setCapturedImage,
        undertone,
        setUndertone,
        skinTone,
        setSkinTone,
        skinCondition,
        setSkinCondition,
        isLoggedIn,
        setIsLoggedIn,
        subscriptionTier,
        setSubscriptionTier,
        userProfile,
        setUserProfile,
        addSavedFoundation,
      }}
    >
      {children}
    </SkinContext.Provider>
  );
};

export const useSkin = () => {
  const context = useContext(SkinContext);
  if (!context) {
    throw new Error("useSkin must be used within a SkinProvider");
  }
  return context;
};

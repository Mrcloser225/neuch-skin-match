import { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Define skin conditions type
type SkinCondition = "normal" | "eczema" | "vitiligo" | "albinism" | "hyperpigmentation" | null;

// Define subscription tier type
type SubscriptionTier = "free" | "premium" | "lifetime" | null;

interface SavedFoundation {
  brand: string;
  shade: string;
}

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
  savedFoundations: SavedFoundation[];
  addSavedFoundation: (foundation: SavedFoundation) => void;
  removeSavedFoundation: (foundation: SavedFoundation) => void;
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
  const [savedFoundations, setSavedFoundations] = useState<SavedFoundation[]>([]);

  // Persist skin data to localStorage when it changes
  useEffect(() => {
    if (skinTone && undertone) {
      localStorage.setItem('skin_analysis_data', JSON.stringify({ skinTone, undertone }));
    }
  }, [skinTone, undertone]);

  // Load skin data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('skin_analysis_data');
    if (savedData && !skinTone && !undertone) {
      try {
        const { skinTone: savedSkinTone, undertone: savedUndertone } = JSON.parse(savedData);
        setSkinTone(savedSkinTone);
        setUndertone(savedUndertone);
      } catch (error) {
        console.error("Error loading saved skin data:", error);
      }
    }
  }, []);

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

  const addSavedFoundation = (foundation: SavedFoundation) => {
    setSavedFoundations(prev => {
      const exists = prev.some(f => f.brand === foundation.brand && f.shade === foundation.shade);
      if (!exists) {
        return [...prev, foundation];
      }
      return prev;
    });
  };

  const removeSavedFoundation = (foundation: SavedFoundation) => {
    setSavedFoundations(prev => 
      prev.filter(f => !(f.brand === foundation.brand && f.shade === foundation.shade))
    );
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
        savedFoundations,
        addSavedFoundation,
        removeSavedFoundation,
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


import { createContext, useState, useContext, ReactNode } from "react";

interface SkinContextType {
  capturedImage: string | null;
  setCapturedImage: (image: string | null) => void;
  undertone: "warm" | "cool" | "neutral" | null;
  setUndertone: (undertone: "warm" | "cool" | "neutral" | null) => void;
  skinTone: string | null;
  setSkinTone: (tone: string | null) => void;
}

const SkinContext = createContext<SkinContextType | null>(null);

export const SkinProvider = ({ children }: { children: ReactNode }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [undertone, setUndertone] = useState<"warm" | "cool" | "neutral" | null>(null);
  const [skinTone, setSkinTone] = useState<string | null>(null);

  return (
    <SkinContext.Provider
      value={{
        capturedImage,
        setCapturedImage,
        undertone,
        setUndertone,
        skinTone,
        setSkinTone,
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

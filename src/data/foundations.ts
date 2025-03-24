
export interface Foundation {
  id: string;
  brand: string;
  name: string;
  shade: string;
  color: string;
  undertone: "warm" | "cool" | "neutral" | "olive";
  coverage: "light" | "medium" | "full";
  finish: "matte" | "dewy" | "natural" | "satin";
  price: number;
  imgUrl?: string;
  link?: string;
}

// Example foundation data
export const foundations: Foundation[] = [
  {
    id: "1",
    brand: "Fenty Beauty",
    name: "Pro Filt'r Soft Matte",
    shade: "290",
    color: "#CB9A7B",
    undertone: "neutral",
    coverage: "medium",
    finish: "matte",
    price: 39,
  },
  {
    id: "2",
    brand: "NARS",
    name: "Natural Radiant Longwear",
    shade: "Tahoe",
    color: "#C59A7E",
    undertone: "warm",
    coverage: "full",
    finish: "natural",
    price: 49,
  },
  {
    id: "3",
    brand: "Estée Lauder",
    name: "Double Wear",
    shade: "3W1 Tawny",
    color: "#D4A282",
    undertone: "warm",
    coverage: "full",
    finish: "matte",
    price: 46,
  },
  {
    id: "4",
    brand: "MAC",
    name: "Studio Fix Fluid",
    shade: "NC42",
    color: "#D3A67F",
    undertone: "warm",
    coverage: "medium",
    finish: "natural",
    price: 36,
  },
  {
    id: "5",
    brand: "Dior",
    name: "Forever Skin Glow",
    shade: "3WO",
    color: "#CEA282",
    undertone: "warm",
    coverage: "medium",
    finish: "dewy",
    price: 52,
  },
  {
    id: "6",
    brand: "Giorgio Armani",
    name: "Luminous Silk",
    shade: "6",
    color: "#D9B095",
    undertone: "neutral",
    coverage: "medium",
    finish: "satin",
    price: 65,
  },
  {
    id: "7",
    brand: "Maybelline",
    name: "Fit Me Matte + Poreless",
    shade: "220 Natural Beige",
    color: "#E0B59D",
    undertone: "neutral",
    coverage: "medium",
    finish: "matte",
    price: 8.99,
  },
  {
    id: "8",
    brand: "L'Oréal",
    name: "True Match",
    shade: "W5 Sand Beige",
    color: "#DFB196",
    undertone: "warm",
    coverage: "light",
    finish: "natural",
    price: 10.99,
  },
  {
    id: "9",
    brand: "Lancôme",
    name: "Teint Idole Ultra Wear",
    shade: "320 Bisque W",
    color: "#DCB191",
    undertone: "warm",
    coverage: "full",
    finish: "matte",
    price: 47,
  },
  {
    id: "10",
    brand: "Charlotte Tilbury",
    name: "Airbrush Flawless",
    shade: "7 Neutral",
    color: "#D1A280",
    undertone: "neutral",
    coverage: "full",
    finish: "matte",
    price: 44,
  },
  // Cool undertone examples
  {
    id: "11",
    brand: "NARS",
    name: "Sheer Glow Foundation",
    shade: "Mont Blanc",
    color: "#ECD6C7",
    undertone: "cool",
    coverage: "medium",
    finish: "natural",
    price: 47,
  },
  {
    id: "12",
    brand: "MAC",
    name: "Studio Fix Fluid",
    shade: "NW20",
    color: "#F0D2BF",
    undertone: "cool",
    coverage: "medium",
    finish: "matte",
    price: 36,
  },
  {
    id: "13",
    brand: "Bobbi Brown",
    name: "Skin Foundation",
    shade: "Cool Ivory",
    color: "#F5E1D1",
    undertone: "cool",
    coverage: "light",
    finish: "natural",
    price: 50,
  },
  // Olive undertone examples
  {
    id: "14",
    brand: "Kosas",
    name: "Tinted Face Oil",
    shade: "5.5",
    color: "#C9A987",
    undertone: "olive",
    coverage: "light",
    finish: "dewy",
    price: 42,
  },
  {
    id: "15",
    brand: "Rare Beauty",
    name: "Liquid Touch Foundation",
    shade: "230N",
    color: "#D1B095",
    undertone: "olive",
    coverage: "medium",
    finish: "natural",
    price: 29,
  },
  {
    id: "16",
    brand: "ILIA",
    name: "Super Serum Skin Tint",
    shade: "Matira",
    color: "#BEA282",
    undertone: "olive",
    coverage: "light",
    finish: "dewy",
    price: 48,
  },
];

export const getRecommendations = (
  undertone: "warm" | "cool" | "neutral" | "olive",
  skinTone: string
): { foundation: Foundation; match: number }[] => {
  // Simulate matching logic - this would be where your real algorithm would go
  // For now, we'll just filter by undertone and assign random match percentages
  
  const matchedByUndertone = foundations.filter(
    (foundation) => foundation.undertone === undertone
  );
  
  const recommendations = matchedByUndertone.map((foundation) => {
    // Calculate a "match" percentage - in a real app this would be based on
    // image analysis and color distance algorithms
    const matchScore = Math.floor(85 + Math.random() * 15); // 85-99%
    
    return {
      foundation,
      match: matchScore,
    };
  });
  
  // Sort by match percentage
  return recommendations.sort((a, b) => b.match - a.match);
};

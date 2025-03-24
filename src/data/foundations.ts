
export interface Foundation {
  id: string;
  brand: string;
  name: string;
  shade: string;
  color: string;
  undertone: "cool" | "neutral" | "olive";
  coverage: "light" | "medium" | "full";
  finish: "matte" | "dewy" | "natural" | "satin";
  price: number;
  imgUrl?: string;
  link?: string;
}

// Example foundation data - focusing on cool, neutral, and olive undertones
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
  // Additional cool undertones - medium to dark skin tones
  {
    id: "17",
    brand: "Estée Lauder",
    name: "Double Wear",
    shade: "4C1 Outdoor Beige",
    color: "#BF9378",
    undertone: "cool",
    coverage: "full",
    finish: "matte",
    price: 46,
  },
  {
    id: "18",
    brand: "Lancôme",
    name: "Teint Idole Ultra Wear",
    shade: "420 Bisque N",
    color: "#A47860",
    undertone: "cool",
    coverage: "full",
    finish: "matte",
    price: 47,
  },
  {
    id: "19",
    brand: "Too Faced",
    name: "Born This Way",
    shade: "Mocha",
    color: "#936B59",
    undertone: "cool",
    coverage: "medium",
    finish: "natural",
    price: 40,
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
  // Additional olive undertones - medium to dark skin tones
  {
    id: "20",
    brand: "NARS",
    name: "Natural Radiant Longwear",
    shade: "Cadiz",
    color: "#B28B71",
    undertone: "olive",
    coverage: "full", 
    finish: "natural",
    price: 49,
  },
  {
    id: "21",
    brand: "Fenty Beauty",
    name: "Pro Filt'r Hydrating",
    shade: "350",
    color: "#A37A5E",
    undertone: "olive",
    coverage: "medium",
    finish: "natural",
    price: 38,
  },
  {
    id: "22",
    brand: "Dior",
    name: "Backstage Face & Body",
    shade: "4WO",
    color: "#9A7A64",
    undertone: "olive",
    coverage: "medium",
    finish: "natural",
    price: 40,
  },
  // Very deep cool
  {
    id: "23",
    brand: "Fenty Beauty",
    name: "Pro Filt'r Soft Matte",
    shade: "480",
    color: "#583E35",
    undertone: "cool",
    coverage: "medium",
    finish: "matte",
    price: 39,
  },
  // Very deep neutral
  {
    id: "24",
    brand: "MAC",
    name: "Studio Fix Fluid",
    shade: "NW58",
    color: "#573C30",
    undertone: "neutral",
    coverage: "medium",
    finish: "matte",
    price: 36,
  },
  // Very deep olive
  {
    id: "25",
    brand: "NARS",
    name: "Natural Radiant Longwear",
    shade: "Macao",
    color: "#5E4334",
    undertone: "olive",
    coverage: "full",
    finish: "natural",
    price: 49,
  },
  // Very fair cool
  {
    id: "26",
    brand: "Bobbi Brown",
    name: "Skin Foundation",
    shade: "Alabaster",
    color: "#F9EFEA",
    undertone: "cool",
    coverage: "light",
    finish: "natural",
    price: 50,
  },
  // Very fair neutral
  {
    id: "27",
    brand: "NARS",
    name: "Sheer Glow",
    shade: "Oslo",
    color: "#F8EDDF",
    undertone: "neutral",
    coverage: "medium",
    finish: "natural",
    price: 47,
  },
  // Very fair olive
  {
    id: "28",
    brand: "Kosas",
    name: "Revealer Foundation",
    shade: "Fair with Olive",
    color: "#EDE0CD",
    undertone: "olive",
    coverage: "medium",
    finish: "natural",
    price: 42,
  },
];

export const getRecommendations = (
  undertone: "cool" | "neutral" | "olive",
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

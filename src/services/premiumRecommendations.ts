
import { Foundation } from '@/data/foundations';
import { premiumFoundations } from '@/data/premiumFoundations';
import { getRecommendations } from '@/data/foundations';

export interface PremiumRecommendation {
  foundation: Foundation;
  match: number;
  confidence: number;
  reasons: string[];
}

export const getPremiumRecommendations = (
  undertone: string, 
  skinTone: string,
  isPremium: boolean = false
): PremiumRecommendation[] => {
  // Get base recommendations
  const baseRecs = getRecommendations(undertone, skinTone);
  
  // For premium users, add premium foundations
  const allFoundations = isPremium 
    ? [...baseRecs.map(r => r.foundation), ...premiumFoundations]
    : baseRecs.map(r => r.foundation);

  // Enhanced matching algorithm for premium users
  const recommendations = allFoundations
    .map(foundation => {
      let match = 0;
      let confidence = 0;
      const reasons: string[] = [];

      // Undertone matching (40% weight)
      if (foundation.undertone === undertone) {
        match += 40;
        confidence += 30;
        reasons.push(`Perfect ${undertone} undertone match`);
      } else {
        // Partial credit for neutral undertones
        if (foundation.undertone === 'neutral' || undertone === 'neutral') {
          match += 20;
          confidence += 15;
          reasons.push(`Compatible ${foundation.undertone} undertone`);
        }
      }

      // Skin tone matching (35% weight)
      if (foundation.skinTone === skinTone) {
        match += 35;
        confidence += 25;
        reasons.push(`Exact ${skinTone} depth match`);
      } else {
        // Adjacent skin tones get partial credit
        const tones = ['light', 'light-medium', 'medium', 'medium-dark', 'dark'];
        const userIndex = tones.indexOf(skinTone);
        const foundationIndex = tones.indexOf(foundation.skinTone);
        const distance = Math.abs(userIndex - foundationIndex);
        
        if (distance === 1) {
          match += 20;
          confidence += 15;
          reasons.push(`Close ${foundation.skinTone} depth match`);
        } else if (distance === 2) {
          match += 10;
          confidence += 8;
          reasons.push(`Workable ${foundation.skinTone} depth`);
        }
      }

      // Premium brand bonus (15% weight for premium users)
      if (isPremium && ['Fenty Beauty', 'Charlotte Tilbury', 'Giorgio Armani', 'Dior', 'Pat McGrath Labs', 'Tom Ford'].includes(foundation.brand)) {
        match += 15;
        confidence += 20;
        reasons.push(`Premium ${foundation.brand} formulation`);
      }

      // Formula reputation bonus (10% weight)
      if (['Fenty Beauty', 'Giorgio Armani', 'Charlotte Tilbury'].includes(foundation.brand)) {
        match += 10;
        confidence += 15;
        reasons.push(`Highly-rated formula`);
      }

      return {
        foundation,
        match: Math.min(match, 100),
        confidence: Math.min(confidence, 100),
        reasons
      };
    })
    .filter(rec => rec.match >= 30) // Only show decent matches
    .sort((a, b) => b.match - a.match)
    .slice(0, isPremium ? 12 : 4); // More results for premium users

  return recommendations;
};

export const getShoppingUrl = (brand: string, shade: string): string => {
  const brandUrls: Record<string, string> = {
    'Fenty Beauty': `https://fentybeauty.com/products/pro-filtr-soft-matte-longwear-foundation?variant=${shade}`,
    'Charlotte Tilbury': `https://www.charlottepilbury.com/products/airbrush-flawless-foundation?variant=${shade}`,
    'Giorgio Armani': `https://www.giorgioarmanibeauty.com/makeup/face/foundation/luminous-silk-foundation?shade=${shade}`,
    'Dior': `https://www.dior.com/en_us/products/beauty-Y0996244-dior-forever-foundation?shade=${shade}`,
    'Pat McGrath Labs': `https://www.patmcgrath.com/products/skin-fetish-sublime-perfection-foundation?shade=${shade}`,
    'Tom Ford': `https://www.tomford.com/traceless-foundation-stick?shade=${shade}`,
    'L\'Oréal': `https://www.lorealparisusa.com/products/makeup/face/foundation/true-match-super-blendable-makeup?shade=${shade}`,
    'Maybelline': `https://www.maybelline.com/face-makeup/foundation/fit-me-matte-poreless-foundation?shade=${shade}`,
    'Revlon': `https://www.revlon.com/face/foundation/colorstay-makeup?shade=${shade}`,
    'NARS': `https://www.narscosmetics.com/USA/natural-radiant-longwear-foundation?shade=${shade}`
  };

  return brandUrls[brand] || `https://www.sephora.com/search?keyword=${encodeURIComponent(brand + ' ' + shade)}`;
};


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RecommendationRequest {
  skinTone: string;
  undertone: string;
  skinConditions?: string[];
  preferences?: {
    budget?: 'drugstore' | 'mid-range' | 'high-end' | 'luxury';
    coverage?: 'light' | 'medium' | 'full';
    finish?: 'matte' | 'satin' | 'dewy' | 'natural';
    ethical?: boolean;
    crueltyFree?: boolean;
    vegan?: boolean;
  };
}

const COMPREHENSIVE_MAKEUP_DATABASE = `
You are an expert makeup artist and cosmetic chemist with access to the entire global makeup market. 
Your database includes:

NICHE & INDIE BRANDS:
- Kosas, Glossier, Rare Beauty, Tower 28, Ilia Beauty, RMS Beauty, Westman Atelier
- The Ordinary Serum Foundation, Purito Cica Clearing BB Cream
- Jones Road, Saie, Honest Beauty, Milk Makeup, Nudestix
- Lawless Beauty, Ami Cole, Danessa Myricks Beauty, Uoma Beauty
- Juvia's Place, Black Opal, Fashion Fair, Mented Cosmetics

K-BEAUTY & ASIAN BRANDS:
- Missha Perfect Cover BB Cream, Laneige Neo Foundation
- 3CE, Etude House, Innisfree, The Face Shop
- Shiseido, Shu Uemura, Sulwhasoo, Hera
- Canmake, Kate Tokyo, Clio, Romand

EUROPEAN & INTERNATIONAL:
- Bourjois Healthy Mix, Catrice HD Liquid Coverage
- Makeup Revolution, Revolution Beauty, I Heart Revolution
- Sleek MakeUP, Barry M, Collection
- Essence, Rimmel, Soap & Glory
- Australian brands: Ere Perez, Inika, Zuii Organic

DRUGSTORE GEMS:
- Milani Conceal + Perfect, Flower Beauty Light Illusion
- ColourPop Pretty Fresh Tinted Moisturizer
- NYX Born To Glow, E.L.F. Pure Skin Super Serum
- Wet n Wild Photo Focus, CoverGirl TruBlend Matte Made

HIGH-PERFORMANCE SPECIALIZED:
- Oxygenetix (for sensitive skin), Dermablend (full coverage)
- Alima Pure, Jane Iredale (mineral foundations)
- Vapour Organic Beauty, 100% Pure (clean beauty)
- Stellar Beauty, Habit Cosmetics (performance makeup)

Consider factors like:
- Ingredient compatibility with skin conditions
- Climate and humidity considerations  
- Skin chemistry and pH balance
- Specific undertone nuances (olive, golden, pink, red, neutral)
- Texture preferences and skin type
- Ethical and sustainability requirements
- Budget constraints and value for money
- Longevity and performance needs
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { skinTone, undertone, skinConditions = [], preferences = {} }: RecommendationRequest = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `
    ${COMPREHENSIVE_MAKEUP_DATABASE}

    User Profile:
    - Skin Tone: ${skinTone}
    - Undertone: ${undertone}
    - Skin Conditions: ${skinConditions.join(', ') || 'None specified'}
    - Budget: ${preferences.budget || 'No preference'}
    - Coverage: ${preferences.coverage || 'No preference'}
    - Finish: ${preferences.finish || 'No preference'}
    - Ethical Requirements: Cruelty-free: ${preferences.crueltyFree ? 'Yes' : 'No'}, Vegan: ${preferences.vegan ? 'Yes' : 'No'}

    Please recommend 15 foundations from your comprehensive database, prioritizing:
    1. Perfect undertone and skin tone matches
    2. Lesser-known but high-quality brands that might be overlooked
    3. Ingredient compatibility with any skin conditions
    4. Value for money across different price points
    5. Innovative formulations and newer brands

    For each recommendation, provide:
    - Brand and product name
    - Specific shade recommendation
    - Match confidence (85-100%)
    - 2-3 specific reasons why this product works
    - Price point ($ = drugstore, $$ = mid-range, $$$ = high-end, $$$$ = luxury)
    - Special features (clean, vegan, sensitive skin friendly, etc.)

    Format as JSON array with this structure:
    {
      "recommendations": [
        {
          "brand": "Brand Name",
          "productName": "Product Name", 
          "shade": "Shade Name",
          "match": 95,
          "confidence": 92,
          "reasons": ["Perfect olive undertone match", "Buildable coverage for natural look"],
          "pricePoint": "$$",
          "specialFeatures": ["Clean ingredients", "Sensitive skin friendly"],
          "color": "#D4A574"
        }
      ]
    }
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a world-class makeup artist and cosmetic chemist with comprehensive knowledge of the global makeup market, including niche, indie, international, and emerging brands.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Parse the JSON response from OpenAI
    let recommendations;
    try {
      const parsed = JSON.parse(aiResponse);
      recommendations = parsed.recommendations || [];
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.log('Raw AI response:', aiResponse);
      throw new Error('Failed to parse AI recommendations');
    }

    console.log(`Generated ${recommendations.length} AI-powered recommendations`);

    return new Response(JSON.stringify({ recommendations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-makeup-recommendations:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

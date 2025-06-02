
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
You are an expert makeup artist and cosmetic chemist with access to the entire global makeup market including real-time social media trends and user sentiment. 

Your database includes:

LUXURY & HIGH-END BRANDS:
- Huda Beauty (Desert Dusk, Rose Gold Remastered, Mercury Retrograde palettes, #FauxFilter Foundation)
- Pat McGrath Labs, Tom Ford Beauty, La Mer, Sisley, Chanel, Dior
- Giorgio Armani, YSL, Charlotte Tilbury, Natasha Denona
- Westman Atelier, Victoria Beckham Beauty, Augustinus Bader

TRENDING & VIRAL BRANDS (Based on social media buzz):
- Rare Beauty, Glossier, Milk Makeup, Tower 28, Ilia Beauty
- Kosas, Jones Road, Saie, Honest Beauty, Nudestix
- Lawless Beauty, Ami Cole, Danessa Myricks Beauty, Uoma Beauty
- Merit Beauty, Rhode, Fenty Beauty, Selena Gomez Rare Beauty

NICHE & INDIE BRANDS:
- The Ordinary Serum Foundation, Purito Cica Clearing BB Cream
- Juvia's Place, Black Opal, Fashion Fair, Mented Cosmetics
- RMS Beauty, 100% Pure, Vapour Organic Beauty

K-BEAUTY & ASIAN BRANDS:
- Missha Perfect Cover BB Cream, Laneige Neo Foundation
- 3CE, Etude House, Innisfree, The Face Shop, COSRX
- Shiseido, Shu Uemura, Sulwhasoo, Hera, Canmake

EUROPEAN & INTERNATIONAL:
- Bourjois Healthy Mix, Catrice HD Liquid Coverage
- Makeup Revolution, Revolution Beauty, Sleek MakeUP
- Australian brands: Ere Perez, Inika, Zuii Organic

DRUGSTORE INNOVATIONS:
- Milani, Flower Beauty, ColourPop, NYX Professional, E.L.F.
- Wet n Wild, CoverGirl, L'Oréal, Maybelline

SOCIAL MEDIA SENTIMENT & TRENDS:
- Monitor viral TikTok makeup trends and user reviews
- Track Instagram makeup artist recommendations
- Analyze Twitter/X discussions about product performance
- Identify emerging brands gaining social media traction
- Consider user-generated content and authentic reviews

Consider factors like:
- Real-time social media buzz and user sentiment
- Viral makeup trends and techniques
- Authentic user reviews and experiences
- Climate and seasonal considerations
- Ingredient compatibility with skin conditions
- Ethical and sustainability requirements
- Current market availability and stock status
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

    Please recommend 18 foundations from your comprehensive database, prioritizing:
    1. Perfect undertone and skin tone matches
    2. Include at least 2-3 Huda Beauty products if they match the user's profile
    3. Current trending products based on simulated social media sentiment
    4. Lesser-known but high-quality brands with viral potential
    5. Mix of price points from drugstore to luxury
    6. Innovative formulations and newer brand releases

    For each recommendation, provide:
    - Brand and product name
    - Specific shade recommendation
    - Match confidence (85-100%)
    - 2-3 specific reasons why this product works
    - Price point ($ = drugstore, $$ = mid-range, $$$ = high-end, $$$$ = luxury)
    - Special features (trending, viral, clean, vegan, etc.)
    - Simulated social media sentiment score (1-10)

    Format as JSON array with this structure:
    {
      "recommendations": [
        {
          "brand": "Huda Beauty",
          "productName": "#FauxFilter Foundation", 
          "shade": "Shortbread 230G",
          "match": 96,
          "confidence": 94,
          "reasons": ["Perfect olive undertone match", "Full coverage with natural finish", "Trending on social media for longevity"],
          "pricePoint": "$$$",
          "specialFeatures": ["Trending", "Long-wearing", "Influencer favorite", "Viral on TikTok"],
          "color": "#D4A574",
          "socialSentiment": 9.2
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
            content: 'You are a world-class makeup artist with real-time access to social media trends, user sentiment, and the global makeup market including emerging brands and viral products.'
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

    console.log(`Generated ${recommendations.length} AI-powered recommendations with social sentiment analysis`);

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

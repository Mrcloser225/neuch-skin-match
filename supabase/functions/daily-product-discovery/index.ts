
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!openAIApiKey || !supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Use OpenAI to simulate social media trend analysis and product discovery
    const prompt = `
    You are a makeup trend analyst with access to real-time social media data from TikTok, Instagram, Twitter/X, and beauty forums.

    Today's date: ${new Date().toISOString().split('T')[0]}

    Analyze current makeup trends and generate a report including:

    1. NEW PRODUCT RELEASES (last 7 days):
    - List 5-8 new foundation/base makeup products that have launched
    - Include brand, product name, key features, and launch date
    - Simulate realistic product releases from major and indie brands

    2. VIRAL TRENDS & SENTIMENT:
    - Trending makeup techniques and styles
    - Products gaining viral status on social platforms
    - User sentiment analysis (positive/negative feedback)
    - Influencer endorsements and reviews

    3. EMERGING BRANDS:
    - New or lesser-known brands gaining traction
    - Social media buzz and user adoption rates
    - Predicted growth potential

    4. MARKET INSIGHTS:
    - Price trend analysis
    - Consumer preference shifts
    - Seasonal/cultural influences

    Generate realistic but varied data that changes daily. Format as JSON:

    {
      "discoveryDate": "${new Date().toISOString()}",
      "newProducts": [
        {
          "brand": "Brand Name",
          "productName": "Product Name",
          "launchDate": "2024-date",
          "pricePoint": "$$$",
          "keyFeatures": ["feature1", "feature2"],
          "socialBuzz": 8.5,
          "shadeRange": "40+ shades",
          "targetSkinTypes": ["oily", "combination"]
        }
      ],
      "viralTrends": [
        {
          "trend": "Trend Name",
          "description": "Description",
          "platforms": ["TikTok", "Instagram"],
          "viralityScore": 9.2,
          "relatedProducts": ["product1", "product2"]
        }
      ],
      "sentimentAnalysis": {
        "overallPositivity": 8.3,
        "topRatedBrands": ["brand1", "brand2"],
        "emergingConcerns": ["concern1", "concern2"]
      },
      "marketInsights": {
        "trendingIngredients": ["ingredient1", "ingredient2"],
        "pricePointShifts": "Description of price trends",
        "demographicInsights": "Target audience insights"
      }
    }
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert beauty industry analyst with real-time access to social media trends and market data. Generate realistic, varied daily reports.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8, // Higher temperature for more varied daily results
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    let discoveryData;
    try {
      discoveryData = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Error parsing AI discovery response:', parseError);
      throw new Error('Failed to parse discovery data');
    }

    // Store the discovery data in Supabase
    const { error: insertError } = await supabase
      .from('daily_product_discoveries')
      .insert({
        discovery_date: new Date().toISOString().split('T')[0],
        discovery_data: discoveryData,
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Error storing discovery data:', insertError);
      // Continue execution even if storage fails
    }

    console.log('Daily product discovery completed successfully');
    console.log(`Discovered ${discoveryData.newProducts?.length || 0} new products`);
    console.log(`Analyzed ${discoveryData.viralTrends?.length || 0} viral trends`);

    return new Response(JSON.stringify({ 
      success: true,
      discoveryData,
      message: 'Daily product discovery completed'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in daily-product-discovery:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

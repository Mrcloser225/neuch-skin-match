
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('=== Create Checkout Function Started ===')
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get user from the auth token
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    console.log('User from token:', user?.id)

    if (userError || !user) {
      console.error('Authentication error:', userError)
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse request body
    const { planId, userId } = await req.json()
    console.log('Request data:', { planId, userId, tokenUserId: user.id })

    if (!planId) {
      console.error('Missing planId in request')
      return new Response(
        JSON.stringify({ error: 'Plan ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the user ID matches the token
    if (userId && userId !== user.id) {
      console.error('User ID mismatch:', { provided: userId, fromToken: user.id })
      return new Response(
        JSON.stringify({ error: 'User ID mismatch' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if Stripe secret key is configured
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeSecretKey) {
      console.error('Stripe secret key not configured')
      return new Response(
        JSON.stringify({ error: 'Payment processor not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Stripe key configured:', !!stripeSecretKey)

    // Define pricing plans
    const plans = {
      'premium-monthly': {
        priceId: 'price_1QVxdOLcV8LvL5WdHI9BAbGR', // Replace with your actual Stripe price ID
        amount: 999, // $9.99 in cents
        currency: 'usd',
        interval: 'month'
      },
      'premium-yearly': {
        priceId: 'price_1QVxdpLcV8LvL5WdCjR2oQbK', // Replace with your actual Stripe price ID
        amount: 4999, // $49.99 in cents
        currency: 'usd',
        interval: 'year'
      }
    }

    const selectedPlan = plans[planId as keyof typeof plans]
    if (!selectedPlan) {
      console.error('Invalid plan ID:', planId)
      return new Response(
        JSON.stringify({ error: 'Invalid plan selected' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Selected plan:', selectedPlan)

    // Create Stripe checkout session
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'subscription',
        'line_items[0][price]': selectedPlan.priceId,
        'line_items[0][quantity]': '1',
        'success_url': `${req.headers.get('origin') || 'https://lovable.dev'}/results?success=true`,
        'cancel_url': `${req.headers.get('origin') || 'https://lovable.dev'}/pricing?canceled=true`,
        'customer_email': user.email || '',
        'client_reference_id': user.id,
        'metadata[user_id]': user.id,
        'metadata[plan_id]': planId,
      }),
    })

    console.log('Stripe response status:', stripeResponse.status)

    if (!stripeResponse.ok) {
      const errorText = await stripeResponse.text()
      console.error('Stripe API error:', {
        status: stripeResponse.status,
        statusText: stripeResponse.statusText,
        body: errorText
      })
      return new Response(
        JSON.stringify({ error: 'Failed to create checkout session' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const session = await stripeResponse.json()
    console.log('Stripe session created:', session.id)

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

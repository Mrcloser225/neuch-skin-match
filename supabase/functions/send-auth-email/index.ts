
import React from 'npm:react@18.3.1'
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0'
import { Resend } from 'npm:resend@4.0.0'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { AuthEmail } from './_templates/auth-email.tsx'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)
const hookSecret = Deno.env.get('SEND_AUTH_EMAIL_HOOK_SECRET') as string

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, webhook-id, webhook-timestamp, webhook-signature',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const payload = await req.text()
    console.log('Received webhook payload length:', payload.length)
    
    // Get headers for webhook verification
    const headers = Object.fromEntries(req.headers)
    console.log('Webhook headers:', JSON.stringify(headers, null, 2))
    
    // Only verify webhook if secret is configured AND verification headers are present
    if (hookSecret && (headers['webhook-signature'] || headers['svix-signature'])) {
      console.log('Webhook secret configured and signature present, verifying...')
      const wh = new Webhook(hookSecret)
      try {
        wh.verify(payload, headers)
        console.log('Webhook verification successful')
      } catch (error) {
        console.error('Webhook verification failed:', error)
        return new Response('Unauthorized', { status: 401 })
      }
    } else {
      console.log('Skipping webhook verification - either no secret configured or no signature headers present')
    }

    const webhookData = JSON.parse(payload)
    console.log('Parsed webhook data:', JSON.stringify(webhookData, null, 2))
    
    const {
      user,
      email_data: { token, token_hash, redirect_to, email_action_type },
    } = webhookData

    console.log('Processing auth email for:', user.email, 'Action:', email_action_type)

    // Render the email template
    const html = await renderAsync(
      React.createElement(AuthEmail, {
        supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
        token,
        token_hash,
        redirect_to,
        email_action_type,
        user_email: user.email,
      })
    )

    // Send the email
    const { error } = await resend.emails.send({
      from: 'Neuch <onboarding@resend.dev>',
      to: [user.email],
      subject: email_action_type === 'signup' ? 'Welcome to Neuch - Confirm Your Account' : 'Sign in to Neuch',
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log('Auth email sent successfully to:', user.email)

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    console.error('Send auth email error:', error)
    return new Response(
      JSON.stringify({
        error: {
          message: error.message,
          details: error.toString(),
        },
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
})

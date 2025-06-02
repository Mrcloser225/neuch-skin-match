
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Button,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface AuthEmailProps {
  supabase_url: string
  email_action_type: string
  redirect_to: string
  token_hash: string
  token: string
  user_email: string
}

export const AuthEmail = ({
  token,
  supabase_url,
  email_action_type,
  redirect_to,
  token_hash,
  user_email,
}: AuthEmailProps) => {
  const actionText = email_action_type === 'signup' ? 'confirm your account' : 'sign in to your account';
  const headingText = email_action_type === 'signup' ? 'Welcome to Neuch!' : 'Sign in to Neuch';
  const confirmUrl = `${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`;

  return (
    <Html>
      <Head />
      <Preview>{actionText.charAt(0).toUpperCase() + actionText.slice(1)} - Neuch Skin Match</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Text style={logo}>Neuch</Text>
          </Section>
          
          <Heading style={h1}>{headingText}</Heading>
          
          <Text style={text}>
            Hi there! You're receiving this email because you're trying to {actionText} for the Neuch app.
          </Text>
          
          <Text style={text}>
            Click the button below to {actionText}:
          </Text>
          
          <Section style={buttonSection}>
            <Button
              href={confirmUrl}
              style={button}
            >
              {actionText.charAt(0).toUpperCase() + actionText.slice(1)}
            </Button>
          </Section>
          
          <Text style={text}>
            Or copy and paste this link into your browser:
          </Text>
          
          <Text style={linkText}>
            {confirmUrl}
          </Text>
          
          <Text style={disclaimer}>
            If you didn't request this email, you can safely ignore it. This link will expire in 24 hours.
          </Text>
          
          <Text style={footer}>
            Best regards,<br />
            The Neuch Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default AuthEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  paddingLeft: '20px',
  paddingRight: '20px',
  margin: '0 auto',
  maxWidth: '600px',
}

const logoSection = {
  textAlign: 'center' as const,
  paddingTop: '40px',
  paddingBottom: '20px',
}

const logo = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#1a1a1a',
  margin: '0',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px 0',
  textAlign: 'center' as const,
}

const text = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const buttonSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#1a1a1a',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
}

const linkText = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '20px',
  wordBreak: 'break-all' as const,
  backgroundColor: '#f5f5f5',
  padding: '12px',
  borderRadius: '4px',
  margin: '16px 0',
}

const disclaimer = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '32px 0 16px 0',
}

const footer = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '20px',
  marginTop: '32px',
  paddingTop: '20px',
  borderTop: '1px solid #eeeeee',
}

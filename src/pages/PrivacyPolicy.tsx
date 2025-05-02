
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <PageTransition>
      <div className="container max-w-4xl mx-auto p-4 sm:p-6">
        <header className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4 pl-0 hover:bg-transparent"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </Button>
          <h1 className="text-2xl font-semibold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: May 1, 2025</p>
          <Separator className="my-4" />
        </header>
        
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="space-y-6 pr-4">
            <section>
              <h2 className="text-xl font-semibold mb-3">Our Privacy Commitment</h2>
              <p className="mb-2">
                At Neuch, we believe your beauty journey should be personal, and so should your data. Your privacy isn't just a legal obligation for us—it's a core value.
              </p>
              <p>
                Founded by a team of beauty enthusiasts and tech innovators who were frustrated by the lack of inclusive foundation matching tools, we built Neuch with privacy by design. Our founding team includes experts in both cosmetic science and cybersecurity, ensuring that your data is not only useful but also protected at every step.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
              <p className="mb-2">Here's what we collect and why:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>Account information:</strong> When you create an account, we collect your name and email. We use this to personalize your experience and communicate with you about your account.
                </li>
                <li>
                  <strong>Skin analysis photos:</strong> These are the heart of our service. By default, these images stay local on your device. If you choose to save your analysis to your account, these photos are encrypted before transmission and storage.
                </li>
                <li>
                  <strong>Device information:</strong> We collect limited information about your device (like model and OS version) to optimize the camera functionality and ensure accurate skin tone analysis across different screens.
                </li>
                <li>
                  <strong>Foundation preferences:</strong> When you favorite products or record purchases, we store these preferences to improve your recommendations and shopping experience.
                </li>
                <li>
                  <strong>Usage analytics:</strong> We collect anonymous data about how you use our app to improve our features and user experience. This includes navigation patterns and feature engagement, but is never tied to your personal information.
                </li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">How Your Data Powers Neuch</h2>
              <p className="mb-2">Your data helps us:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Analyze your unique skin tone and provide accurate foundation matches</li>
                <li>Create personalized recommendations based on your skin type, preferences, and past favorites</li>
                <li>Improve our algorithms to better serve the diverse range of skin tones in our community</li>
                <li>Send you relevant updates about new compatible products or features</li>
                <li>Troubleshoot technical issues and enhance our user experience</li>
              </ul>
              <p className="mt-3">
                We never use your personal data to create marketing profiles or sell to third parties. Unlike many beauty apps, we don't monetize your data—we monetize our premium features.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Our Security Approach</h2>
              <p className="mb-2">
                Our security infrastructure was built by engineers with backgrounds from companies like Apple and Palantir. We implement:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>End-to-end encryption:</strong> All sensitive data is encrypted both in transit and at rest using AES-256 encryption</li>
                <li><strong>Local-first architecture:</strong> Your photos are processed on your device whenever possible</li>
                <li><strong>Encrypted cloud backup:</strong> When you save to your account, data is secured with multiple layers of encryption</li>
                <li><strong>Regular penetration testing:</strong> We conduct quarterly security audits with third-party experts</li>
                <li><strong>Role-based access control:</strong> Even within our team, access to user data is strictly limited and audited</li>
                <li><strong>Compliance certifications:</strong> Our infrastructure maintains SOC2 Type II and ISO 27001 compliance</li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Your Privacy Controls</h2>
              <p className="mb-2">
                We believe in giving you meaningful control over your data:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Privacy-first default settings:</strong> We start with the most private options selected</li>
                <li><strong>Local processing option:</strong> Choose to keep all analysis local on your device</li>
                <li><strong>Selective sharing:</strong> Decide exactly which results you want to save to your account</li>
                <li><strong>One-click data export:</strong> Download all your personal data anytime</li>
                <li><strong>Simple deletion:</strong> Permanently remove any or all of your data from our servers</li>
                <li><strong>Privacy dashboard:</strong> View and manage all your privacy settings in one place</li>
              </ul>
              <p className="mt-3">
                To access these controls, visit the Privacy section in your app settings, or email our dedicated privacy team.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Your Rights Under GDPR, CCPA & Global Regulations</h2>
              <p className="mb-2">
                Regardless of where you live, we extend core privacy rights to all users:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>The right to access all your personal data</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to delete your data (we complete deletion requests within 7 days)</li>
                <li>The right to data portability in standard formats</li>
                <li>The right to object to certain data processing</li>
                <li>The right to withdraw consent at any time</li>
              </ul>
              <p className="mt-3">
                For European users, we serve as the data controller under GDPR. For California residents, we comply with all CCPA requirements including the right to opt-out of data sales (though we never sell your data anyway).
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Data Storage & Retention</h2>
              <p className="mb-2">
                We store your data on secure AWS servers in the US and EU. We keep your personal information only as long as necessary to provide our services or to comply with our legal obligations.
              </p>
              <p className="mb-2">
                For active accounts:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Account information is retained while your account is active</li>
                <li>Skin analysis photos are kept for 90 days unless you specifically save them</li>
                <li>Saved analyses and preferences are kept until you delete them</li>
              </ul>
              <p className="mt-3 mb-2">
                For inactive accounts:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>We send a reminder after 6 months of inactivity</li>
                <li>After 12 months of inactivity, we anonymize your personal data</li>
                <li>You can request complete deletion at any time</li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Our Privacy Team</h2>
              <p className="mb-2">
                Our dedicated privacy team is led by our co-founder and Chief Privacy Officer, who oversees all data protection efforts. We aim to respond to all privacy inquiries within 24 hours.
              </p>
              <p>
                For questions, concerns, or to exercise your privacy rights:
                <br />
                <a href="mailto:privacy@neuch.app" className="text-primary hover:underline">
                  privacy@neuch.app
                </a>
              </p>
              <p className="mt-3">
                Neuch, Inc.<br />
                548 Market Street<br />
                San Francisco, CA 94104
              </p>
            </section>
          </div>
        </ScrollArea>
      </div>
    </PageTransition>
  );
};

export default PrivacyPolicy;

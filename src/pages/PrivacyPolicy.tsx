
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
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          <Separator className="my-4" />
        </header>
        
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="space-y-6 pr-4">
            <section>
              <h2 className="text-xl font-semibold mb-3">Introduction</h2>
              <p className="mb-2">
                At Neuch, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
              </p>
              <p>
                We value the trust you place in us and recognize the importance of secure transactions and information privacy. Please read this policy carefully to understand our practices regarding your personal data.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
              <p className="mb-2">We collect information in the following ways:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>Information you provide to us:</strong> This includes account creation details, skin analysis photos, and any other information you directly provide.
                </li>
                <li>
                  <strong>Camera permission:</strong> We request camera access to analyze your skin tone. These images are only stored locally unless you explicitly save your results.
                </li>
                <li>
                  <strong>Device information:</strong> We collect device-specific information such as operating system version and device type to optimize your experience.
                </li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
              <p className="mb-2">We use the information we collect to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and analyze your skin tone to provide accurate recommendations</li>
                <li>Communicate with you about your account, recommendations, and other notices</li>
                <li>Protect against and prevent fraud, unauthorized transactions, and other illegal activities</li>
                <li>Troubleshoot problems and improve the user experience</li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Data Storage and Security</h2>
              <p className="mb-2">
                We implement a variety of security measures to maintain the safety of your personal information:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>User data is encrypted during transmission and at rest</li>
                <li>Personal skin photos are stored locally on your device by default</li>
                <li>Account authentication follows industry best practices</li>
                <li>Regular security audits and updates are performed</li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Your Rights Under GDPR, CCPA, and Other Regulations</h2>
              <p className="mb-2">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Right to access personal data we hold about you</li>
                <li>Right to request correction of inaccurate information</li>
                <li>Right to request deletion of your data</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent at any time</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us using the details provided below.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please contact us at:
                <br />
                <a href="mailto:privacy@neuch.app" className="text-primary hover:underline">
                  privacy@neuch.app
                </a>
              </p>
            </section>
          </div>
        </ScrollArea>
      </div>
    </PageTransition>
  );
};

export default PrivacyPolicy;

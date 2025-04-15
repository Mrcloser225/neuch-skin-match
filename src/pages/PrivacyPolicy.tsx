
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
                We value the trust you place in us and recognize the importance of secure transactions and information privacy. We are committed to maintaining compliance with applicable data protection regulations, including GDPR, CCPA, and industry standards like SOC2 and ISO 27001.
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
                  <strong>Camera permission:</strong> We request camera access to analyze your skin tone. These images are only stored locally on your device unless you explicitly save your results to your account.
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
              <h2 className="text-xl font-semibold mb-3">Data Security</h2>
              <p className="mb-2">
                We implement comprehensive security measures to maintain the safety of your personal information:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>All user data is encrypted in transit using TLS 1.2+ and at rest using AES-256 encryption</li>
                <li>Personal skin photos are stored locally on your device by default</li>
                <li>If you choose to save analysis results to your account, data is encrypted and stored in compliance with SOC2 and ISO 27001 standards</li>
                <li>We employ session timeout mechanisms and automatic logout for idle sessions</li>
                <li>We implement role-based access controls for our internal systems</li>
                <li>Regular security assessments, penetration tests, and vulnerability scans are conducted</li>
                <li>We maintain a comprehensive incident response plan</li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Compliance and Certifications</h2>
              <p className="mb-2">
                Neuch is committed to maintaining the highest standards of data protection and privacy:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Our security practices align with SOC2 Type II requirements for security, availability, and confidentiality</li>
                <li>We maintain compliance with ISO 27001 standards for information security management</li>
                <li>Regular independent third-party audits verify our compliance with industry standards</li>
                <li>We adhere to GDPR, CCPA, and other applicable data protection regulations</li>
                <li>Our staff undergoes regular security awareness training</li>
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
                <li>Right to request deletion of your data (right to be forgotten)</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent at any time</li>
                <li>Right to object to processing of your personal data</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us using the details provided below.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Data Retention</h2>
              <p className="mb-2">
                We retain your personal information only for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements.
              </p>
              <p>
                You can request deletion of your account and personal information at any time by contacting us.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
              <p>
                For questions about this Privacy Policy, to exercise your rights, or to report a security concern, please contact our Data Protection Officer at:
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

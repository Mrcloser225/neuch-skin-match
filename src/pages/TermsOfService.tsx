
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

const TermsOfService = () => {
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
          <h1 className="text-2xl font-semibold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          <Separator className="my-4" />
        </header>
        
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="space-y-6 pr-4">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Neuch, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our application.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Use of the Service</h2>
              <p className="mb-2">
                Neuch provides a skin tone analysis service to help users find matching foundation shades. You agree to use the service only for its intended purposes and in compliance with all applicable laws and regulations.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. User Content</h2>
              <p className="mb-2">
                You retain all rights to any content you submit, post, or display on or through the service, including photos taken for skin analysis.
              </p>
              <p>
                By using our service, you grant Neuch a non-exclusive, royalty-free license to use, process, and analyze your photos solely for the purpose of providing skin tone analysis results. We do not claim ownership of your content.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Security and Privacy</h2>
              <p className="mb-2">
                Your privacy and data security are of utmost importance to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using Neuch, you agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
              <p className="mb-2">
                We implement industry-standard security measures, including encryption, secure data storage, access controls, and regular security assessments, to protect your personal information. Our security practices align with SOC2 Type II and ISO 27001 standards.
              </p>
              <p>
                You acknowledge that no method of transmission over the Internet or method of electronic storage is 100% secure, and we strive to use commercially acceptable means to protect your personal information.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Account Security</h2>
              <p className="mb-2">
                You are responsible for safeguarding your account credentials and for any activities or actions under your account.
              </p>
              <p className="mb-2">
                We provide security features such as automatic session timeouts and account notifications. You agree to:
              </p>
              <ul className="list-disc ml-6 space-y-1 mb-2">
                <li>Maintain the confidentiality of your password</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Ensure that you log out of your account at the end of each session</li>
                <li>Use a secure and unique password for your Neuch account</li>
              </ul>
              <p>
                For enhanced security, we recommend enabling any additional security features we may offer, such as two-factor authentication when available.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Disclaimers and Limitations of Liability</h2>
              <p className="mb-2">
                The skin tone analysis and foundation matching recommendations are provided for reference purposes only. Results may vary based on lighting conditions, device camera quality, and other factors.
              </p>
              <p className="mb-2">
                NEUCH IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEUCH SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Compliance with Laws and Standards</h2>
              <p className="mb-2">
                Neuch strives to maintain compliance with relevant industry standards and certifications, including:
              </p>
              <ul className="list-disc ml-6 space-y-1 mb-2">
                <li>SOC2 Type II for security, availability, and confidentiality</li>
                <li>ISO 27001 for information security management</li>
                <li>GDPR, CCPA, and other applicable data protection regulations</li>
              </ul>
              <p>
                We are committed to maintaining these standards through regular audits, assessments, and continuous improvement of our security practices.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes through the application or by other means. Your continued use of Neuch after such modifications constitutes your acceptance of the updated terms.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which Neuch operates, without regard to its conflict of law principles.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, security concerns, or to report a potential vulnerability, please contact us at:
                <br />
                <a href="mailto:terms@neuch.app" className="text-primary hover:underline">
                  terms@neuch.app
                </a>
              </p>
            </section>
          </div>
        </ScrollArea>
      </div>
    </PageTransition>
  );
};

export default TermsOfService;


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
              <h2 className="text-xl font-semibold mb-3">4. Privacy</h2>
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using Neuch, you agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Disclaimers and Limitations of Liability</h2>
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
              <h2 className="text-xl font-semibold mb-3">6. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes through the application or by other means. Your continued use of Neuch after such modifications constitutes your acceptance of the updated terms.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which Neuch operates, without regard to its conflict of law principles.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
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

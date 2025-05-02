
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
          <p className="text-muted-foreground">Last updated: May 1, 2025</p>
          <Separator className="my-4" />
        </header>
        
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="space-y-6 pr-4">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Welcome to Neuch</h2>
              <p>
                Thanks for choosing Neuch! These Terms of Service ("Terms") govern your use of our application,
                website, and services (collectively, the "Services"). By accessing or using our Services, 
                you're agreeing to these Terms and our Privacy Policy. If you're using our Services on behalf 
                of an organization, you're agreeing to these Terms on behalf of that organization.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Using Neuch</h2>
              <p className="mb-2">
                Neuch provides advanced skin tone analysis technology to help you find perfect foundation matches.
                Our service analyzes images of your skin in various lighting conditions and provides personalized 
                foundation recommendations based on your unique skin characteristics.
              </p>
              <p>
                You're responsible for maintaining the security of your account and password. We can't and won't be 
                liable for any loss or damage from your failure to comply with this security obligation. You're responsible 
                for all content posted and activity that occurs under your account.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Your Content</h2>
              <p className="mb-2">
                You retain full ownership of any content you submit to Neuch, including your skin photos and analysis results.
                However, by using our Services, you grant us a limited license to use, store, and analyze your photos solely 
                for the purpose of providing and improving our Services.
              </p>
              <p>
                We respect your privacy. By default, your skin analysis photos are stored locally on your device. If you choose 
                to save your analysis to your account, we apply enterprise-grade security measures to protect your data. Read 
                our Privacy Policy to learn more about how we handle your information.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Our Proprietary Technology</h2>
              <p className="mb-2">
                Our proprietary skin analysis technology represents years of research and development at the intersection 
                of computer vision, cosmetic science, and machine learning. It's designed to work across a diverse range 
                of skin tones and conditions.
              </p>
              <p className="mb-2">
                While we continuously improve our technology, no system is perfect. Our recommendations are provided as guidance 
                based on available data. Factors like lighting conditions, camera quality, and product formulations can affect 
                results. We encourage testing samples when possible before purchasing full-sized products.
              </p>
              <p>
                All of our software, algorithms, and databases are protected by intellectual property law. Don't attempt to 
                reverse engineer, decompile, or discover the source code of our software.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Account Security & Premium Features</h2>
              <p className="mb-2">
                Your skin data is precious to us. That's why we've implemented industry-leading security measures to protect 
                your information, including end-to-end encryption, secure authentication mechanisms, and regular security audits.
              </p>
              <p className="mb-2">
                Some features of Neuch may require payment. By subscribing to a premium plan, you agree to pay the fees indicated 
                for that service. We may change our fees at any time, but we'll always notify you before those changes affect you.
              </p>
              <p>
                Subscriptions automatically renew unless you cancel in your account settings at least 24 hours before the end of 
                the current billing period. You can cancel anytime, but refunds are only provided as required by law.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Limitations & Disclaimers</h2>
              <p className="mb-2">
                While we strive for perfection, Neuch is provided "as is" without warranty of any kind. We don't warrant that 
                our Services will be uninterrupted or error-free, that defects will be corrected, or that our Services are free 
                of viruses or other harmful components.
              </p>
              <p className="mb-2">
                Neuch is not a medical device or diagnostic tool. Our skin analysis technology is designed to help you find 
                matching foundation shades, not to diagnose or treat skin conditions. If you have concerns about your skin 
                health, please consult a dermatologist.
              </p>
              <p>
                To the fullest extent permitted by law, Neuch shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, or any loss of profits or revenues.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Changes to These Terms</h2>
              <p>
                We're constantly improving our Services, which means these Terms may change. If we make material changes, 
                we'll notify you through the app or by email. Your continued use of our Services after such notification 
                constitutes your acceptance of the updated Terms. If you don't agree with the changes, you must stop using 
                our Services.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Governing Law</h2>
              <p>
                These Terms are governed by the laws of California, without regard to its conflict of laws provisions. 
                Any disputes arising under these Terms that can't be resolved amicably will be subject to binding arbitration 
                in San Francisco, California, under the rules of the American Arbitration Association.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Get In Touch</h2>
              <p>
                Questions about these Terms? We'd love to hear from you! Our team is always here to help with any questions 
                or concerns. Please reach out to our legal team at:
                <br />
                <a href="mailto:legal@neuch.app" className="text-primary hover:underline">
                  legal@neuch.app
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

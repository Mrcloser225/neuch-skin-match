
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, ChevronRight } from "lucide-react";

import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import HowItWorksModal from "@/components/HowItWorksModal";
import LanguageSelector from "@/components/LanguageSelector";
import LoginButton from "@/components/LoginButton";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const { t } = useLanguage();

  const startScan = () => {
    navigate("/camera");
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex items-center justify-between">
          <div className="flex-1 flex items-center">
            <LoginButton />
          </div>
          <Logo size="lg" className="flex-1 flex justify-center" />
          <div className="flex-1 flex justify-end">
            <LanguageSelector />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <motion.div
            className="max-w-2xl space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-neuch-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t("home.title")}
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-neuch-700 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t("home.subtitle")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button 
                variant="neu" 
                size="lg" 
                onClick={startScan}
                icon={<Camera size={20} />}
                className="text-lg px-8 py-4"
              >
                {t("home.start_button")}
              </Button>
              
              <button 
                className="flex items-center text-neuch-600 hover:text-neuch-800 transition-colors"
                onClick={() => setShowHowItWorks(true)}
              >
                {t("home.learn_how")}
                <ChevronRight size={20} className="ml-1" />
              </button>
            </motion.div>
          </motion.div>
        </main>

        <HowItWorksModal 
          isOpen={showHowItWorks} 
          onClose={() => setShowHowItWorks(false)} 
        />
      </div>
    </PageTransition>
  );
};

export default Index;

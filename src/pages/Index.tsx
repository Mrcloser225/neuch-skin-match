
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import HowItWorksModal from "@/components/HowItWorksModal";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-neuch-50 to-neuch-100 flex flex-col items-center justify-center p-6 font-lexend">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8 max-w-md"
        >
          <Logo size="lg" color="dark" className="mb-8" />
          
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl font-bold text-neuch-950 leading-tight"
            >
              {t("home.title")}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-neuch-700 leading-relaxed"
            >
              {t("home.subtitle")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            <Button
              onClick={() => navigate("/camera")}
              variant="primary"
              size="lg"
              className="w-full text-lg py-4"
              icon={<Camera size={24} />}
              iconPosition="left"
            >
              {t("home.start_button")}
            </Button>
            
            <button
              onClick={() => setShowHowItWorks(true)}
              className="text-neuch-600 hover:text-neuch-800 text-sm font-medium transition-colors duration-200"
            >
              {t("home.learn_how")}
            </button>
          </motion.div>
        </motion.div>

        <HowItWorksModal 
          isOpen={showHowItWorks} 
          onClose={() => setShowHowItWorks(false)} 
        />
      </div>
    </PageTransition>
  );
};

export default Index;

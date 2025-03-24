
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, ChevronRight } from "lucide-react";

import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import HowItWorksModal from "@/components/HowItWorksModal";

const Index = () => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const startScan = () => {
    navigate("/camera");
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <header className="p-6">
          <Logo size="lg" className="mx-auto" />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <motion.div
            className="max-w-md text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl font-serif font-medium tracking-tight text-neuch-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Find your perfect foundation match
            </motion.h1>
            
            <motion.p
              className="text-lg text-neuch-700 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Neuch analyzes your skin's unique undertone to recommend the ideal foundation shades for your complexion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button 
                variant="neu" 
                size="lg" 
                onClick={startScan}
                icon={<Camera size={18} />}
                className="mt-8"
              >
                Start Skin Analysis
              </Button>
            </motion.div>
          </motion.div>
        </main>

        <footer className="p-6">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button 
              className="flex items-center text-sm text-neuch-500 hover:text-neuch-700 transition-colors"
              onClick={() => setShowHowItWorks(true)}
            >
              Learn how it works
              <ChevronRight size={16} className="ml-1" />
            </button>
          </motion.div>
        </footer>

        <HowItWorksModal 
          isOpen={showHowItWorks} 
          onClose={() => setShowHowItWorks(false)} 
        />
      </div>
    </PageTransition>
  );
};

export default Index;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Camera, 
  ChevronRight, 
  Sparkles, 
  Users, 
  Target, 
  Shield, 
  Smartphone,
  Search,
  ShoppingBag,
  Palette,
  Eye,
  Heart,
  Apple,
  Play
} from "lucide-react";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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

        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <motion.div
            className="max-w-4xl space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-serif font-medium tracking-tight text-neuch-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t("home.hero.title")}
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-neuch-700 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t("home.hero.subtitle")}
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
                {t("home.hero.cta")}
              </Button>
              
              <button 
                className="flex items-center text-neuch-600 hover:text-neuch-800 transition-colors"
                onClick={() => setShowHowItWorks(true)}
              >
                {t("home.hero.learn_more")}
                <ChevronRight size={20} className="ml-1" />
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-6 bg-neuch-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl font-serif font-medium text-neuch-900 mb-4"
                variants={itemVariants}
              >
                {t("home.how_it_works.title")}
              </motion.h2>
              <motion.p 
                className="text-lg text-neuch-700 max-w-2xl mx-auto"
                variants={itemVariants}
              >
                {t("home.how_it_works.subtitle")}
              </motion.p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: Camera, title: t("home.how_it_works.step1.title"), desc: t("home.how_it_works.step1.desc") },
                { icon: Sparkles, title: t("home.how_it_works.step2.title"), desc: t("home.how_it_works.step2.desc") },
                { icon: Target, title: t("home.how_it_works.step3.title"), desc: t("home.how_it_works.step3.desc") },
                { icon: Heart, title: t("home.how_it_works.step4.title"), desc: t("home.how_it_works.step4.desc") }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center glass-card p-6"
                  variants={itemVariants}
                >
                  <div className="w-16 h-16 bg-neuch-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon size={24} className="text-neuch-800" />
                  </div>
                  <h3 className="text-lg font-medium text-neuch-900 mb-2">{step.title}</h3>
                  <p className="text-neuch-600 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl font-serif font-medium text-neuch-900 mb-4"
                variants={itemVariants}
              >
                {t("home.features.title")}
              </motion.h2>
              <motion.p 
                className="text-lg text-neuch-700 max-w-2xl mx-auto"
                variants={itemVariants}
              >
                {t("home.features.subtitle")}
              </motion.p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: Eye, title: t("home.features.ai.title"), desc: t("home.features.ai.desc") },
                { icon: Palette, title: t("home.features.inclusive.title"), desc: t("home.features.inclusive.desc") },
                { icon: Shield, title: t("home.features.conditions.title"), desc: t("home.features.conditions.desc") },
                { icon: Search, title: t("home.features.brands.title"), desc: t("home.features.brands.desc") },
                { icon: Smartphone, title: t("home.features.mobile.title"), desc: t("home.features.mobile.desc") },
                { icon: Users, title: t("home.features.community.title"), desc: t("home.features.community.desc") }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-neuch-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon size={24} className="text-neuch-800" />
                  </div>
                  <h3 className="text-xl font-medium text-neuch-900 mb-2">{feature.title}</h3>
                  <p className="text-neuch-600">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Future Vision Section */}
        <section className="py-20 px-6 bg-neuch-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl font-serif font-medium mb-6"
                variants={itemVariants}
              >
                {t("home.future.title")}
              </motion.h2>
              <motion.p 
                className="text-xl text-neuch-100 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                {t("home.future.subtitle")}
              </motion.p>
              <motion.div
                className="flex justify-center"
                variants={itemVariants}
              >
                <div className="w-16 h-16 bg-neuch-700 rounded-full flex items-center justify-center">
                  <ShoppingBag size={24} className="text-neuch-100" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Download App Section */}
        <section className="py-20 px-6 bg-neuch-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl font-serif font-medium text-neuch-900 mb-6"
                variants={itemVariants}
              >
                {t("home.download.title")}
              </motion.h2>
              <motion.p 
                className="text-xl text-neuch-700 mb-12"
                variants={itemVariants}
              >
                {t("home.download.subtitle")}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                variants={itemVariants}
              >
                <a
                  href="#"
                  className="flex items-center bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <Apple size={24} className="mr-3" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">{t("home.download.available_on")}</div>
                    <div className="text-lg font-medium">{t("home.download.app_store")}</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <Play size={24} className="mr-3" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">{t("home.download.get_it_on")}</div>
                    <div className="text-lg font-medium">{t("home.download.google_play")}</div>
                  </div>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-6 bg-neuch-900 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <Logo size="md" color="light" className="mb-4" />
            <p className="text-neuch-300 text-sm">
              {t("home.footer.copyright")}
            </p>
          </div>
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

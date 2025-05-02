
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorksModal = ({ isOpen, onClose }: HowItWorksModalProps) => {
  const { t, isRtl } = useLanguage();
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`sm:max-w-[600px] p-0 overflow-hidden bg-neuch-50 ${isRtl ? 'rtl' : 'ltr'}`}>
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-serif text-neuch-900">
              {t("how.title")}
            </DialogTitle>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full flex items-center justify-center text-neuch-500 hover:text-neuch-700 hover:bg-neuch-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="capture" className="p-6 pt-2">
          <TabsList className="mb-6 bg-neuch-100 p-1">
            <TabsTrigger value="capture" className="text-sm">
              {t("how.step1")}
            </TabsTrigger>
            <TabsTrigger value="analyze" className="text-sm">
              {t("how.step2")}
            </TabsTrigger>
            <TabsTrigger value="match" className="text-sm">
              {t("how.step3")}
            </TabsTrigger>
            <TabsTrigger value="save" className="text-sm">
              {t("how.step4")}
            </TabsTrigger>
          </TabsList>

          <div className="space-y-6">
            <TabsContent value="capture" className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="text-lg font-medium text-neuch-900 mb-2">{t("how.capture.title")}</h3>
                <p className="text-neuch-700">
                  {t("how.capture.description")}
                </p>
              </div>
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-64 h-64 rounded-xl overflow-hidden flex items-center justify-center shadow-lg"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1599008633840-052c7f756385?q=80&w=2070&auto=format&fit=crop"
                    alt="AI generated model with light skin tone and makeup" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="analyze" className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="text-lg font-medium text-neuch-900 mb-2">{t("how.analyze.title")}</h3>
                <p className="text-neuch-700">
                  {t("how.analyze.description")}
                </p>
              </div>
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-64 h-64 rounded-xl overflow-hidden flex items-center justify-center shadow-lg"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=2074&auto=format&fit=crop" 
                    alt="AI generated model with medium skin tone and makeup"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="match" className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="text-lg font-medium text-neuch-900 mb-2">{t("how.match.title")}</h3>
                <p className="text-neuch-700">
                  {t("how.match.description")}
                </p>
              </div>
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-64 h-64 rounded-xl overflow-hidden flex items-center justify-center shadow-lg"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=2070&auto=format&fit=crop" 
                    alt="AI generated model with dark skin tone and makeup"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="save" className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="text-lg font-medium text-neuch-900 mb-2">{t("how.save.title")}</h3>
                <p className="text-neuch-700">
                  {t("how.save.description")}
                </p>
              </div>
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-64 h-64 rounded-xl overflow-hidden flex items-center justify-center shadow-lg"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop" 
                    alt="AI generated model with olive skin tone and makeup"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </TabsContent>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-neuch-500">
              {t("how.footer")}
            </p>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksModal;


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
                    src="https://images.unsplash.com/photo-1674108334080-4d0ee2708413?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Woman taking a selfie in good lighting" 
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
                    src="https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="AI analyzing skin undertones"
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
                    src="https://images.unsplash.com/photo-1596704017254-9b5e86781bd5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Foundation products matched to skin tone"
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
                    src="https://images.unsplash.com/photo-1611080541377-1a92ff81de9e?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Woman saving her foundation matches"
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


import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorksModal = ({ isOpen, onClose }: HowItWorksModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-neuch-50">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-serif text-neuch-900">
              How Neuch Works
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
              1. Capture
            </TabsTrigger>
            <TabsTrigger value="analyze" className="text-sm">
              2. Analyze
            </TabsTrigger>
            <TabsTrigger value="match" className="text-sm">
              3. Match
            </TabsTrigger>
            <TabsTrigger value="save" className="text-sm">
              4. Save
            </TabsTrigger>
          </TabsList>

          <div className="space-y-6">
            <TabsContent value="capture" className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="text-lg font-medium text-neuch-900 mb-2">Take a Clear Selfie</h3>
                <p className="text-neuch-700">
                  Use your device's camera to take a well-lit photo of your face in natural light. 
                  Our app provides guidance for optimal lighting conditions.
                </p>
              </div>
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-64 h-64 rounded-xl bg-neuch-200 overflow-hidden flex items-center justify-center"
                >
                  <div className="text-5xl text-neuch-400">📸</div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="analyze" className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="text-lg font-medium text-neuch-900 mb-2">AI Analysis</h3>
                <p className="text-neuch-700">
                  Our advanced AI technology analyzes your skin's undertone and tone from the photo. 
                  The system accounts for different skin conditions and lighting variations.
                </p>
              </div>
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-64 h-64 rounded-xl bg-neuch-200 overflow-hidden flex items-center justify-center"
                >
                  <div className="text-5xl text-neuch-400">🔍</div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="match" className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="text-lg font-medium text-neuch-900 mb-2">Find Your Perfect Match</h3>
                <p className="text-neuch-700">
                  Based on your unique skin profile, we recommend foundation shades from various brands that will 
                  perfectly match your complexion, focusing on cool, neutral, and olive undertones.
                </p>
              </div>
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-64 h-64 rounded-xl bg-neuch-200 overflow-hidden flex items-center justify-center"
                >
                  <div className="text-5xl text-neuch-400">✨</div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="save" className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="text-lg font-medium text-neuch-900 mb-2">Save Your Favorites</h3>
                <p className="text-neuch-700">
                  Create an account to save your recommended shades and access them anytime. 
                  Premium subscribers get additional features like unlimited shade matches, and detailed comparisons.
                </p>
              </div>
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-64 h-64 rounded-xl bg-neuch-200 overflow-hidden flex items-center justify-center"
                >
                  <div className="text-5xl text-neuch-400">💎</div>
                </motion.div>
              </div>
            </TabsContent>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-neuch-500">
              Neuch uses advanced AI to help all skin types find their perfect foundation match.
              For the best results, take photos in natural light and follow the in-app guidance.
            </p>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksModal;

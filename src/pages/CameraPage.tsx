
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera as CameraIcon, Upload, Info } from "lucide-react";

import PageTransition from "@/components/PageTransition";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import { Camera } from "@/components/index";
import Button from "@/components/Button";
import { useSkin } from "@/contexts/SkinContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import LanguageSelector from "@/components/LanguageSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";

const CameraPage = () => {
  const navigate = useNavigate();
  const { setCapturedImage, setSkinCondition, skinCondition, isLoggedIn, subscriptionTier } = useSkin();
  const { t, isRtl } = useLanguage();
  const [showCamera, setShowCamera] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleCapture = (image: string) => {
    setCapturedImage(image);
    setShowCamera(false);
    navigate("/analysis");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCapturedImage(result);
        navigate("/analysis");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkinConditionChange = (value: string) => {
    setSkinCondition(value as "normal" | "eczema" | "vitiligo" | "albinism" | "hyperpigmentation" | null);
  };

  return (
    <PageTransition>
      <div className={`min-h-screen flex flex-col bg-gradient-to-b from-neuch-50 to-neuch-100 ${isRtl ? 'rtl' : 'ltr'}`}>
        <header className="p-6 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-neuch-200">
          <BackButton to="/" />
          <Logo className="mx-auto" />
          <LanguageSelector />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <motion.div
            className="max-w-md w-full bg-white rounded-xl shadow-sm border border-neuch-200 p-6 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-medium text-neuch-900">
                {t("camera.title")}
              </h1>
              
              <p className="text-neuch-600">
                {t("camera.subtitle")}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-neuch-800">
                    {t("camera.skin_condition")}
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          className="text-neuch-500 hover:text-neuch-700"
                          onClick={() => setIsInfoOpen(!isInfoOpen)}
                        >
                          <Info size={16} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{t("camera.info_title")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Select 
                  value={skinCondition || "normal"} 
                  onValueChange={handleSkinConditionChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("camera.skin_condition")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">{t("camera.condition.normal")}</SelectItem>
                    <SelectItem value="eczema">{t("camera.condition.eczema")}</SelectItem>
                    <SelectItem value="vitiligo">{t("camera.condition.vitiligo")}</SelectItem>
                    <SelectItem value="albinism">{t("camera.condition.albinism")}</SelectItem>
                    <SelectItem value="hyperpigmentation">{t("camera.condition.hyperpigmentation")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Collapsible open={isInfoOpen} onOpenChange={setIsInfoOpen}>
                <CollapsibleContent>
                  <div className="text-xs text-neuch-600 bg-neuch-50 p-3 rounded-md mt-1 mb-3">
                    <p>{t("camera.info_title")}</p>
                    <ul className="mt-1 list-disc pl-4 space-y-1">
                      <li>{t("camera.info.eczema")}</li>
                      <li>{t("camera.info.vitiligo")}</li>
                      <li>{t("camera.info.albinism")}</li>
                      <li>{t("camera.info.hyperpigmentation")}</li>
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="py-2">
                <Button 
                  variant="neu" 
                  size="lg" 
                  onClick={() => setShowCamera(true)}
                  icon={<CameraIcon size={18} />}
                  className="w-full bg-neuch-800 text-white hover:bg-neuch-700"
                >
                  {t("camera.take_selfie")}
                </Button>
              </div>
              
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-neuch-300"
                  icon={<Upload size={18} />}
                >
                  {t("camera.upload_photo")}
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {!isLoggedIn && (
              <div className="mt-6 pt-4 border-t border-neuch-200">
                <div className="text-center text-sm text-neuch-600">
                  <p className="mb-2">
                    {subscriptionTier === "free" ? 
                      t("camera.premium_message") : 
                      t("camera.signin_message")}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-neuch-300 text-neuch-800"
                      onClick={() => navigate("/login")}
                    >
                      {t("camera.signin")}
                    </Button>
                    {subscriptionTier === "free" && (
                      <Button 
                        variant="primary" 
                        size="sm"
                        className="bg-neuch-800 text-white"
                        onClick={() => navigate("/pricing")}
                      >
                        {t("camera.upgrade")}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </main>

        {showCamera && (
          <Camera
            onCapture={handleCapture}
            onClose={() => setShowCamera(false)}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default CameraPage;

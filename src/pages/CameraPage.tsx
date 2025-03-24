
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera as CameraIcon, Upload } from "lucide-react";

import PageTransition from "@/components/PageTransition";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import Camera from "@/components/Camera";
import Button from "@/components/Button";
import { useSkin } from "@/contexts/SkinContext";

const CameraPage = () => {
  const navigate = useNavigate();
  const { setCapturedImage } = useSkin();
  const [showCamera, setShowCamera] = useState(false);

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

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <header className="p-6 flex items-center">
          <BackButton to="/" />
          <Logo className="mx-auto" />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <motion.div
            className="max-w-md text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl font-medium text-neuch-900">
              Take a clear selfie
            </h1>
            
            <p className="text-neuch-600">
              For best results, take a photo in natural light without makeup.
            </p>

            <div className="space-y-4 mt-8">
              <Button 
                variant="neu" 
                size="lg" 
                onClick={() => setShowCamera(true)}
                icon={<CameraIcon size={18} />}
                className="w-full"
              >
                Take a selfie
              </Button>
              
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  icon={<Upload size={18} />}
                >
                  Upload a photo
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>
            </div>
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

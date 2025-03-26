
import { useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useSkin } from "@/contexts/SkinContext";

import { useCameraStream } from "./useCameraStream";
import { useLightingQuality } from "./useLightingQuality";
import CaptureImage from "./CaptureImage";
import CameraLoader from "./CameraLoader";
import SkinConditionIndicator from "./SkinConditionIndicator";
import LightingIndicator from "./LightingIndicator";
import CameraInstructions from "./CameraInstructions";
import CaptureButton from "./CaptureButton";

interface CameraProps {
  onCapture: (image: string) => void;
  onClose: () => void;
}

const Camera = ({ onCapture, onClose }: CameraProps) => {
  const { skinCondition } = useSkin();
  const { videoRef, isLoading } = useCameraStream();
  const { canvasRef, lightingQuality } = useLightingQuality(videoRef);
  const captureImageRef = useRef(null);
  
  const handleCaptureClick = () => {
    const captureImage = CaptureImage({ 
      videoRef, 
      canvasRef, 
      onCapture 
    });
    
    captureImage.takePicture();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <motion.button
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <X size={24} />
      </motion.button>

      <motion.div
        className="relative w-full h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {isLoading && <CameraLoader />}

        <SkinConditionIndicator skinCondition={skinCondition} />

        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        <canvas ref={canvasRef} className="hidden" />

        <LightingIndicator lightingQuality={lightingQuality} />

        <motion.div
          className="absolute left-0 right-0 bottom-0 flex flex-col items-center justify-center p-8 gap-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 20 }}
        >
          <CameraInstructions />
          
          <CaptureButton onCapture={handleCaptureClick} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Camera;

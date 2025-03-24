
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera as CameraIcon, X, Sun, CloudSun, Moon, AlertCircle } from "lucide-react";
import { useSkin } from "@/contexts/SkinContext";

interface CameraProps {
  onCapture: (image: string) => void;
  onClose: () => void;
}

const Camera = ({ onCapture, onClose }: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lightingQuality, setLightingQuality] = useState<"good" | "medium" | "poor" | null>(null);
  const { skinCondition } = useSkin();

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsLoading(false);
          
          // Start checking lighting quality after camera is initialized
          setTimeout(checkLightingQuality, 1000);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setIsLoading(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Function to assess lighting quality based on image brightness
  const checkLightingQuality = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Calculate average brightness
      let sum = 0;
      for (let i = 0; i < data.length; i += 4) {
        // Convert RGB to brightness value
        sum += (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
      }
      const avgBrightness = sum / (data.length / 4);
      
      // Determine lighting quality based on brightness
      if (avgBrightness > 150) {
        setLightingQuality("good");
      } else if (avgBrightness > 100) {
        setLightingQuality("medium");
      } else {
        setLightingQuality("poor");
      }
      
      // Continue checking lighting every 2 seconds
      setTimeout(checkLightingQuality, 2000);
    }
  };

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL("image/jpeg");
        onCapture(dataUrl);
      }
    }
  };

  const getLightingIcon = () => {
    switch (lightingQuality) {
      case "good": return <Sun size={20} className="text-green-500" />;
      case "medium": return <CloudSun size={20} className="text-amber-500" />;
      case "poor": return <Moon size={20} className="text-red-500" />;
      default: return null;
    }
  };

  const getLightingMessage = () => {
    switch (lightingQuality) {
      case "good": return "Great lighting! Ready to capture.";
      case "medium": return "Decent lighting. Try to find more natural light.";
      case "poor": return "Poor lighting. Move to a brighter area for best results.";
      default: return "Assessing lighting...";
    }
  };

  const getSkinConditionMessage = () => {
    if (!skinCondition) return null;
    
    return (
      <div className="absolute left-4 top-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5">
        <AlertCircle size={14} />
        <span>Analyzing for {skinCondition} skin</span>
      </div>
    );
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
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-pulse-subtle">
                <CameraIcon size={36} />
              </div>
              <p className="text-sm opacity-80">Accessing camera...</p>
            </div>
          </div>
        )}

        {getSkinConditionMessage()}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        <canvas ref={canvasRef} className="hidden" />

        {lightingQuality && (
          <motion.div 
            className="absolute top-16 left-0 right-0 flex items-center justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-black/50 text-white px-4 py-2 rounded-full flex items-center gap-2">
              {getLightingIcon()}
              <span className="text-sm">{getLightingMessage()}</span>
            </div>
          </motion.div>
        )}

        <motion.div
          className="absolute left-0 right-0 bottom-0 flex flex-col items-center justify-center p-8 gap-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 20 }}
        >
          <div className="w-full max-w-sm bg-black/40 backdrop-blur-md p-4 rounded-xl">
            <p className="text-white text-center text-sm mb-2">
              For best skin tone detection:
            </p>
            <ul className="text-white/80 text-xs space-y-1">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                <span>Use natural lighting (near a window)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                <span>Remove makeup for accurate results</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                <span>Face the camera directly</span>
              </li>
            </ul>
          </div>
          
          <motion.button
            className="w-16 h-16 rounded-full border-4 border-white bg-white/20 backdrop-blur-sm"
            onClick={takePicture}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Camera;

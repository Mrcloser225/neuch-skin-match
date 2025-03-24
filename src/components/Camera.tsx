
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera as CameraIcon, X } from "lucide-react";

interface CameraProps {
  onCapture: (image: string) => void;
  onClose: () => void;
}

const Camera = ({ onCapture, onClose }: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsLoading(false);
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

        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        <canvas ref={canvasRef} className="hidden" />

        <motion.div
          className="absolute left-0 right-0 bottom-0 flex items-center justify-center p-8"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 20 }}
        >
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

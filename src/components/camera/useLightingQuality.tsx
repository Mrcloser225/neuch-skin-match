
import { useEffect, useRef, useState } from "react";

export const useLightingQuality = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lightingQuality, setLightingQuality] = useState<"good" | "medium" | "poor" | null>(null);

  useEffect(() => {
    let timeoutId: number;

    const checkLightingQuality = () => {
      if (!videoRef.current || !canvasRef.current || !videoRef.current.videoWidth) {
        timeoutId = window.setTimeout(checkLightingQuality, 1000);
        return;
      }
      
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
        timeoutId = window.setTimeout(checkLightingQuality, 2000);
      }
    };

    // Start checking lighting quality after camera is initialized
    timeoutId = window.setTimeout(checkLightingQuality, 1000);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [videoRef]);

  return { canvasRef, lightingQuality };
};

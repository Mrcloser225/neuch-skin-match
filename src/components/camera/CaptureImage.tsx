
import { useRef } from "react";

interface CaptureImageProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onCapture: (dataUrl: string) => void;
}

const CaptureImage = ({ videoRef, canvasRef, onCapture }: CaptureImageProps) => {
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

  return { takePicture };
};

export default CaptureImage;

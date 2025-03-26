
import { motion } from "framer-motion";

const CameraInstructions = () => {
  return (
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
  );
};

export default CameraInstructions;

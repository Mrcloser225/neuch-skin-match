
import { CameraIcon } from "lucide-react";

const CameraLoader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-pulse-subtle">
          <CameraIcon size={36} />
        </div>
        <p className="text-sm opacity-80">Accessing camera...</p>
      </div>
    </div>
  );
};

export default CameraLoader;

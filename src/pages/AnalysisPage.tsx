
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import UndertoneChip from "@/components/UndertoneChip";
import Button from "@/components/Button";
import { useSkin } from "@/contexts/SkinContext";

const AnalysisPage = () => {
  const navigate = useNavigate();
  const { capturedImage, setUndertone, setSkinTone } = useSkin();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisStage, setAnalysisStage] = useState(0);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [detectedUndertone, setDetectedUndertone] = useState<"cool" | "neutral" | "olive">("neutral");
  const [detectedTone, setDetectedTone] = useState("#D3A67F"); // Detected skin tone color

  useEffect(() => {
    if (!capturedImage) {
      navigate("/camera");
      return;
    }

    const stages = [
      "Scanning facial features...",
      "Analyzing skin luminosity...",
      "Determining undertone...",
      "Finalizing results...",
    ];

    // Simulate analysis stages
    const timer = setInterval(() => {
      setAnalysisStage((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setIsAnalyzing(false);
          setAnalysisDone(true);
          
          // Set detected values - in a real app this would come from AI analysis
          setUndertone(detectedUndertone);
          setSkinTone(detectedTone);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [capturedImage, navigate, detectedUndertone, detectedTone, setUndertone, setSkinTone]);

  const analysisStages = [
    "Scanning facial features...",
    "Analyzing skin luminosity...",
    "Determining undertone...",
    "Finalizing results...",
  ];

  const handleContinue = () => {
    navigate("/results");
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <header className="p-6 flex items-center justify-center">
          <Logo />
        </header>

        <main className="flex-1 flex flex-col items-center justify-between p-6">
          <div className="w-full max-w-md mx-auto">
            <div className="aspect-square rounded-2xl overflow-hidden border border-neuch-200 mb-6 relative">
              {capturedImage && (
                <img
                  src={capturedImage}
                  alt="Captured skin"
                  className="w-full h-full object-cover"
                />
              )}

              {isAnalyzing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="mb-4"
                  >
                    <Loader2 size={32} className="text-white" />
                  </motion.div>
                  <p className="text-white font-medium">
                    {analysisStages[analysisStage]}
                  </p>
                </div>
              )}

              {analysisDone && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/20 backdrop-blur-xs"
                >
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full p-1 shadow-subtle">
                    <Check size={20} className="text-green-600" />
                  </div>
                </motion.div>
              )}
            </div>

            {analysisDone && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  <h2 className="text-2xl font-medium text-neuch-900 mb-2">
                    Analysis Complete
                  </h2>
                  <p className="text-neuch-600">
                    We've detected your skin's characteristics
                  </p>
                </div>

                <div className="bg-neuch-50 rounded-xl p-4 space-y-4">
                  <div>
                    <p className="text-sm text-neuch-600 mb-2">Your undertone:</p>
                    <div className="flex flex-wrap gap-2">
                      <UndertoneChip 
                        type="cool" 
                        selected={detectedUndertone === "cool"} 
                        onClick={() => setDetectedUndertone("cool")}
                      />
                      <UndertoneChip
                        type="neutral"
                        selected={detectedUndertone === "neutral"}
                        onClick={() => setDetectedUndertone("neutral")}
                      />
                      <UndertoneChip
                        type="olive"
                        selected={detectedUndertone === "olive"}
                        onClick={() => setDetectedUndertone("olive")}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-neuch-600 mb-2">Your skin tone:</p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full border border-neuch-200"
                        style={{ backgroundColor: detectedTone }}
                      />
                      <span className="text-sm font-medium text-neuch-800 uppercase">
                        {detectedTone}
                      </span>
                    </div>
                  </div>
                </div>

                <Button variant="neu" size="lg" className="w-full" onClick={handleContinue}>
                  See Foundation Matches
                </Button>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default AnalysisPage;

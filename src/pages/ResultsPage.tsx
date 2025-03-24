
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, RefreshCw, Share2, ShoppingBag } from "lucide-react";

import PageTransition from "@/components/PageTransition";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import ShadeCard from "@/components/ShadeCard";
import ActionButton from "@/components/ActionButton";
import UndertoneChip from "@/components/UndertoneChip";
import { useSkin } from "@/contexts/SkinContext";
import { Foundation, getRecommendations } from "@/data/foundations";

interface Recommendation {
  foundation: Foundation;
  match: number;
}

const ResultsPage = () => {
  const navigate = useNavigate();
  const { undertone, skinTone, capturedImage } = useSkin();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    if (!undertone || !skinTone) {
      navigate("/");
      return;
    }

    // Get recommendations based on undertone and skin tone
    const results = getRecommendations(undertone, skinTone);
    setRecommendations(results);
  }, [undertone, skinTone, navigate]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const handleNewScan = () => {
    navigate("/camera");
  };

  if (!undertone || !skinTone) {
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <header className="p-6 flex items-center">
          <BackButton to="/analysis" />
          <Logo className="mx-auto" />
        </header>

        <main className="flex-1 flex flex-col p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-medium text-neuch-900">Your Perfect Matches</h1>
              {undertone && <UndertoneChip type={undertone} className="ml-auto" />}
            </div>

            {capturedImage && (
              <div className="flex gap-4 overflow-x-auto py-2 no-scrollbar">
                <div className="h-16 w-16 flex-shrink-0 rounded-full overflow-hidden border border-neuch-200">
                  <img
                    src={capturedImage}
                    alt="Your skin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="h-16 w-16 flex-shrink-0 rounded-full border border-neuch-200"
                  style={{ backgroundColor: skinTone }}
                />
              </div>
            )}

            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {recommendations.map(({ foundation, match }) => (
                <motion.div key={foundation.id} variants={item}>
                  <ShadeCard
                    brand={foundation.brand}
                    name={foundation.name}
                    shade={foundation.shade}
                    color={foundation.color}
                    match={match}
                    onClick={() => {}}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>

        <footer className="p-6 border-t border-neuch-100">
          <div className="flex justify-around">
            <ActionButton
              icon={<Heart size={18} className="text-neuch-700" />}
              label="Save"
              onClick={() => {}}
            />
            <ActionButton
              icon={<Share2 size={18} className="text-neuch-700" />}
              label="Share"
              onClick={() => {}}
            />
            <ActionButton
              icon={<ShoppingBag size={18} className="text-neuch-700" />}
              label="Shop"
              onClick={() => {}}
            />
            <ActionButton
              icon={<RefreshCw size={18} className="text-neuch-700" />}
              label="New Scan"
              onClick={handleNewScan}
            />
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default ResultsPage;

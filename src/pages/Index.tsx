
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Home, Heart, User } from "lucide-react";

import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("featured");
  const { t } = useLanguage();

  const featuredProducts = [
    {
      id: 1,
      name: "Fenty Radiant Glow Foundation",
      description: "Achieve a flawless complexion with our long-lasting foundation.",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Huda Beauty Velvet Touch Lipstick",
      description: "Enhance your lips with our creamy, vibrant lipstick.",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "Bobbi Brown Luminous Eyeshadow Palette",
      description: "Create stunning eye looks with our versatile palette.",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop&crop=center"
    }
  ];

  const categories = [
    {
      name: "Face",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center"
    },
    {
      name: "Eyes", 
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop&crop=center"
    },
    {
      name: "Lips",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&crop=center"
    },
    {
      name: "Skincare",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center"
    }
  ];

  const navigationTabs = [
    { id: "featured", label: "Featured" },
    { id: "new", label: "New" },
    { id: "bestsellers", label: "Best Sellers" },
    { id: "sets", label: "Sets" }
  ];

  return (
    <PageTransition>
      <div className="relative flex min-h-screen flex-col bg-white font-lexend">
        <div>
          {/* Header */}
          <div className="flex items-center bg-white p-4 pb-2 justify-between">
            <h2 className="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12">
              Neuch
            </h2>
            <div className="flex w-12 items-center justify-end">
              <button className="flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-[#141414]">
                <Search size={24} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="pb-3">
            <div className="flex border-b border-[#e0e0e0] px-4 gap-8">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                    activeTab === tab.id
                      ? "border-b-[#141414] text-[#141414]"
                      : "border-b-transparent text-[#757575]"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                    {tab.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Products Horizontal Scroll */}
          <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-stretch p-4 gap-3">
              {featuredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
                    style={{ backgroundImage: `url("${product.image}")` }}
                  />
                  <div>
                    <p className="text-[#141414] text-base font-medium leading-normal">
                      {product.name}
                    </p>
                    <p className="text-[#757575] text-sm font-normal leading-normal">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Shop by Category */}
          <h2 className="text-[#141414] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 gap-3 p-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="flex flex-col gap-3 pb-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{ backgroundImage: `url("${category.image}")` }}
                />
                <p className="text-[#141414] text-base font-medium leading-normal">
                  {category.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto">
          <div className="flex gap-2 border-t border-[#f2f2f2] bg-white px-4 pb-3 pt-2">
            <button className="flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#141414]">
              <div className="text-[#141414] flex h-8 items-center justify-center">
                <Home size={24} fill="currentColor" />
              </div>
            </button>
            <button className="flex flex-1 flex-col items-center justify-end gap-1 text-[#757575]">
              <div className="text-[#757575] flex h-8 items-center justify-center">
                <Heart size={24} />
              </div>
            </button>
            <button 
              className="flex flex-1 flex-col items-center justify-end gap-1 text-[#757575]"
              onClick={() => navigate("/camera")}
            >
              <div className="text-[#757575] flex h-8 items-center justify-center">
                <User size={24} />
              </div>
            </button>
          </div>
          <div className="h-5 bg-white" />
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;

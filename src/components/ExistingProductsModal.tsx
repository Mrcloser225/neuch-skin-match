
import { useState } from "react";
import { X, Search, Plus } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSkin } from "@/contexts/SkinContext";
import { toast } from "@/hooks/use-toast";

interface ExistingProduct {
  id: string;
  brand: string;
  name: string;
  shade: string;
  category: string;
}

interface ExistingProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularProducts: ExistingProduct[] = [
  { id: "1", brand: "Estée Lauder", name: "Double Wear Foundation", shade: "2N1 Desert Beige", category: "Foundation" },
  { id: "2", brand: "Charlotte Tilbury", name: "Beautiful Skin Foundation", shade: "12 Neutral", category: "Foundation" },
  { id: "3", brand: "Fenty Beauty", name: "Pro Filt'r Foundation", shade: "150", category: "Foundation" },
  { id: "4", brand: "NARS", name: "Natural Radiant Foundation", shade: "Gobi", category: "Foundation" },
  { id: "5", brand: "MAC", name: "Studio Fix Fluid", shade: "NC25", category: "Foundation" },
  { id: "6", brand: "YSL", name: "All Hours Foundation", shade: "B20", category: "Foundation" }
];

const ExistingProductsModal = ({ isOpen, onClose }: ExistingProductsModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<ExistingProduct[]>([]);
  const { subscriptionTier } = useSkin();

  const isPremium = subscriptionTier === "premium" || subscriptionTier === "lifetime";

  const filteredProducts = popularProducts.filter(product =>
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.shade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = (product: ExistingProduct) => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Adding existing products requires a premium subscription",
        variant: "destructive"
      });
      return;
    }

    if (!selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
      toast({
        title: "Product Added",
        description: `${product.brand} ${product.name} added to your profile`,
      });
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const handleSave = () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Saving existing products requires a premium subscription",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Products Saved",
      description: `${selectedProducts.length} products saved to your profile for better recommendations`,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-end"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="bg-white w-full h-[90vh] rounded-t-3xl overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">What products do you currently use?</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            Tell us about your current makeup products to get better personalized recommendations.
          </p>

          {!isPremium && (
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 mb-4 border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <Plus size={16} className="text-amber-600" />
                <h3 className="font-medium text-gray-900">Premium Feature</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Add your existing products to get AI-powered personalized recommendations.
              </p>
              <Button className="w-full bg-amber-500 hover:bg-amber-600">
                Upgrade to Premium
              </Button>
            </div>
          )}

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search for your products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-0"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {selectedProducts.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Your Selected Products</h3>
              <div className="space-y-2">
                {selectedProducts.map((product) => (
                  <Card key={product.id} className="bg-green-50 border-green-200">
                    <CardContent className="p-3 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{product.brand}</h4>
                        <p className="text-sm text-gray-600">{product.name} - {product.shade}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <X size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Popular Products</h3>
            <div className="space-y-3">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className={`cursor-pointer transition-all ${
                    selectedProducts.find(p => p.id === product.id) 
                      ? "bg-green-50 border-green-200" 
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleAddProduct(product)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{product.brand}</h4>
                        <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{product.name}</p>
                      <p className="text-sm text-gray-500">Shade: {product.shade}</p>
                    </div>
                    
                    <Button 
                      variant={selectedProducts.find(p => p.id === product.id) ? "default" : "outline"}
                      size="sm"
                      className="ml-4"
                    >
                      {selectedProducts.find(p => p.id === product.id) ? "Added" : "Add"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-white">
          <Button 
            onClick={handleSave}
            className="w-full bg-black hover:bg-gray-800"
            disabled={selectedProducts.length === 0 || !isPremium}
          >
            Save Products ({selectedProducts.length})
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExistingProductsModal;

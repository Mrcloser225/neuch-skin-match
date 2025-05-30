
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Heart, ShoppingBag, Star, ChevronDown, X } from "lucide-react";
import { motion } from "framer-motion";

import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useSkin } from "@/contexts/SkinContext";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  shades?: string[];
  category: string;
  isNew?: boolean;
  isOnSale?: boolean;
}

const mockProducts: Product[] = [
  {
    id: "1",
    brand: "Estée Lauder",
    name: "Double Wear Stay-in-Place Foundation",
    price: 42.00,
    originalPrice: 52.00,
    rating: 4.5,
    reviews: 2847,
    image: "/placeholder.svg",
    shades: ["1N1 Ivory Nude", "2N1 Desert Beige", "3N1 Ivory Beige"],
    category: "Foundation",
    isOnSale: true
  },
  {
    id: "2",
    brand: "Charlotte Tilbury",
    name: "Beautiful Skin Foundation",
    price: 44.00,
    rating: 4.7,
    reviews: 1523,
    image: "/placeholder.svg",
    shades: ["1 Fair", "3 Light", "5 Medium"],
    category: "Foundation",
    isNew: true
  },
  {
    id: "3",
    brand: "Fenty Beauty",
    name: "Pro Filt'r Soft Matte Foundation",
    price: 36.00,
    rating: 4.6,
    reviews: 3241,
    image: "/placeholder.svg",
    shades: ["110", "150", "200", "240"],
    category: "Foundation"
  },
  {
    id: "4",
    brand: "NARS",
    name: "Natural Radiant Longwear Foundation",
    price: 48.00,
    rating: 4.4,
    reviews: 1876,
    image: "/placeholder.svg",
    shades: ["Gobi", "Stromboli", "Cadiz"],
    category: "Foundation"
  }
];

const categories = ["All", "Foundation", "Concealer", "Powder", "Primer", "Skincare"];
const brands = ["All", "Estée Lauder", "Charlotte Tilbury", "Fenty Beauty", "NARS", "MAC", "YSL"];
const priceRanges = ["All", "Under $25", "$25-$50", "$50-$75", "Over $75"];

const ShopPage = () => {
  const navigate = useNavigate();
  const { subscriptionTier } = useSkin();
  const [products] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  const isPremium = subscriptionTier === "premium" || subscriptionTier === "lifetime";

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
    
    let matchesPrice = true;
    if (selectedPriceRange !== "All") {
      switch (selectedPriceRange) {
        case "Under $25":
          matchesPrice = product.price < 25;
          break;
        case "$25-$50":
          matchesPrice = product.price >= 25 && product.price <= 50;
          break;
        case "$50-$75":
          matchesPrice = product.price >= 50 && product.price <= 75;
          break;
        case "Over $75":
          matchesPrice = product.price > 75;
          break;
      }
    }

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  const handleProductClick = (product: Product) => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Shopping features require a premium subscription",
        variant: "destructive"
      });
      navigate("/pricing");
      return;
    }
    
    toast({
      title: "Product Details",
      description: `Viewing ${product.brand} ${product.name}`,
    });
  };

  const handleAddToWishlist = (product: Product) => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Wishlist features require a premium subscription",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Added to Wishlist",
      description: `${product.brand} ${product.name} added to your wishlist`,
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="px-4 py-3">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-2xl font-bold text-gray-900">SHOP</h1>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="ml-auto"
              >
                <Filter size={16} />
                Filters
              </Button>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-0"
              />
            </div>
          </div>
        </header>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white border-b border-gray-200 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                <X size={16} />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Brand</label>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <Button
                      key={brand}
                      variant={selectedBrand === brand ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedBrand(brand)}
                      className="text-xs"
                    >
                      {brand}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <Button
                      key={range}
                      variant={selectedPriceRange === range ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPriceRange(range)}
                      className="text-xs"
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sort Bar */}
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{filteredProducts.length} products</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-0 text-gray-900 font-medium"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <main className="p-4">
          {!isPremium && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6 border">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag size={18} className="text-gray-600" />
                <h3 className="font-semibold text-gray-900">Unlock Shopping Features</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Get full access to shopping, product details, and personalized recommendations with Premium.
              </p>
              <Button onClick={() => navigate("/pricing")} className="w-full bg-black hover:bg-gray-800">
                Upgrade to Premium
              </Button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover bg-gray-100"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(product);
                      }}
                    >
                      <Heart size={16} />
                    </Button>
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-black text-white">New</Badge>
                    )}
                    {product.isOnSale && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">Sale</Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-3">
                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">
                        {product.brand}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">{product.name}</p>
                      
                      <div className="flex items-center gap-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      
                      {product.shades && (
                        <div className="flex items-center gap-1 mt-2">
                          <span className="text-xs text-gray-500">{product.shades.length} shades</span>
                          <div className="flex gap-1">
                            {product.shades.slice(0, 3).map((shade, index) => (
                              <div
                                key={index}
                                className="w-3 h-3 rounded-full border border-gray-300 bg-gradient-to-r from-orange-200 to-orange-400"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around">
            <Button variant="ghost" className="flex-col gap-1 h-auto py-2" onClick={() => navigate("/shop")}>
              <ShoppingBag size={20} className="text-gray-900" />
              <span className="text-xs font-medium text-gray-900">Shop</span>
            </Button>
            <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
              <Heart size={20} className="text-gray-600" />
              <span className="text-xs text-gray-600">Wishlist</span>
            </Button>
            <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
              <Search size={20} className="text-gray-600" />
              <span className="text-xs text-gray-600">Discover</span>
            </Button>
            <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
              <ShoppingBag size={20} className="text-gray-600" />
              <span className="text-xs text-gray-600">Basket</span>
            </Button>
          </div>
        </nav>
      </div>
    </PageTransition>
  );
};

export default ShopPage;

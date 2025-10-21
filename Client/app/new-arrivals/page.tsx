"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Grid, List, Star, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Silk Evening Gown",
    brand: "Valentino",
    price: 89,
    originalPrice: 2890,
    discount: 15,
    image: "/elegant-silk-evening-gown.png",
    category: "Evening Wear",
    size: ["XS", "S", "M", "L"],
    color: "Burgundy",
    rating: 4.8,
    reviews: 24,
    occasion: "Formal",
    isNew: true,
    dateAdded: "2024-01-15",
  },
  {
    id: 4,
    name: "Designer Handbag",
    brand: "Hermès",
    price: 150,
    originalPrice: 8500,
    image: "/hermes-designer-handbag.png",
    category: "Accessories",
    size: ["One Size"],
    color: "Tan",
    rating: 5.0,
    reviews: 12,
    occasion: "Everyday",
    isNew: true,
    dateAdded: "2024-01-12",
  },
  {
    id: 6,
    name: "Statement Earrings",
    brand: "Tiffany & Co.",
    price: 45,
    originalPrice: 1200,
    discount: 20,
    image: "/tiffany-statement-earrings.png",
    category: "Jewelry",
    size: ["One Size"],
    color: "Gold",
    rating: 4.8,
    reviews: 15,
    occasion: "Formal",
    isNew: true,
    dateAdded: "2024-01-10",
  },
  {
    id: 9,
    name: "Leather Boots",
    brand: "Saint Laurent",
    price: 75,
    originalPrice: 1890,
    image: "/saint-laurent-leather-boots.png",
    category: "Shoes",
    size: ["36", "37", "38", "39", "40"],
    color: "Black",
    rating: 4.9,
    reviews: 8,
    occasion: "Everyday",
    isNew: true,
    dateAdded: "2024-01-08",
  },
  {
    id: 10,
    name: "Silk Scarf",
    brand: "Hermès",
    price: 35,
    originalPrice: 450,
    discount: 25,
    image: "/hermes-silk-scarf.png",
    category: "Accessories",
    size: ["One Size"],
    color: "Multi",
    rating: 4.7,
    reviews: 11,
    occasion: "Everyday",
    isNew: true,
    dateAdded: "2024-01-05",
  },
  {
    id: 11,
    name: "Wool Dress",
    brand: "The Row",
    price: 95,
    originalPrice: 2200,
    image: "/the-row-wool-dress.png",
    category: "Dresses",
    size: ["XS", "S", "M", "L"],
    color: "Cream",
    rating: 4.6,
    reviews: 14,
    occasion: "Business",
    isNew: true,
    dateAdded: "2024-01-03",
  },
  {
    id: 12,
    name: "Banarasi Silk Saree",
    brand: "Sabyasachi",
    price: 120,
    originalPrice: 3500,
    discount: 30,
    image: "/elegant-banarasi-silk-saree-in-deep-red-with-gold-.jpg",
    category: "Traditional Wear",
    size: ["One Size"],
    color: "Deep Red",
    rating: 4.9,
    reviews: 18,
    occasion: "Wedding",
    isNew: true,
    dateAdded: "2024-01-14",
  },
  {
    id: 13,
    name: "Designer Lehenga",
    brand: "Manish Malhotra",
    price: 200,
    originalPrice: 5500,
    image: "/luxury-designer-lehenga-in-royal-blue-with-heavy-e.jpg",
    category: "Traditional Wear",
    size: ["XS", "S", "M", "L", "XL"],
    color: "Royal Blue",
    rating: 4.8,
    reviews: 22,
    occasion: "Wedding",
    isNew: true,
    dateAdded: "2024-01-13",
  },
  {
    id: 14,
    name: "Embroidered Kurta Set",
    brand: "Anita Dongre",
    price: 65,
    originalPrice: 1800,
    discount: 10,
    image: "/elegant-embroidered-kurta-set-in-ivory-with-gold-t.jpg",
    category: "Traditional Wear",
    size: ["XS", "S", "M", "L", "XL"],
    color: "Ivory",
    rating: 4.7,
    reviews: 16,
    occasion: "Festive",
    isNew: true,
    dateAdded: "2024-01-11",
  },
  {
    id: 15,
    name: "Diamond Necklace Set",
    brand: "Tanishq",
    price: 180,
    originalPrice: 4200,
    discount: 35,
    image: "/elegant-diamond-necklace-set-with-matching-earring.jpg",
    category: "Jewelry",
    size: ["One Size"],
    color: "Silver",
    rating: 5.0,
    reviews: 9,
    occasion: "Wedding",
    isNew: true,
    dateAdded: "2024-01-09",
  },
  {
    id: 16,
    name: "Silk Blazer",
    brand: "Giorgio Armani",
    price: 110,
    originalPrice: 2800,
    image: "/luxury-silk-blazer-in-charcoal-grey.jpg",
    category: "Formal Wear",
    size: ["XS", "S", "M", "L"],
    color: "Charcoal",
    rating: 4.8,
    reviews: 13,
    occasion: "Business",
    isNew: true,
    dateAdded: "2024-01-07",
  },
  {
    id: 17,
    name: "Pearl Drop Earrings",
    brand: "Mikimoto",
    price: 85,
    originalPrice: 2100,
    discount: 15,
    image: "/elegant-pearl-drop-earrings-with-gold-setting.jpg",
    category: "Jewelry",
    size: ["One Size"],
    color: "Pearl White",
    rating: 4.9,
    reviews: 11,
    occasion: "Formal",
    isNew: true,
    dateAdded: "2024-01-06",
  },
]

const categories = [
  "All",
  "Dresses",
  "Evening Wear",
  "Traditional Wear",
  "Formal Wear",
  "Accessories",
  "Jewelry",
  "Shoes",
]
const brands = [
  "All",
  "Valentino",
  "Hermès",
  "Tiffany & Co.",
  "Saint Laurent",
  "The Row",
  "Sabyasachi",
  "Manish Malhotra",
  "Anita Dongre",
  "Tanishq",
  "Giorgio Armani",
  "Mikimoto",
]
const occasions = ["All", "Formal", "Business", "Everyday", "Wedding", "Festive"]

export default function NewArrivalsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedOccasion, setSelectedOccasion] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      if (selectedCategory !== "All" && product.category !== selectedCategory) return false
      if (selectedBrand !== "All" && product.brand !== selectedBrand) return false
      if (selectedOccasion !== "All" && product.occasion !== selectedOccasion) return false
      return true
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        break
      default:
        break
    }

    return filtered
  }, [selectedCategory, selectedBrand, selectedOccasion, sortBy])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles
              className="w-6 h-6 sm:w-8 sm:h-8 text-black animate-pulse"
              style={{
                animation: "sparkle 2s ease-in-out infinite",
                animationDelay: "0s",
              }}
            />
            <h1 className="text-2xl sm:text-4xl font-serif text-black">New Arrivals</h1>
            <Sparkles
              className="w-6 h-6 sm:w-8 sm:h-8 text-black animate-pulse"
              style={{
                animation: "sparkle 2s ease-in-out infinite",
                animationDelay: "1s",
              }}
            />
          </div>
          <p className="text-gray-600 text-sm sm:text-lg px-4">
            Discover the latest luxury pieces added to our collection
          </p>
          <div className="w-16 sm:w-24 h-0.5 bg-black mx-auto mt-4"></div>
        </div>

        {/* Filters Bar */}
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
          <div className="space-y-4">
            {/* Main filters - stack on mobile, grid on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs sm:text-sm font-medium text-gray-700 min-w-fit">Category:</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs sm:text-sm font-medium text-gray-700 min-w-fit">Brand:</label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs sm:text-sm font-medium text-gray-700 min-w-fit">Occasion:</label>
                <Select value={selectedOccasion} onValueChange={setSelectedOccasion}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {occasions.map((occasion) => (
                      <SelectItem key={occasion} value={occasion}>
                        {occasion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sort and View Controls - separate row for better mobile layout */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t">
              <div className="flex items-center gap-2 flex-1 sm:flex-initial">
                <label className="text-xs sm:text-sm font-medium text-gray-700 min-w-fit">Sort:</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex border rounded-lg self-center sm:self-auto">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none bg-black hover:bg-gray-800 text-white px-3"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none bg-black hover:bg-gray-800 text-white px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {filteredProducts.length} new arrival{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Products Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={400}
                        className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/80 hover:bg-white p-2"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Badge className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-black text-white text-xs">New</Badge>
                    {product.discount && (
                      <Badge className="absolute top-8 sm:top-12 left-2 sm:left-4 bg-red-500 text-white text-xs">
                        {product.discount}% OFF
                      </Badge>
                    )}
                  </div>

                  <div className="p-3 sm:p-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs sm:text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 mb-1">{product.brand}</p>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-medium text-black hover:text-gray-700 mb-2 text-sm sm:text-base line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-base sm:text-lg font-semibold">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2 block sm:inline">
                          (₹{product.originalPrice.toLocaleString("en-IN")} retail)
                        </span>
                        {product.discount && (
                          <span className="text-xs text-red-500 font-medium block sm:inline sm:ml-2">
                            Save {product.discount}%
                          </span>
                        )}
                      </div>
                    </div>

                    <Button className="w-full bg-black hover:bg-gray-800 text-white text-sm py-2">Rent Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex gap-4 sm:gap-6">
                    <div className="relative w-20 h-24 sm:w-32 sm:h-40 flex-shrink-0">
                      <Link href={`/products/${product.id}`}>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={128}
                          height={160}
                          className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <Badge className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-black text-white text-xs">
                        New
                      </Badge>
                      {product.discount && (
                        <Badge className="absolute top-6 left-1 sm:top-8 sm:left-2 bg-red-500 text-white text-xs">
                          {product.discount}% OFF
                        </Badge>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-gray-600 mb-1">{product.brand}</p>
                          <Link href={`/products/${product.id}`}>
                            <h3 className="text-sm sm:text-xl font-medium text-black hover:text-gray-700 mb-2 line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>

                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs sm:text-sm text-gray-600">
                              {product.rating} ({product.reviews} reviews)
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-gray-600 mb-2 hidden sm:block">
                            Category: {product.category} • Occasion: {product.occasion}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-4 hidden sm:block">
                            Available sizes: {product.size.join(", ")}
                          </p>
                        </div>

                        <Button size="sm" variant="ghost" className="hover:bg-gray-100 p-2 ml-2">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg sm:text-2xl font-semibold">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2 block sm:inline">
                            (₹{product.originalPrice.toLocaleString("en-IN")} retail)
                          </span>
                          {product.discount && (
                            <span className="text-xs text-red-500 font-medium block sm:inline sm:ml-2">
                              Save {product.discount}%
                            </span>
                          )}
                        </div>
                        <Button className="bg-black hover:bg-gray-800 text-white px-4 sm:px-8 text-sm">Rent Now</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No new arrivals found matching your filters.</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent border-black text-black hover:bg-black hover:text-white"
              onClick={() => {
                setSelectedCategory("All")
                setSelectedBrand("All")
                setSelectedOccasion("All")
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />

      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          25% { 
            transform: scale(1.2) rotate(90deg);
            opacity: 0.8;
          }
          50% { 
            transform: scale(1.1) rotate(180deg);
            opacity: 1;
          }
          75% { 
            transform: scale(1.3) rotate(270deg);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  )
}

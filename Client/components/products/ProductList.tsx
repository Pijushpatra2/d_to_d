import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Star } from "lucide-react"
import { Product } from "@/types/product"
import { 
  getPrimaryImage, 
  getMinRentalPrice, 
  getOriginalPrice, 
  getBrandName,
  getCategoryName,
  getAvailableSizes,
  getAvailableColors
} from "@/utils/productUtils"

interface ProductListProps {
  products: Product[]
  wishlist: number[]
  toggleWishlist: (productId: number) => void
  handleRentNow: (productId: number) => void
}

export const ProductList = ({ 
  products, 
  wishlist, 
  toggleWishlist, 
  handleRentNow 
}: ProductListProps) => {
  return (
    <div className="space-y-4">
      {products.map((product) => {
        const minRentalPrice = getMinRentalPrice(product)
        const originalPrice = getOriginalPrice(product)
        const primaryImage = getPrimaryImage(product)
        const brandName = getBrandName(product)
        const categoryName = getCategoryName(product)
        const availableSizes = getAvailableSizes(product)
        const availableColors = getAvailableColors(product)
        
        return (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="relative w-full sm:w-32 h-48 sm:h-40 flex-shrink-0">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={primaryImage}
                      alt={product.name}
                      width={128}
                      height={160}
                      className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  {product.is_new && (
                    <Badge className="absolute top-2 left-2 bg-black text-white text-xs">New</Badge>
                  )}
                  {originalPrice > minRentalPrice && (
                    <Badge className="absolute bottom-2 left-2 bg-red-500 text-white text-xs">
                      {Math.round((1 - minRentalPrice / originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">{brandName}</p>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="text-lg md:text-xl font-medium text-black hover:text-gray-700 mb-2">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">
                          {product.rating || 4.5} ({product.review_count || 0} reviews)
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">
                        Category: {categoryName} • Occasion: {product.occasion}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Material: {product.material} • Rental: {product.rental_duration || "4 days"}
                      </p>
                      {availableSizes.length > 0 && (
                        <p className="text-sm text-gray-600 mb-4">
                          Available sizes: {availableSizes.join(", ")}
                        </p>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-gray-100 self-start"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart
                        className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <span className="text-xl md:text-2xl font-semibold">
                        ₹{minRentalPrice.toLocaleString("en-IN")}
                      </span>
                      {originalPrice > minRentalPrice && (
                        <span className="text-sm text-gray-500 ml-2 block sm:inline">
                          (₹{originalPrice.toLocaleString("en-IN")} retail)
                        </span>
                      )}
                    </div>
                    <Button
                      className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 w-full sm:w-auto"
                      onClick={() => handleRentNow(product.id)}
                    >
                      Rent Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
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
  getBrandName 
} from "@/utils/productUtils"

interface ProductCardProps {
  product: Product
  isInWishlist: boolean
  onToggleWishlist: (productId: number) => void
  onRentNow: (productId: number) => void
}

export const ProductCard = ({ 
  product, 
  isInWishlist, 
  onToggleWishlist, 
  onRentNow 
}: ProductCardProps) => {
  const minRentalPrice = getMinRentalPrice(product)
  const originalPrice = getOriginalPrice(product)
  const primaryImage = getPrimaryImage(product)
  const brandName = getBrandName(product)
  
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link href={`/products/${product.id}`}>
            <Image
              src={primaryImage}
              alt={product.name}
              width={300}
              height={400}
              className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-4 right-4 bg-white/80 hover:bg-white"
            onClick={() => onToggleWishlist(product.id)}
          >
            <Heart
              className={`w-4 h-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
          {/* {product.is_new && <Badge className="absolute top-4 left-4 bg-black text-white">New</Badge>} */}
          {originalPrice > minRentalPrice && (
            <Badge className="absolute bottom-4 left-4 bg-red-500 text-white">
              {Math.round((1 - minRentalPrice / originalPrice) * 100)}% OFF
            </Badge>
          )}
        </div>

        <div className="p-3 md:p-4">
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {product.rating || 4.5} ({product.review_count || 0})
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-1">{brandName}</p>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-medium text-black hover:text-gray-700 mb-2 line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 mb-2">
            {product.material} • {product.rental_duration || "4 days"}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1">
            <div>
              <span className="text-lg font-semibold">₹{minRentalPrice.toLocaleString("en-IN")}</span>
              {originalPrice > minRentalPrice && (
                <span className="text-xs sm:text-sm text-gray-500 ml-2 block sm:inline">
                  (₹{originalPrice.toLocaleString("en-IN")} retail)
                </span>
              )}
            </div>
            {/* <p>
                {product.price}
            </p> */}
          </div>

          <Button
            className="w-full bg-black hover:bg-gray-800 text-white"
            onClick={() => onRentNow(product.id)}
          >
            Rent Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
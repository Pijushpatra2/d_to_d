// import Link from "next/link"
// import Image from "next/image"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Heart, Star } from "lucide-react"
// import { Product } from "@/types/product"

// interface ProductGridProps {
//   products: Product[]
//   wishlist: number[]
//   toggleWishlist: (productId: number) => void
//   handleRentNow: (productId: number) => void
// }

// // Helper functions (could be moved to a separate utils file)
// const getPrimaryImage = (product: Product) => {
//   if (product.images && product.images.length > 0) {
//     const primaryImage = product.images.find(img => img.is_primary)
//     return primaryImage?.image_url || product.images[0].image_url
//   }
//   return "/placeholder.svg"
// }

// const getMinRentalPrice = (product: Product) => {
//   if (product.variants && product.variants.length > 0) {
//     return Math.min(...product.variants.map((v: any) => v.rental_price))
//   }
//   return product.price || 0
// }

// const getOriginalPrice = (product: Product) => {
//   if (product.variants && product.variants.length > 0) {
//     return Math.max(...product.variants.map((v: any) => v.price))
//   }
//   return product.price || 0
// }

// const getBrandName = (product: Product) => {
//   return product.brand_name || product.brand?.name || "Unknown Brand"
// }

// export const ProductGrid = ({ 
//   products, 
//   wishlist, 
//   toggleWishlist, 
//   handleRentNow 
// }: ProductGridProps) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
//       {products.map((product) => {
//         const minRentalPrice = getMinRentalPrice(product)
//         const originalPrice = getOriginalPrice(product)
//         const primaryImage = getPrimaryImage(product)
//         const brandName = getBrandName(product)
        
//         return (
//           <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
//             <CardContent className="p-0">
//               <div className="relative overflow-hidden">
//                 <Link href={`/products/${product.id}`}>
//                   <Image
//                     src={primaryImage}
//                     alt={product.name}
//                     width={300}
//                     height={400}
//                     className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </Link>
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   className="absolute top-4 right-4 bg-white/80 hover:bg-white"
//                   onClick={() => toggleWishlist(product.id)}
//                 >
//                   <Heart
//                     className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
//                   />
//                 </Button>
//                 {product.is_new && <Badge className="absolute top-4 left-4 bg-black text-white">New</Badge>}
//                 {originalPrice > minRentalPrice && (
//                   <Badge className="absolute bottom-4 left-4 bg-red-500 text-white">
//                     {Math.round((1 - minRentalPrice / originalPrice) * 100)}% OFF
//                   </Badge>
//                 )}
//               </div>

//               <div className="p-3 md:p-4">
//                 <div className="flex items-center gap-1 mb-2">
//                   <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                   <span className="text-sm text-gray-600">
//                     {product.rating || 4.5} ({product.review_count || 0})
//                   </span>
//                 </div>

//                 <p className="text-sm text-gray-600 mb-1">{brandName}</p>
//                 <Link href={`/products/${product.id}`}>
//                   <h3 className="font-medium text-black hover:text-gray-700 mb-2 line-clamp-2">
//                     {product.name}
//                   </h3>
//                 </Link>

//                 <p className="text-xs text-gray-500 mb-2">
//                   {product.material} • {product.rental_duration || "4 days"}
//                 </p>

//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1">
//                   <div>
//                     {/* <span className="text-lg font-semibold">₹{minRentalPrice.toLocaleString("en-IN")}</span>
//                     {originalPrice > minRentalPrice && (
//                       <span className="text-xs sm:text-sm text-gray-500 ml-2 block sm:inline">
//                         (₹{originalPrice.toLocaleString("en-IN")} retail)
//                       </span>
//                     )} */}
//                     <p>
//                         {product.price}
//                     </p>
//                   </div>
//                 </div>

//                 <Button
//                   className="w-full bg-black hover:bg-gray-800 text-white"
//                   onClick={() => handleRentNow(product.id)}
//                 >
//                   Rent Now
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )
//       })}
//     </div>
//   )
// }





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

interface ProductGridProps {
  products: Product[]
  wishlist: number[]
  toggleWishlist: (productId: number) => void
  handleRentNow: (productId: number) => void
}

export const ProductGrid = ({ 
  products, 
  wishlist, 
  toggleWishlist, 
  handleRentNow 
}: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {products.map((product) => {
        const minRentalPrice = getMinRentalPrice(product)
        const originalPrice = getOriginalPrice(product)
        const primaryImage = getPrimaryImage(product)
        const brandName = getBrandName(product)

        return (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
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
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart
                    className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>

                {product.is_new && (
                  <Badge className="absolute top-4 left-4 bg-black text-white">New</Badge>
                )}

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

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1">
                  <div>
                    <span className="text-lg font-semibold">
                      ₹{minRentalPrice.toLocaleString("en-IN")}
                    </span>
                    {originalPrice > minRentalPrice && (
                      <span className="text-xs sm:text-sm text-gray-500 ml-2 block sm:inline">
                        (₹{originalPrice.toLocaleString("en-IN")} retail)
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  onClick={() => handleRentNow(product.id)}
                >
                  Rent Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

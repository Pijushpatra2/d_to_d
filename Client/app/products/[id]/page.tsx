// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { Navbar } from "@/components/navbar"
// import { Footer } from "@/components/footer"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Heart, Star, ArrowLeft, Share2, ShoppingBag, Calendar, Shield, Truck, Ruler, Clock, Phone } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { useProducts } from "@/hooks/useProducts"

// export default function ProductDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const { products, loading } = useProducts()
//   const productId = params.id as string

//   // Find product by ID
//   const product = products.find((p) => String(p.id) === productId)

//   const [selectedImage, setSelectedImage] = useState(0)
//   const [selectedSize, setSelectedSize] = useState("")
//   const [selectedColor, setSelectedColor] = useState("")
//   const [quantity, setQuantity] = useState(1)
//   const [isWishlisted, setIsWishlisted] = useState(false)
//   const [isZoomed, setIsZoomed] = useState(false)
//   const [zoomLevel, setZoomLevel] = useState(1)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const imageRef = useRef<HTMLDivElement>(null)

//   // Extract variants data
//   const variants = product?.variants || []
//   const colors = Array.from(new Set(variants.map(v => v.attributes?.find(a => a.name === "color")?.value).filter(Boolean)))
//   const sizes = Array.from(new Set(variants.map(v => v.attributes?.find(a => a.name === "size")?.value).filter(Boolean)))
  
//   // Set default color if available
//   useEffect(() => {
//     if (colors.length > 0 && !selectedColor) {
//       setSelectedColor(colors[0] as string)
//     }
//   }, [colors, selectedColor])

//   useEffect(() => {
//     if (!product) return
    
//     const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
//     setIsWishlisted(wishlist.some((item: any) => item.id === product.id))
//   }, [product])

//   const handleAddToCart = () => {
//     if (!product) return
    
//     if (sizes.length > 0 && !selectedSize) {
//       alert("Please select a size")
//       return
//     }

//     // Add to cart logic here
//     const cartItem = {
//       id: product.id,
//       name: product.name,
//       brand: product.brand || "Unknown",
//       price: product.price,
//       image: product.images?.[0]?.url || "/placeholder.svg",
//       size: selectedSize,
//       color: selectedColor,
//       quantity: quantity,
//     }

//     // Get existing cart from localStorage
//     const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")

//     // Check if item already exists
//     const existingItemIndex = existingCart.findIndex(
//       (item: any) => item.id === cartItem.id && item.size === cartItem.size && item.color === cartItem.color,
//     )

//     if (existingItemIndex > -1) {
//       existingCart[existingItemIndex].quantity += quantity
//     } else {
//       existingCart.push(cartItem)
//     }

//     localStorage.setItem("cart", JSON.stringify(existingCart))

//     // Navigate to cart
//     router.push("/cart")
//   }

//   const toggleWishlist = () => {
//     if (!product) return
    
//     const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

//     if (isWishlisted) {
//       // Remove from wishlist
//       const updatedWishlist = wishlist.filter((item: any) => item.id !== product.id)
//       localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
//       setIsWishlisted(false)
//     } else {
//       // Add to wishlist
//       const wishlistItem = {
//         id: product.id,
//         name: product.name,
//         brand: product.brand || "Unknown",
//         price: product.price,
//         originalPrice: product.originalPrice || product.price * 1.5, // Fallback if no original price
//         image: product.images?.[0]?.url || "/placeholder.svg",
//         category: product.category,
//         rating: product.rating || 4.5, // Fallback rating
//         reviews: product.reviewsCount || 0,
//         isNew: product.isNew || false,
//       }
//       wishlist.push(wishlistItem)
//       localStorage.setItem("wishlist", JSON.stringify(wishlist))
//       setIsWishlisted(true)
//     }

//     // Dispatch custom event to update navbar counter
//     window.dispatchEvent(new Event("wishlistUpdated"))
//   }

//   const handleMouseEnter = () => {
//     setIsZoomed(true)
//     setZoomLevel(2)
//   }

//   const handleMouseLeave = () => {
//     setIsZoomed(false)
//     setZoomLevel(1)
//     setMousePosition({ x: 0, y: 0 })
//   }

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!imageRef.current) return

//     const rect = imageRef.current.getBoundingClientRect()
//     const x = ((e.clientX - rect.left) / rect.width) * 100
//     const y = ((e.clientY - rect.top) / rect.height) * 100

//     setMousePosition({ x, y })
//   }

//   const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
//     if (!isZoomed) return

//     e.preventDefault()
//     const delta = e.deltaY > 0 ? -0.2 : 0.2
//     setZoomLevel((prev) => Math.max(1, Math.min(4, prev + delta)))
//   }

//   // Safe getter for image src
//   const getImageSrc = (img: any, index: number) => {
//     if (!product || !product.images || product.images.length === 0) return "/placeholder.svg"
//     return img?.url || img?.image_url || img?.src || `/placeholder.svg`
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white">
//         <Navbar />
//         <div className="container mx-auto px-4 py-8 text-center">Loading product...</div>
//         <Footer />
//       </div>
//     )
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-white">
//         <Navbar />
//         <div className="container mx-auto px-4 py-8 text-center">Product not found.</div>
//         <Footer />
//       </div>
//     )
//   }

//   const mainImage = getImageSrc(product.images?.[selectedImage], selectedImage)
//   const discountPercent = product.originalPrice 
//     ? Math.round((1 - product.price / product.originalPrice) * 100)
//     : 0

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />

//       <div className="container mx-auto px-4 py-4 md:py-8">
//         {/* Breadcrumb - Hidden on mobile for space */}
//         <div className="hidden md:flex items-center gap-2 mb-6 text-sm text-gray-600">
//           <Link href="/" className="hover:text-black">
//             Home
//           </Link>
//           <span>/</span>
//           <Link href="/products" className="hover:text-black">
//             Products
//           </Link>
//           <span>/</span>
//           <span className="text-black">{product.name}</span>
//         </div>

//         {/* Back Button - Mobile optimized */}
//         <Button variant="ghost" className="mb-4 md:mb-6 p-0 h-auto font-normal" onClick={() => router.back()}>
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back
//         </Button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
//           {/* Product Images - Mobile optimized */}
//           <div className="space-y-3 md:space-y-4">
//             <div
//               ref={imageRef}
//               className="relative aspect-[4/5] overflow-hidden rounded-lg cursor-zoom-in"
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//               onMouseMove={handleMouseMove}
//               onWheel={handleWheel}
//             >
//               <Image
//                 src={mainImage}
//                 alt={product.name}
//                 fill
//                 className="object-cover transition-transform duration-200 ease-out"
//                 style={{
//                   transform: isZoomed
//                     ? `scale(${zoomLevel}) translate(${(50 - mousePosition.x) * 0.5}%, ${(50 - mousePosition.y) * 0.5}%)`
//                     : "scale(1)",
//                   transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
//                 }}
//               />
//               {product.isNew && <Badge className="absolute top-3 left-3 bg-black text-white text-xs z-10">New</Badge>}

//               {isZoomed && (
//                 <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs z-10">
//                   {Math.round(zoomLevel * 100)}%
//                 </div>
//               )}
//             </div>

//             <div className="grid grid-cols-4 gap-2">
//               {product.images?.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`relative aspect-square overflow-hidden rounded border-2 transition-colors ${
//                     selectedImage === index ? "border-black" : "border-gray-200 hover:border-gray-300"
//                   }`}
//                 >
//                   <Image
//                     src={getImageSrc(image, index)}
//                     alt={`${product.name} view ${index + 1}`}
//                     fill
//                     className="object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info - Mobile optimized */}
//           <div className="space-y-4 md:space-y-6">
//             <div>
//               <p className="text-gray-600 mb-1 text-sm md:text-base">{product.brand || "Fashion Brand"}</p>
//               <h1 className="text-2xl md:text-3xl font-serif text-black mb-3 md:mb-4 leading-tight">{product.name}</h1>

//               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
//                 <div className="flex items-center gap-1">
//                   <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
//                   <span className="font-medium text-sm md:text-base">{product.rating || 4.5}</span>
//                   <span className="text-gray-600 text-sm">({product.reviewsCount || 0} reviews)</span>
//                 </div>
//                 <Badge variant="outline" className="w-fit">
//                   {product.stockStatus || "Available"}
//                 </Badge>
//               </div>

//               <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 mb-4 md:mb-6">
//                 <span className="text-2xl md:text-3xl font-bold">₹{product.price}</span>
//                 {product.originalPrice && (
//                   <>
//                     <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
//                     <span className="text-sm text-green-600 font-medium">Save {discountPercent}%</span>
//                   </>
//                 )}
//               </div>

//               <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
//                 {product.description || "No description available."}
//               </p>
//             </div>

//             {sizes.length > 0 && (
//               <div className="bg-blue-50 p-3 rounded-lg md:hidden">
//                 <div className="flex items-center gap-2 mb-1">
//                   <Ruler className="w-4 h-4 text-blue-600" />
//                   <span className="font-medium text-sm">Size Guide</span>
//                 </div>
//                 <p className="text-xs text-gray-600">Model is 5'7" wearing size S</p>
//               </div>
//             )}

//             {/* Size Selection - Mobile optimized */}
//             {sizes.length > 0 && (
//               <div>
//                 <h3 className="font-medium mb-3 text-sm md:text-base">Size</h3>
//                 <div className="grid grid-cols-4 gap-2">
//                   {sizes.map((size) => (
//                     <Button
//                       key={size}
//                       variant={selectedSize === size ? "default" : "outline"}
//                       className={`h-10 md:h-11 text-sm md:text-base ${selectedSize === size ? "bg-black text-white" : ""}`}
//                       onClick={() => setSelectedSize(size as string)}
//                     >
//                       {size}
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Color Selection */}
//             {colors.length > 0 && (
//               <div>
//                 <h3 className="font-medium mb-3 text-sm md:text-base">Color</h3>
//                 <Select value={selectedColor} onValueChange={setSelectedColor}>
//                   <SelectTrigger className="w-full sm:w-48">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {colors.map((color) => (
//                       <SelectItem key={color} value={color as string}>
//                         {color}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}

//             <div className="bg-gray-50 p-4 rounded-lg">
//               <div className="flex items-center gap-2 mb-2">
//                 <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
//                 <span className="font-medium text-sm md:text-base">Rental Period</span>
//               </div>
//               <p className="text-gray-600 text-sm md:text-base">4 days rental included</p>
//               <p className="text-xs md:text-sm text-gray-500 mt-1">Need it longer? Extend for ₹1,200/day</p>
//             </div>

//             <div className="space-y-3">
//               <Button
//                 className="w-full bg-black hover:bg-gray-800 text-white py-3 md:py-4 text-base md:text-lg font-medium"
//                 onClick={handleAddToCart}
//                 disabled={!product.available}
//               >
//                 <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 mr-2" />
//                 {product.available ? "Add to Cart" : "Out of Stock"}
//               </Button>

//               <div className="grid grid-cols-2 gap-3">
//                 <Button
//                   variant="outline"
//                   className="flex items-center justify-center gap-2 bg-transparent py-2 md:py-3"
//                   onClick={toggleWishlist}
//                 >
//                   <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
//                   <span className="hidden sm:inline">{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
//                   <span className="sm:hidden">♡</span>
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="flex items-center justify-center gap-2 bg-transparent py-2 md:py-3"
//                 >
//                   <Share2 className="w-4 h-4" />
//                   <span className="hidden sm:inline">Share</span>
//                 </Button>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-3 md:gap-4 pt-4 md:pt-6 border-t">
//               <div className="flex items-center gap-3">
//                 <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
//                 <span className="text-xs md:text-sm">Damage protection included</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Truck className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
//                 <span className="text-xs md:text-sm">Same day delivery in major cities</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Clock className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
//                 <span className="text-xs md:text-sm">Flexible rental dates</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Phone className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
//                 <span className="text-xs md:text-sm">24/7 customer support</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 md:mt-16">
//           <Tabs defaultValue="details" className="w-full">
//             <TabsList className="grid w-full grid-cols-3 h-auto">
//               <TabsTrigger value="details" className="text-xs md:text-sm py-2 md:py-3">
//                 Details
//               </TabsTrigger>
//               <TabsTrigger value="reviews" className="text-xs md:text-sm py-2 md:py-3">
//                 Reviews ({product.reviewsCount || 0})
//               </TabsTrigger>
//               <TabsTrigger value="care" className="text-xs md:text-sm py-2 md:py-3">
//                 Care
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="details" className="mt-4 md:mt-6">
//               <Card>
//                 <CardContent className="p-4 md:p-6">
//                   <h3 className="font-semibold mb-4 text-base md:text-lg">Product Details</h3>
//                   <div className="grid grid-cols-1 gap-3 md:gap-4">
//                     {product.material && (
//                       <div>
//                         <p className="text-xs md:text-sm text-gray-600 mb-1">Material</p>
//                         <p className="font-medium mb-2 md:mb-3 text-sm md:text-base">{product.material}</p>
//                       </div>
//                     )}
//                     {product.designer && (
//                       <div>
//                         <p className="text-xs md:text-sm text-gray-600 mb-1">Designer</p>
//                         <p className="font-medium mb-2 md:mb-3 text-sm md:text-base">{product.designer}</p>
//                       </div>
//                     )}
//                     {product.fit && (
//                       <div>
//                         <p className="text-xs md:text-sm text-gray-600 mb-1">Fit</p>
//                         <p className="font-medium mb-2 md:mb-3 text-sm md:text-base">{product.fit}</p>
//                       </div>
//                     )}
//                     {product.occasion && (
//                       <div>
//                         <p className="text-xs md:text-sm text-gray-600 mb-1">Occasion</p>
//                         <p className="font-medium mb-2 md:mb-3 text-sm md:text-base">{product.occasion}</p>
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="reviews" className="mt-4 md:mt-6">
//               <div className="space-y-4 md:space-y-6">
//                 {product.reviews && product.reviews.length > 0 ? (
//                   product.reviews.map((review: any) => (
//                     <Card key={review.id}>
//                       <CardContent className="p-4 md:p-6">
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <div className="flex items-center gap-2 mb-1">
//                               <span className="font-medium text-sm md:text-base">{review.user}</span>
//                               {review.verified && (
//                                 <Badge variant="outline" className="text-xs">
//                                   Verified
//                                 </Badge>
//                               )}
//                             </div>
//                             <div className="flex items-center gap-1">
//                               {[...Array(5)].map((_, i) => (
//                                 <Star
//                                   key={i}
//                                   className={`w-3 h-3 md:w-4 md:h-4 ${
//                                     i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
//                                   }`}
//                                 />
//                               ))}
//                             </div>
//                           </div>
//                           <span className="text-xs md:text-sm text-gray-500">{review.date}</span>
//                         </div>
//                         <p className="text-gray-700 text-sm md:text-base">{review.comment}</p>
//                       </CardContent>
//                     </Card>
//                   ))
//                 ) : (
//                   <p className="text-center py-4 text-gray-500">No reviews yet.</p>
//                 )}
//               </div>
//             </TabsContent>

//             <TabsContent value="care" className="mt-4 md:mt-6">
//               <Card>
//                 <CardContent className="p-4 md:p-6">
//                   <h3 className="font-semibold mb-4 text-base md:text-lg">Care Instructions</h3>
//                   <div className="space-y-3">
//                     <p className="text-sm md:text-base">
//                       <strong>Care:</strong> Professional dry clean only
//                     </p>
//                     <p className="text-sm md:text-base">
//                       <strong>Storage:</strong> Hang on padded hangers to maintain shape
//                     </p>
//                     <p className="text-sm md:text-base">
//                       <strong>Handling:</strong> Handle with care, especially delicate areas
//                     </p>
//                     <p className="text-sm md:text-base">
//                       <strong>Returns:</strong> Return in original condition within 24 hours of rental end
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   )
// }



// //==================

// // "use client"

// // import { useState, useEffect, useRef } from "react"
// // import { useParams, useRouter } from "next/navigation"
// // import { Navbar } from "@/components/navbar"
// // import { Footer } from "@/components/footer"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent } from "@/components/ui/card"
// // import { Badge } from "@/components/ui/badge"
// // import Image from "next/image"
// // import Link from "next/link"
// // import { useProducts } from "@/hooks/useProducts"
// // import { Heart, Star, ArrowLeft, Share2, ShoppingBag } from "lucide-react"

// // export default function ProductDetailPage() {
// //   const params = useParams()
// //   const router = useRouter()
// //   const { products, loading } = useProducts()
// //   const productId = params.id as string

// //   const product = products.find((p) => String(p.id) === productId)

// //   const [selectedImage, setSelectedImage] = useState(0)
// //   const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null)
// //   const [isWishlisted, setIsWishlisted] = useState(false)

// //   const imageRef = useRef<HTMLDivElement>(null)

// //   // Extract variants
// //   const variants = product?.variants || []

// //   useEffect(() => {
// //     if (!product) return
// //     const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
// //     setIsWishlisted(wishlist.some((item: any) => item.id === product.id))
// //   }, [product])

// //   const toggleWishlist = () => {
// //     if (!product) return
// //     const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

// //     if (isWishlisted) {
// //       const updated = wishlist.filter((item: any) => item.id !== product.id)
// //       localStorage.setItem("wishlist", JSON.stringify(updated))
// //       setIsWishlisted(false)
// //     } else {
// //       const wishlistItem = {
// //         id: product.id,
// //         name: product.name,
// //         price: product.price,
// //         image: product.images?.[0]?.url || "/placeholder.svg",
// //       }
// //       wishlist.push(wishlistItem)
// //       localStorage.setItem("wishlist", JSON.stringify(wishlist))
// //       setIsWishlisted(true)
// //     }
// //     window.dispatchEvent(new Event("wishlistUpdated"))
// //   }

// //   const handleAddToCart = () => {
// //     if (!product) return
// //     const variant = selectedVariantIndex !== null ? variants[selectedVariantIndex] : null

// //     const cartItem = {
// //       id: product.id,
// //       name: product.name,
// //       price: variant ? variant.price : product.price,
// //       sku: variant?.sku,
// //       attributes: variant?.attributes || [],
// //       image: product.images?.[0]?.url || "/placeholder.svg",
// //       quantity: 1,
// //     }

// //     const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
// //     existingCart.push(cartItem)
// //     localStorage.setItem("cart", JSON.stringify(existingCart))
// //     router.push("/order")
// //   }

// //   // Safe image getter
// //   const getImageSrc = (img: any) =>
// //     img?.url || img?.image_url || img?.src || "/placeholder.svg"

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-white">
// //         <Navbar />
// //         <div className="container mx-auto px-4 py-8 text-center">Loading product...</div>
// //         <Footer />
// //       </div>
// //     )
// //   }

// //   if (!product) {
// //     return (
// //       <div className="min-h-screen bg-white">
// //         <Navbar />
// //         <div className="container mx-auto px-4 py-8 text-center">Product not found.</div>
// //         <Footer />
// //       </div>
// //     )
// //   }

// //   const mainImage = getImageSrc(product.images?.[selectedImage])
// //   const selectedVariant = selectedVariantIndex !== null ? variants[selectedVariantIndex] : null

// //   return (
// //     <div className="min-h-screen bg-white">
// //       <Navbar />

// //       <div className="container mx-auto px-4 py-6 md:py-10">
// //         {/* Back Button */}
// //         <Button variant="ghost" className="mb-4 flex items-center gap-2" onClick={() => router.back()}>
// //           <ArrowLeft className="w-4 h-4" /> Back
// //         </Button>

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           {/* Images */}
// //           <div>
// //             <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden rounded-lg shadow">
// //               <Image
// //                 src={mainImage}
// //                 alt={product.name}
// //                 fill
// //                 className="object-cover"
// //                 priority
// //               />
// //               {product.isNew && <Badge className="absolute top-3 left-3 bg-black text-white">New</Badge>}
// //             </div>
// //             <div className="flex gap-2 mt-3 overflow-x-auto">
// //               {product.images?.map((img, idx) => (
// //                 <button
// //                   key={idx}
// //                   onClick={() => setSelectedImage(idx)}
// //                   className={`relative w-20 h-20 rounded overflow-hidden border ${
// //                     selectedImage === idx ? "border-primary" : "border-gray-200"
// //                   }`}
// //                 >
// //                   <Image src={getImageSrc(img)} alt={product.name} fill className="object-cover" />
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Info */}
// //           <div className="space-y-4">
// //             <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
// //             <div className="flex items-center gap-2">
// //               <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// //               <span>{product.rating || 4.5}</span>
// //               <span className="text-gray-500 text-sm">({product.reviewsCount || 0} reviews)</span>
// //             </div>

// //             {/* Price */}
// //             <p className="text-2xl font-bold text-primary">
// //               ₹{selectedVariant ? selectedVariant.price : product.price}
// //             </p>

// //             {/* Variants */}
// //             {variants.length > 0 && (
// //               <div>
// //                 <h3 className="font-semibold mb-2">Available Variants</h3>
// //                 <div className="flex flex-wrap gap-2">
// //                   {variants.map((v, idx) => (
// //                     <Button
// //                       key={v.id}
// //                       variant={selectedVariantIndex === idx ? "default" : "outline"}
// //                       onClick={() => setSelectedVariantIndex(idx)}
// //                     >
// //                       {v.variant_name || v.attributes?.map((a: any) => `${a.name}: ${a.value}`).join(", ")}
// //                     </Button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Variant details */}
// //             {selectedVariant && (
// //               <div className="text-sm text-gray-700 space-y-1">
// //                 {selectedVariant.sku && <p><strong>SKU:</strong> {selectedVariant.sku}</p>}
// //                 {selectedVariant.stock_quantity !== undefined && (
// //                   <p>
// //                     <strong>Stock:</strong>{" "}
// //                     {selectedVariant.stock_quantity > 0 ? selectedVariant.stock_quantity : "Out of stock"}
// //                   </p>
// //                 )}
// //               </div>
// //             )}

// //             {/* Actions */}
// //             <div className="flex gap-3 mt-4">
// //               <Button
// //                 className="flex-1"
// //                 onClick={handleAddToCart}
// //                 disabled={selectedVariant?.stock_quantity === 0}
// //               >
// //                 <ShoppingBag className="w-4 h-4 mr-2" />
// //                 {selectedVariant?.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
// //               </Button>
// //               <Button variant="outline" onClick={toggleWishlist}>
// //                 <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
// //               </Button>
// //               <Button variant="outline">
// //                 <Share2 className="w-4 h-4" />
// //               </Button>
// //             </div>
// // <div className="text-sm text-gray-600 mt-4">
// //   <Link
// //     href={`/order?productId=${product.id}&variantId=${selectedVariant?.id || ""}`}
// //   >
// //     <button
// //       className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg transition"
// //       disabled={!selectedVariant}
// //     >
// //       Order Now
// //     </button>
// //   </Link>
// // </div>

// //           </div>
// //         </div>

// //         {/* Description */}
// //         <div className="mt-10">
// //           <Card>
// //             <CardContent className="p-6">
// //               <h3 className="font-semibold mb-3">Product Details</h3>
// //               <p className="text-gray-700">{product.description || "No description available."}</p>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   )
// // }











"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { useProducts } from "@/hooks/useProducts"
import {
  Heart,
  Star,
  ArrowLeft,
  Share2,
  ShoppingBag,
  Calendar,
  Shield,
  Truck,
} from "lucide-react"
import { getDiscountedPrice } from "@/utils/priceUtils"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { products, loading } = useProducts()
  const productId = params.id as string

  const product = products.find((p) => String(p.id) === productId)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const imageRef = useRef<HTMLDivElement>(null)
  const variants = product?.variants || []

  useEffect(() => {
    if (!product) return
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setIsWishlisted(wishlist.some((item: any) => item.id === product.id))
  }, [product])

  const toggleWishlist = () => {
    if (!product) return
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

    if (isWishlisted) {
      const updated = wishlist.filter((item: any) => item.id !== product.id)
      localStorage.setItem("wishlist", JSON.stringify(updated))
      setIsWishlisted(false)
    } else {
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: getImageSrc(product.images?.[0]) || "/placeholder.svg",
      }
      wishlist.push(wishlistItem)
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
      setIsWishlisted(true)
    }
    window.dispatchEvent(new Event("wishlistUpdated"))
  }

  const handleAddToCart = () => {
    if (!product) return
    const variant = selectedVariantIndex !== null ? variants[selectedVariantIndex] : null

    if (variants.length > 0 && !variant) {
      alert("Please select a variant")
      return
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: variant ? variant.price : product.price,
      sku: variant?.sku,
      attributes: variant?.attributes || [],
      image: getImageSrc(product.images?.[0]) || "/placeholder.svg",
      quantity: 1,
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    existingCart.push(cartItem)
    localStorage.setItem("cart", JSON.stringify(existingCart))
    router.push("/order")
  }

  const getImageSrc = (img: any) =>
    img?.url || img?.image_url || img?.src || "/placeholder.svg"

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">Loading product...</div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">Product not found.</div>
        <Footer />
      </div>
    )
  }

  const mainImage = getImageSrc(product.images?.[selectedImage])
  const selectedVariant = selectedVariantIndex !== null ? variants[selectedVariantIndex] : null


  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-black">
            Products
          </Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>

        {/* Back Button */}
        <Button variant="ghost" className="mb-4 flex items-center gap-2" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div>
            <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
              <Image src={mainImage || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
            </div>
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded overflow-hidden border-2 transition-colors flex-shrink-0 ${
                    selectedImage === idx ? "border-black" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image src={getImageSrc(img) || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4 lg:space-y-6">
            <div>
              {product.brand_name && <p className="text-gray-600 mb-2">{product.brand_name}</p>}
              <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating || 4.5}</span>
                <span className="text-gray-500 text-sm">({product.review_count || 0} reviews)</span>
              </div>

              {/* Price */}
              {/* <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl md:text-3xl font-bold">
                  ₹{selectedVariant ? selectedVariant.price : product.price}
                </span>
                {product.original_price && (
                  <>
                    <span className="text-lg text-gray-500 line-through">₹{product.original_price}</span>
                    <span className="text-sm text-green-600 font-medium">
                      Save{" "}
                      {Math.round(
                        (1 - (selectedVariant ? selectedVariant.price : product.price) / product.original_price) * 100,
                      )}
                      %
                    </span>
                  </>
                )}
              </div> */}

<div className="flex items-baseline gap-3 mb-6">
  {product.price ? (
    (() => {
      const actualPrice = selectedVariant ? selectedVariant.price : product.price

      // Random 10–20% increase
      const increasePercent = Math.floor(Math.random() * (20 - 10 + 1)) + 10
      const inflatedPrice = Math.round(actualPrice * (1 + increasePercent / 100))

      return (
        <>
          {/* Show actual DB price */}
          <span className="text-2xl md:text-3xl font-bold">₹{actualPrice}</span>

          {/* Show fake inflated price */}
          <span className="text-lg text-gray-500 line-through">₹{inflatedPrice}</span>

          {/* Show save percentage */}
          <span className="text-sm text-green-600 font-medium">Save {increasePercent}%</span>
        </>
      )
    })()
  ) : (
    <span className="text-2xl md:text-3xl font-bold">₹0</span>
  )}
</div>

            </div>

            {/* Variants */}
            {/* {variants.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Available Options</h3>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {variants.map((v, idx) => (
                    <Button
                      key={v.id}
                      variant={selectedVariantIndex === idx ? "default" : "outline"}
                      className={`text-sm ${selectedVariantIndex === idx ? "bg-black text-white" : ""}`}
                      onClick={() => setSelectedVariantIndex(idx)}
                      disabled={v.stock_quantity === 0}
                    >
                      {v.variant_name || v.attributes?.map((a: any) => `${a.value}`).join(" - ")}
                      {v.stock_quantity === 0 && " (Out of Stock)"}
                    </Button>
                  ))}
                </div>
              </div>
            )} */}


            {variants.length > 0 && (
  <div>
    <h3 className="font-semibold mb-3">Available Options</h3>
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
      {variants.map((v, idx) => (
        <Button
          key={v.id}
          variant={selectedVariantIndex === idx ? "default" : "outline"}
          className={`text-sm ${selectedVariantIndex === idx ? "bg-black text-white" : ""}`}
          onClick={() => setSelectedVariantIndex(idx)}
          disabled={v.stock_quantity === 0}
        >
          {v.variant_name}
          {v.stock_quantity === 0 && " (Out of Stock)"}
        </Button>
      ))}
    </div>
  </div>
)}


            {/* Variant details */}
            {selectedVariant && (
              <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                {selectedVariant.sku && (
                  <p>
                    <strong>SKU:</strong> {selectedVariant.sku}
                  </p>
                )}
                {selectedVariant.stock_quantity !== undefined && (
                  <p>
                    <strong>Stock:</strong>{" "}
                    <span className={selectedVariant.stock_quantity > 0 ? "text-green-600" : "text-red-600"}>
                      {selectedVariant.stock_quantity > 0
                        ? `${selectedVariant.stock_quantity} available`
                        : "Out of stock"}
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* Description */}
            {product.description && <p className="text-gray-700 leading-relaxed">{product.description}</p>}

            {/* Rental Period (dynamic with fallback) */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Rental Period</span>
              </div>
              <p className="text-gray-600">{product.rental_duration || "4 days rental included"}</p>
              {product.rental_extension_price && (
                <p className="text-sm text-gray-500 mt-1">
                  Extend for ₹{product.rental_extension_price}/day
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg"
                onClick={handleAddToCart}
                disabled={selectedVariant?.stock_quantity === 0 || (variants.length > 0 && !selectedVariant)}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                {selectedVariant?.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={toggleWishlist}>
                  <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Order Now Button */}
              {/* <Link href={`/order?productId=${product.id}&variantId=${selectedVariant?.id || ""}`}>
                <Button
                  className="w-full bg-gray-900 hover:bg-black text-white py-3"
                  disabled={variants.length > 0 && !selectedVariant}
                >
                  Order Now
                </Button>
              </Link> */}


<Link href={`/order?productId=${product.id}&variantId=${selectedVariant?.id || ""}`}>
  <Button
    className="w-full bg-gray-900 hover:bg-black text-white py-3"
    disabled={variants.length > 0 && !selectedVariant}
  >
    Order Now
  </Button>
</Link>


            </div>

            {/* Features (dynamic with fallback) */}
            <div className="grid grid-cols-1 gap-4 pt-6 border-t">
              {product.features?.includes("damage_protection") && (
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Damage protection included</span>
                </div>
              )}
              {product.features?.includes("free_shipping") && (
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Free shipping both ways</span>
                </div>
              )}
              {product.features?.includes("flexible_dates") && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">Flexible rental dates</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 lg:mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.review_count || 0})</TabsTrigger>
              <TabsTrigger value="care" className="hidden lg:block">
                Care Instructions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Product Details</h3>
                  <p className="text-gray-700">{product.details || product.description || "No additional details."}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {(product.reviews || []).map((review: any) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{review.user}</span>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="care" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Care Instructions</h3>
                  <div className="space-y-3">
                    {(product.care_instructions || []).map((ci: string, idx: number) => (
                      <p key={idx}>{ci}</p>
                    ))}
                    {!product.care_instructions && (
                      <>
                        <p><strong>Care:</strong> Dry clean only</p>
                        <p><strong>Storage:</strong> Hang on padded hangers</p>
                        <p><strong>Handling:</strong> Handle with care</p>
                        <p><strong>Returns:</strong> Return in original condition</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface WishlistItem {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  image: string
  category: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    const loadWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      setWishlistItems(wishlist)
    }

    loadWishlist()

    // Listen for wishlist updates
    window.addEventListener("wishlistUpdated", loadWishlist)
    return () => window.removeEventListener("wishlistUpdated", loadWishlist)
  }, [])

  const removeFromWishlist = (productId: number) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== productId)
    setWishlistItems(updatedWishlist)
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

    // Dispatch custom event to update wishlist count
    window.dispatchEvent(new Event("wishlistUpdated"))
  }

  const addToCart = (item: WishlistItem) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      image: item.image,
      size: "M", // Default size
      color: "Default",
      quantity: 1,
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItemIndex = existingCart.findIndex((cartItem: any) => cartItem.id === item.id)

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push(cartItem)
    }

    localStorage.setItem("cart", JSON.stringify(existingCart))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <Heart className="w-16 h-16 mx-auto mb-6 text-gray-300" />
            <h1 className="text-3xl font-serif mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8">
              Save your favorite pieces to rent later. Start browsing our collection to find items you love.
            </p>
            <Link href="/products">
              <Button className="bg-black hover:bg-gray-800 text-white">Browse Collection</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Link href={`/products/${item.id}`}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={400}
                      height={500}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Remove from wishlist button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/80 text-white px-3 py-1 text-sm font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 font-medium">{item.brand}</p>
                    <Link href={`/products/${item.id}`}>
                      <h3 className="text-lg font-semibold text-black hover:text-gray-700 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-black">${item.price}</span>
                      <span className="text-sm text-gray-500 ml-2">/ 4 days</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Retail</p>
                      <p className="text-sm font-medium line-through text-gray-400">${item.originalPrice}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-black hover:bg-gray-800 text-white" onClick={() => addToCart(item)}>
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Link href={`/products/${item.id}`} className="block">
                      <Button variant="outline" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

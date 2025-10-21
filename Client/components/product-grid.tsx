"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Valentino Evening Gown",
    brand: "Valentino",
    price: 89,
    originalPrice: 3200,
    image: "/elegant-black-gown.png",
    category: "Evening Wear",
  },
  {
    id: 2,
    name: "Chanel Tweed Jacket",
    brand: "Chanel",
    price: 65,
    originalPrice: 2800,
    image: "/luxury-tweed-jacket.png",
    category: "Outerwear",
  },
  {
    id: 3,
    name: "Tom Ford Cocktail Dress",
    brand: "Tom Ford",
    price: 75,
    originalPrice: 2400,
    image: "/tom-ford-cocktail-dress.png",
    category: "Cocktail",
  },
  {
    id: 4,
    name: "Hermès Silk Blouse",
    brand: "Hermès",
    price: 45,
    originalPrice: 1200,
    image: "/placeholder-52xf5.png",
    category: "Tops",
  },
  {
    id: 5,
    name: "Saint Laurent Blazer",
    brand: "Saint Laurent",
    price: 55,
    originalPrice: 1800,
    image: "/luxury-blazer.png",
    category: "Outerwear",
  },
  {
    id: 6,
    name: "Dior Midi Dress",
    brand: "Dior",
    price: 70,
    originalPrice: 2200,
    image: "/luxury-midi-dress.png",
    category: "Dresses",
  },
]

export default function ProductCarousel() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [zoomedProduct, setZoomedProduct] = useState<any | null>(null)
  const swiperRef = useRef<any>(null)

  const addToWishlist = (product: any) => {
    const wishlistItem = { ...product }
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    const isAlreadyWishlisted = existingWishlist.some((item: any) => item.id === product.id)

    if (!isAlreadyWishlisted) {
      existingWishlist.push(wishlistItem)
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist))
      window.dispatchEvent(new Event("wishlistUpdated"))
    }
  }

  const handleZoom = (product: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setZoomedProduct(product)
  }

  const closeZoom = () => {
    setZoomedProduct(null)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeZoom()
      }
    }

    if (zoomedProduct) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [zoomedProduct])

  return (
    <section className="py-8 md:py-16 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-12">
        <div className="text-left mb-6 md:mb-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black mb-2">Featured Collection</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Discover our curated selection of luxury pieces from the world's most prestigious fashion houses
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Swiper
        spaceBetween={16}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        className="pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Card
              className="group cursor-pointer overflow-hidden border transition-all duration-300"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Link href={`/products/${product.id}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 sm:h-80 md:h-96 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="absolute top-3 left-3 md:top-4 md:left-4">
                    <span className="bg-accent text-accent-foreground px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white/90 border-white text-black hover:bg-white hover:text-black h-8 w-8 md:h-10 md:w-10"
                      onClick={(e) => handleZoom(product, e)}
                    >
                      <Eye className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white/90 border-white text-black hover:bg-white hover:text-black h-8 w-8 md:h-10 md:w-10"
                      onClick={(e) => {
                        e.preventDefault()
                        addToWishlist(product)
                      }}
                    >
                      <Heart className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <div className="mb-3">
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">{product.brand}</p>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-base md:text-lg font-semibold text-foreground hover:text-gray-700 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl md:text-2xl font-bold text-primary">${product.price}</span>
                      <span className="text-xs md:text-sm text-muted-foreground ml-2">/ 4 days</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Retail Value</p>
                      <p className="text-xs md:text-sm font-medium line-through">${product.originalPrice}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link href={`/products/${product.id}`} className="block">
                      <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Rent Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex md:hidden items-center justify-center gap-4 mb-8">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center mt-8 md:mt-12">
        <Link href="/products">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent w-full md:w-auto"
          >
            View All Collections
          </Button>
        </Link>
      </div>

      {zoomedProduct && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeZoom}>
          <div className="relative max-w-md max-h-[60vh] w-full">
            <img
              src={zoomedProduct.image || "/placeholder.svg"}
              alt={zoomedProduct.name}
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

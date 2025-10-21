"use client"

import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

const collections = [
  {
    id: 1,
    title: "FALL/WINTER",
    year: "2025",
    mainImage: "/elegant-woman-beige-dress.png",
    secondaryImage: "/fashion-woman-white-beige.png",
    alt: "Fall/Winter 2025 Collection",
  },
  {
    id: 2,
    title: "SPRING/SUMMER",
    year: "2025",
    mainImage: "/fashion-woman-white-beige.png",
    secondaryImage: "/elegant-woman-beige-dress.png",
    alt: "Spring/Summer 2025 Collection",
  },
  {
    id: 3,
    title: "RESORT",
    year: "2025",
    mainImage: "/elegant-woman-beige-dress.png",
    secondaryImage: "/fashion-woman-white-beige.png",
    alt: "Resort 2025 Collection",
  },
]

export default function CollectionShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [currentIndex])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % collections.length)
      setIsTransitioning(false)
    }, 300)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + collections.length) % collections.length)
      setIsTransitioning(false)
    }, 300)
  }

  const currentCollection = collections[currentIndex]
  const nextCollection = collections[(currentIndex + 1) % collections.length]

  return (
    <section className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left side - Title and main image */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-black leading-tight">
                OUR
                <br />
                COLLECTION
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light">(2025)</p>
            </div>

            <div className="relative">
              <div
                className={`transition-all duration-700 ease-in-out ${isTransitioning ? "scale-105 opacity-90" : "scale-100 opacity-100"}`}
              >
                <div className="relative w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4]">
                  <Image
                    src={currentCollection.mainImage || "/placeholder.svg"}
                    alt={currentCollection.alt}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="mt-4 md:mt-6 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4 xs:gap-0">
                <div className={`transition-all duration-500 ${isTransitioning ? "opacity-50" : "opacity-100"}`}>
                  <h3 className="text-lg sm:text-xl font-medium text-black">{currentCollection.title}</h3>
                  <p className="text-lg sm:text-xl font-medium text-black">{currentCollection.year}</p>
                </div>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors border border-gray-300 rounded-full px-4 py-2 hover:border-black">
                  See more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Secondary images and carousel controls */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative flex flex-col gap-4 md:gap-6">
              <div
                className={`relative transition-all duration-700 ease-in-out ${isTransitioning ? "scale-95 opacity-70" : "scale-100 opacity-100"}`}
              >
                <div className="relative w-full max-w-[300px] ml-auto aspect-[3/4]">
                  <Image
                    src={currentCollection.secondaryImage || "/placeholder.svg"}
                    alt="Current collection item"
                    fill
                    className="object-cover rounded-lg shadow-md"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </div>

              <div
                className={`relative transition-all duration-700 ease-in-out ${isTransitioning ? "translate-x-0 opacity-100 scale-95" : "translate-x-4 md:translate-x-8 opacity-60 scale-90"}`}
              >
                <div className="relative w-full max-w-[250px] ml-auto aspect-[5/6]">
                  <Image
                    src={nextCollection.mainImage || "/placeholder.svg"}
                    alt="Next collection item"
                    fill
                    className="object-cover rounded-lg shadow-sm"
                    sizes="(max-width: 768px) 40vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>
                <div className="absolute inset-0 bg-white/20 rounded-lg"></div>
              </div>

              {/* Carousel controls - positioned for better mobile accessibility */}
              <div className="flex justify-between items-center mt-4 md:mt-6 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:gap-4 lg:justify-start">
                <button
                  onClick={prevSlide}
                  disabled={isTransitioning}
                  className="w-10 h-10 md:w-12 md:h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous collection"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </button>
                
                <div className="flex gap-2 lg:hidden">
                  {collections.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (!isTransitioning) {
                          setIsTransitioning(true)
                          setTimeout(() => {
                            setCurrentIndex(index)
                            setIsTransitioning(false)
                          }, 300)
                        }
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "bg-black w-4" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to collection ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextSlide}
                  disabled={isTransitioning}
                  className="w-10 h-10 md:w-12 md:h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next collection"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </button>
              </div>

              {/* Indicator dots for larger screens */}
              <div className="hidden lg:flex justify-center gap-2 mt-4">
                {collections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isTransitioning) {
                        setIsTransitioning(true)
                        setTimeout(() => {
                          setCurrentIndex(index)
                          setIsTransitioning(false)
                        }, 300)
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-black w-6" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to collection ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
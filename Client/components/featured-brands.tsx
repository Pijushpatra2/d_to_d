
'use client' 

import { useEffect, useRef } from "react"

export default function FeaturedBrands() {
  const brands = [
    { name: "Chanel", logo: "/abstract-interlocking-circles.png" },
    { name: "Gucci", logo: "/stylized-interlocking-gs.png" },
    { name: "Prada", logo: "/prada-logo.png" },
    { name: "Valentino", logo: "/valentino-logo.png" },
    { name: "Saint Laurent", logo: "/stylized-ysl-logo.png" },
    { name: "Bottega Veneta", logo: "/abstract-woven-pattern.png" },
  ]

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black mb-2">
            Featured Luxury Brands
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Discover pieces from the world's most coveted fashion houses
          </p>
        </div>

        {/* Mobile Marquee */}
        <div className="block sm:hidden overflow-hidden relative">
          <div className="flex animate-marquee whitespace-nowrap">
            {brands.concat(brands).map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center px-6 py-4 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110"
              >
                <img
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  className="max-h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="flex items-center justify-center p-4 sm:p-6 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110"
            >
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                className="max-h-12 sm:max-h-16 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  )
}

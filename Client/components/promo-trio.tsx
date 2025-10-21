"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PromoItem = {
  title: string
  subtitle: string
  href: string
  imgAlt: string
  imgSrc?: string
  bg?: string
}

const items: PromoItem[] = [
  {
    title: "New season",
    subtitle: "handbags and more",
    href: "/products?category=handbags",
    imgAlt: "Handbag",
    imgSrc: "/luxury-handbag-product.png",
    bg: "bg-neutral-100",
  },
  {
    title: "Save 40%",
    subtitle: "on sunglasses",
    href: "/products?category=sunglasses",
    imgAlt: "Sunglasses",
    imgSrc: "/designer-sunglasses-closeup.png",
    bg: "bg-neutral-100",
  },
  {
    title: "Watch out",
    subtitle: "for perfect timepieces",
    href: "/products?category=watches",
    imgAlt: "Luxury watch",
    imgSrc: "/luxury-watch-on-leather-strap.png",
    bg: "bg-neutral-100",
  },
]

export function PromoTrio({
  className,
  data = items,
}: {
  className?: string
  data?: PromoItem[]
}) {
  return (
    <section
      className={cn("relative max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8", className)}
      aria-label="Promotions"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black mb-2 ">
          Discover Our Collections
        </h2>
        <p className="mt-2 text-base sm:text-lg text-gray-600">
          Shop exclusive luxury fashion, curated just for you
        </p>
      </div>

      {/* Promo Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item, idx) => (
          <article
            key={idx}
            className={cn(
              "relative flex flex-col sm:flex-row items-stretch border border-neutral-200 rounded-xl overflow-hidden h-full",
              item.bg || "bg-white"
            )}
          >
            {/* Text block */}
            <div className="flex flex-col justify-center gap-3 p-5 sm:p-6 md:p-8 lg:p-10 sm:w-1/2">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight text-black">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-600">
                {item.subtitle}
              </p>
              <div>
                <Link href={item.href} className="inline-block">
                  <Button className="bg-black px-5 text-white hover:bg-neutral-800 text-sm sm:text-base">
                    SEE MORE
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image block */}
            <div className="relative w-full sm:w-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  item.imgSrc ||
                  "/placeholder.svg?height=300&width=420&query=product%20photography"
                }
                alt={item.imgAlt}
                className="h-48 sm:h-full w-full object-cover"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PromoTrio

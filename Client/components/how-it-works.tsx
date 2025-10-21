"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Search, Package, Sparkles, RotateCcw } from "lucide-react"
import { useEffect, useState } from "react"

const steps = [
  {
    icon: Search,
    title: "Browse & Select",
    description:
      "Discover luxury pieces from top designers. Filter by occasion, size, and style to find your perfect look.",
  },
  {
    icon: Package,
    title: "Rent & Receive",
    description: "Choose your rental period and we'll deliver your items in premium packaging, ready to wear.",
  },
  {
    icon: Sparkles,
    title: "Wear & Shine",
    description:
      "Make unforgettable memories in designer fashion. Professional cleaning is included with every rental.",
  },
  {
    icon: RotateCcw,
    title: "Return & Repeat",
    description: "Send items back using our prepaid shipping label. Then discover your next luxury look.",
  },
]

export default function HowItWorks() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % steps.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience luxury fashion in four simple steps
          </p>
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-125">
                    <step.icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="md:hidden relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {steps.map((step, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <Card className="text-center border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <step.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentSlide ? "bg-primary" : "bg-primary/30"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

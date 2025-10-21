"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, Package, RotateCcw, Shield, Clock, Star, Truck } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useEffect, useRef, useState } from "react"

export default function HowItWorksPage() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [visibleBenefits, setVisibleBenefits] = useState<number[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [autoAnimateSteps, setAutoAnimateSteps] = useState(false)
  const [autoAnimateBenefits, setAutoAnimateBenefits] = useState(false)
  const stepsRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    if (window.innerWidth < 768) {
      setTimeout(() => {
        setAutoAnimateSteps(true)
      }, 300)

      setTimeout(() => {
        setAutoAnimateBenefits(true)
      }, 1500)
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const stepsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          setVisibleSteps((prev) => [...prev, index])
        }
      })
    }, observerOptions)

    const benefitsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          setVisibleBenefits((prev) => [...prev, index])
        }
      })
    }, observerOptions)

    if (stepsRef.current) {
      const stepCards = stepsRef.current.querySelectorAll("[data-index]")
      stepCards.forEach((card) => stepsObserver.observe(card))
    }

    if (benefitsRef.current) {
      const benefitCards = benefitsRef.current.querySelectorAll("[data-index]")
      benefitCards.forEach((card) => benefitsObserver.observe(card))
    }

    return () => {
      stepsObserver.disconnect()
      benefitsObserver.disconnect()
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const steps = [
    {
      number: "01",
      title: "Browse & Select",
      description:
        "Explore our curated collection of luxury designer pieces. Filter by occasion, size, brand, or style to find your perfect look.",
      icon: <Star className="w-6 h-6 md:w-8 md:h-8" />,
      details: ["Over 10,000+ designer pieces", "New arrivals weekly", "Personal styling recommendations"],
    },
    {
      number: "02",
      title: "Choose Your Dates",
      description:
        "Select your rental period from 4 days to 8 weeks. Our flexible booking system ensures you get exactly what you need, when you need it.",
      icon: <Calendar className="w-6 h-6 md:w-8 md:h-8" />,
      details: ["Flexible rental periods", "Easy date modifications", "Last-minute bookings available"],
    },
    {
      number: "03",
      title: "Receive & Enjoy",
      description:
        "Your items arrive professionally cleaned and ready to wear. Each piece comes with care instructions and styling tips from our experts.",
      icon: <Package className="w-6 h-6 md:w-8 md:h-8" />,
      details: ["Free shipping both ways", "Professional cleaning included", "Styling guide included"],
    },
    {
      number: "04",
      title: "Return with Ease",
      description:
        "Simply pack your items in the provided return bag and schedule a pickup. No cleaning required - we handle everything for you.",
      icon: <RotateCcw className="w-6 h-6 md:w-8 md:h-8" />,
      details: ["Prepaid return shipping", "No cleaning required", "Flexible return scheduling"],
    },
  ]

  const benefits = [
    {
      icon: <Shield className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Damage Protection",
      description: "Minor wear and tear is covered. Enjoy your rental worry-free.",
    },
    {
      icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />,
      title: "24/7 Support",
      description: "Our concierge team is available around the clock for any questions.",
    },
    {
      icon: <Truck className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Express Delivery",
      description: "Same-day delivery available in major cities. Next-day everywhere else.",
    },
    {
      icon: <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Quality Guarantee",
      description: "Every piece is authenticated and professionally maintained.",
    },
  ]

  const pricing = [
    {
      duration: "4 Days",
      price: "20%",
      description: "Perfect for special events",
      popular: false,
    },
    {
      duration: "1 Week",
      price: "30%",
      description: "Great for extended occasions",
      popular: true,
    },
    {
      duration: "2 Weeks",
      price: "45%",
      description: "Ideal for vacation or work trips",
      popular: false,
    },
    {
      duration: "1 Month+",
      price: "60%",
      description: "Long-term wardrobe refresh",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4 md:mb-6 text-balance">
            How It Works
          </h1>
          <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed text-pretty">
            Rent luxury designer fashion with complete confidence. Our seamless process makes accessing premium fashion
            effortless and enjoyable.
          </p>
          <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
            <Link href="/products">Start Browsing</Link>
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 md:py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-black mb-3 md:mb-4 text-balance">
              Your Journey to Luxury
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              From selection to return, every step is designed for your convenience and satisfaction.
            </p>
          </div>

          <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                data-index={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer
                  hover:scale-105 hover:-translate-y-2
                  ${
                    isMobile
                      ? autoAnimateSteps
                        ? "translate-x-0 opacity-100"
                        : "translate-x-[-100px] opacity-0"
                      : visibleSteps.includes(index)
                        ? "translate-x-0 opacity-100"
                        : "translate-x-0 opacity-100"
                  }
                `}
                style={{
                  transitionDelay: isMobile ? `${index * 200}ms` : `${index * 150}ms`,
                }}
              >
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="mb-4 md:mb-6">
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 
                      group-hover:rotate-12 group-hover:scale-110 transition-all duration-300"
                    >
                      <div className="group-hover:animate-bounce">{step.icon}</div>
                    </div>
                    <div className="text-2xl md:text-3xl font-serif font-bold text-gray-300 mb-2 group-hover:text-black transition-colors duration-300">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-black mb-2 md:mb-3 text-balance">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base text-pretty">
                    {step.description}
                  </p>
                  <ul className="text-xs md:text-sm text-gray-500 space-y-1">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-left">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-black flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-black mb-3 md:mb-4 text-balance">
              Transparent Pricing
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              Pay a fraction of retail price. All pricing is based on the item's retail value.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {pricing.map((plan, index) => (
              <Card
                key={index}
                className={`border-2 ${plan.popular ? "border-black" : "border-gray-200"} hover:border-black transition-all duration-300 hover:scale-105`}
              >
                <CardContent className="p-4 md:p-6 text-center">
                  {plan.popular && <Badge className="bg-black text-white mb-3 md:mb-4">Most Popular</Badge>}
                  <h3 className="font-serif text-lg md:text-xl font-bold text-black mb-2 text-balance">
                    {plan.duration}
                  </h3>
                  <div className="mb-3 md:mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-black">{plan.price}</span>
                    <span className="text-gray-600 ml-1 text-sm md:text-base">of retail</span>
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm text-pretty">{plan.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-black mb-3 md:mb-4 text-balance">
              Why Choose Us
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              We've thought of everything to make your luxury rental experience exceptional.
            </p>
          </div>

          <div ref={benefitsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                data-index={index}
                className={`text-center transition-all duration-500 hover:scale-105 hover:-translate-y-1
                  ${
                    isMobile
                      ? autoAnimateBenefits
                        ? "translate-x-0 opacity-100"
                        : "translate-x-[100px] opacity-0"
                      : visibleBenefits.includes(index)
                        ? "translate-x-0 opacity-100"
                        : "translate-x-0 opacity-100"
                  }
                `}
                style={{
                  transitionDelay: isMobile ? `${index * 200}ms` : `${index * 150}ms`,
                }}
              >
                <div
                  className="w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 
                  hover:rotate-12 hover:scale-110 transition-all duration-300 group"
                >
                  <div className="group-hover:animate-pulse">{benefit.icon}</div>
                </div>
                <h3 className="font-serif text-base md:text-lg font-bold text-black mb-2 text-balance">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed text-pretty">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-black mb-4 md:mb-6 text-balance">
            Ready to Get Started?
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of fashion-forward individuals who trust us with their style needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800">
              <Link href="/products">Browse Collection</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-black text-black hover:bg-black hover:text-white bg-transparent"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

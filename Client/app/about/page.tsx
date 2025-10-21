"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Shield, Sparkles, Users, Heart } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

const values = [
  {
    icon: Crown,
    title: "Luxury Access",
    description:
      "We believe everyone deserves access to the world's most coveted fashion pieces, without the commitment of ownership.",
  },
  {
    icon: Shield,
    title: "Trust & Quality",
    description:
      "Every piece in our collection is authenticated, professionally cleaned, and maintained to the highest standards.",
  },
  {
    icon: Sparkles,
    title: "Sustainable Fashion",
    description:
      "By sharing luxury pieces, we're reducing fashion waste and promoting a more sustainable approach to style.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We're building a community of fashion lovers who appreciate quality, craftsmanship, and conscious consumption.",
  },
]

const team = [
  {
    name: "Isabella Chen",
    role: "Founder & CEO",
    image: "/professional-ceo-portrait.png",
    bio: "Former fashion buyer with 15 years at luxury houses including Chanel and Hermès.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Curation",
    image: "/professional-man-fashion-curator-portrait.png",
    bio: "Fashion stylist and curator who has worked with top celebrities and fashion magazines.",
  },
  {
    name: "Sophie Laurent",
    role: "Customer Experience Director",
    image: "/professional-woman-customer-service.png",
    bio: "Luxury retail veteran focused on creating exceptional customer experiences.",
  },
]

const stats = [
  { number: 10000, suffix: "+", label: "Happy Customers" },
  { number: 500, suffix: "+", label: "Designer Brands" },
  { number: 50000, suffix: "+", label: "Luxury Pieces" },
  { number: 98, suffix: "%", label: "Satisfaction Rate" },
]

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [target])

  return (
    <span>
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  )
}

export default function AboutPage() {
  const [teamVisible, setTeamVisible] = useState(false)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      const timer = setTimeout(() => {
        setTeamVisible(true)
      }, 500) // Start after 0.5 seconds

      return () => clearTimeout(timer)
    } else {
      setTeamVisible(true) // Show immediately on desktop
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-serif text-black mb-4 md:mb-6 text-balance">About Our Story</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing luxury fashion by making the world's most coveted pieces accessible to everyone. Our
            mission is to democratize luxury while promoting sustainable fashion practices.
          </p>
          <div className="w-16 md:w-24 h-0.5 bg-black mx-auto mt-6 md:mt-8"></div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-1 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-serif text-black mb-4 md:mb-6">Our Journey</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>
                  Founded in 2020, our premium clothing rental service was born from a simple observation: luxury
                  fashion pieces often sit unworn in closets, while fashion lovers dream of accessing these coveted
                  items for special occasions.
                </p>
                <p>
                  We saw an opportunity to bridge this gap, creating a platform where luxury meets accessibility. Our
                  founders, with decades of combined experience in luxury fashion and retail, set out to build something
                  different – a service that celebrates both style and sustainability.
                </p>
                <p>
                  Today, we're proud to offer access to over 50,000 luxury pieces from 500+ designer brands, serving
                  customers who value quality, craftsmanship, and conscious consumption.
                </p>
              </div>
            </div>
            <div className="relative order-2 lg:order-2">
              <Image
                src="/luxury-fashion-boutique.png"
                alt="Our luxury boutique"
                width={600}
                height={500}
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <Badge className="absolute top-2 md:top-4 left-2 md:left-4 bg-black text-white text-xs md:text-sm">
                Since 2020
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-serif text-black mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              These core principles guide everything we do, from curating our collection to serving our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-black mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-serif text-black mb-4">By the Numbers</h2>
            <p className="text-gray-600 text-sm md:text-base">Our impact in the luxury fashion rental space</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-black mb-2">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-serif text-black mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Our passionate team brings together decades of experience in luxury fashion, retail, and customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className={`text-center hover:shadow-lg transition-all duration-1000 ease-out ${
                  teamVisible
                    ? "translate-x-0 opacity-100"
                    : "md:translate-x-0 md:opacity-100 translate-x-full opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 300}ms`,
                }}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-black mb-1">{member.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm md:text-base">{member.role}</p>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Heart
                className="w-6 h-6 md:w-8 md:h-8 text-black animate-pulse"
                style={{
                  animation: "pulse 2s infinite, bounce 3s infinite alternate",
                }}
              />
              <h2 className="text-2xl md:text-3xl font-serif mb-4">Our Mission</h2>
              <Heart
                className="w-6 h-6 md:w-8 md:h-8 text-black animate-pulse"
                style={{
                  animation: "pulse 2s infinite 0.5s, bounce 3s infinite alternate 1s",
                }}
              />
            </div>
            <blockquote className="text-lg md:text-2xl text-gray-700 font-light leading-relaxed italic text-balance">
              "To make luxury fashion accessible, sustainable, and joyful – creating a world where everyone can
              experience the confidence and beauty that comes from wearing exceptional pieces, while building a more
              conscious approach to fashion consumption."
            </blockquote>
            <div className="w-16 md:w-24 h-0.5 bg-black mx-auto mt-6 md:mt-8"></div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
       <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background pattern image */}
      <div className="absolute inset-0 bg-[url('/luxury-fashion-pattern.png')] opacity-5"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-serif mb-4">Ready to Experience Luxury?</h2>
        <p className="text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
          Join thousands of fashion lovers who have discovered the joy of luxury rental. Browse our collection and
          find your next statement piece.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <a
            href="/products"
            className="bg-white text-black px-6 md:px-8 py-3 rounded hover:bg-gray-100 transition-colors font-medium text-sm md:text-base"
          >
            Browse Collection
          </a>
          <a
            href="/new-arrivals"
            className="border border-white text-white px-6 md:px-8 py-3 rounded hover:bg-white hover:text-black transition-colors font-medium text-sm md:text-base"
          >
            View New Arrivals
          </a>
        </div>
      </div>
    </section>

      <Footer />
    </div>
  )
}

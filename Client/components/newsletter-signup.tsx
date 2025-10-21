"use client"

import type React from "react"

import { useState } from "react"
import { Mail, ArrowRight } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setIsSubscribed(true)
    setTimeout(() => setIsSubscribed(false), 3000)
    setEmail("")
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/luxury-fashion-pattern.png')] opacity-5"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Mail className="w-12 h-12 text-white mb-4" />
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Stay in Style</h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Be the first to discover new arrivals, exclusive collections, and styling tips from our fashion experts.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group"
              >
                Subscribe
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </form>

          {isSubscribed && (
            <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300">
              Thank you for subscribing! Welcome to LuxeRent.
            </div>
          )}

          <p className="text-sm text-gray-400 mt-6">Join 50,000+ fashion enthusiasts. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  )
}

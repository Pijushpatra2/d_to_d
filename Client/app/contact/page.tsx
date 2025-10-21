"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, MessageCircle, HeadphonesIcon, ChevronDown, ChevronUp } from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our luxury fashion experts",
    contact: "+1 (555) 123-4567",
    hours: "Mon-Fri: 9AM-8PM EST",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Get detailed assistance via email",
    contact: "support@premiumrental.com",
    hours: "Response within 2 hours",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Instant help for urgent questions",
    contact: "Available on website",
    hours: "Mon-Sun: 8AM-10PM EST",
  },
  {
    icon: HeadphonesIcon,
    title: "Personal Stylist",
    description: "One-on-one styling consultation",
    contact: "stylist@premiumrental.com",
    hours: "By appointment only",
  },
]

const faqs = [
  {
    question: "How does the rental process work?",
    answer:
      "Browse our collection, select your desired pieces, choose rental dates, and we'll deliver them to you. After your event, simply return using our prepaid shipping label.",
  },
  {
    question: "What if an item doesn't fit?",
    answer:
      "We offer free size exchanges within 24 hours of delivery. Our customer service team will arrange a quick swap to ensure the perfect fit.",
  },
  {
    question: "How do you ensure item cleanliness?",
    answer:
      "Every item is professionally dry cleaned and sanitized between rentals using luxury garment care standards. We maintain the highest hygiene protocols.",
  },
  {
    question: "What happens if I damage an item?",
    answer:
      "Minor wear is expected and covered. For significant damage, we have reasonable repair fees. We'll always communicate costs upfront and work with you on solutions.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleFaq = (index: number) => {
    if (activeFaqIndex === index) {
      setActiveFaqIndex(null)
    } else {
      setActiveFaqIndex(index)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-black mb-6">Get in Touch</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our luxury fashion experts are here to help you find the perfect pieces for any occasion. Reach out with
            questions, styling requests, or just to say hello.
          </p>
          <div className="w-24 h-0.5 bg-black mx-auto mt-8"></div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-serif text-black mb-4">How Can We Help?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the contact method that works best for you. Our team is dedicated to providing exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-black mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-3 text-xs md:text-sm">{method.description}</p>
                  <p className="font-medium text-black mb-1 text-sm md:text-base">{method.contact}</p>
                  <p className="text-xs md:text-sm text-gray-500">{method.hours}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div>
  <h2 className="text-2xl md:text-3xl font-serif text-black mb-6">Send Us a Message</h2>
  <Card>
    <CardContent className="p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Full Name *</label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="w-full bg-white border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Your full name"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Optional"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Email Address *</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            className="w-full bg-white border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="your@email.com"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Subject *</label>
          <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
            <SelectTrigger className="bg-white border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="rental">Rental Question</SelectItem>
              <SelectItem value="styling">Styling Consultation</SelectItem>
              <SelectItem value="return">Return/Exchange</SelectItem>
              <SelectItem value="damage">Damage Report</SelectItem>
              <SelectItem value="partnership">Partnership Inquiry</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Message *</label>
          <Textarea
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            required
            rows={5}
            className="w-full bg-white border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Tell us how we can help you..."
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white py-3">
          Send Message
        </Button>
      </form>
    </CardContent>
  </Card>
</div>

            {/* Contact Information */}
             <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/luxury-fashion-pattern.png')] opacity-5"></div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-serif text-white mb-6 text-center">Visit Our Showroom</h2>

        <Card className="mb-6 md:mb-8 bg-white/5 border border-white/10 text-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4 md:mb-6">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-2">Address</h3>
                <p className="text-gray-300">
                  123 Fashion Avenue
                  <br />
                  Suite 456
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-white mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-2">Showroom Hours</h3>
                <div className="text-gray-300 space-y-1">
                  <p>Monday - Friday: 10:00 AM - 7:00 PM</p>
                  <p>Saturday: 10:00 AM - 6:00 PM</p>
                  <p>Sunday: 12:00 PM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white/10 text-white p-6 md:p-8 rounded-lg">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Book a Private Appointment</h3>
          <p className="text-gray-300 mb-6 text-sm md:text-base">
            Experience our collection in person with a dedicated stylist. Perfect for special events or when you
            need expert guidance.
          </p>
          <Button className="bg-white text-black hover:bg-gray-100">Schedule Appointment</Button>
        </div>
      </div>
    </section>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-serif text-black mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our luxury rental service.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <button
                    className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-lg font-semibold text-black pr-4">{faq.question}</h3>
                    {activeFaqIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    )}
                  </button>
                  {activeFaqIndex === index && (
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button className="bg-black hover:bg-gray-800 text-white">View Full FAQ</Button>
          </div>
        </div>
      </section>

      {/* Address Background Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        {/* Background pattern image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80')] bg-cover bg-center opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif mb-6">Our Flagship Store</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Address</h3>
                    <p>
                      123 Fashion Avenue
                      <br />
                      Suite 456
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Showroom Hours</h3>
                    <div className="space-y-1">
                      <p>Monday - Friday: 10:00 AM - 7:00 PM</p>
                      <p>Saturday: 10:00 AM - 6:00 PM</p>
                      <p>Sunday: 12:00 PM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 md:p-8 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">Private Appointments Available</h3>
              <p className="mb-6">
                Experience our collection in person with a dedicated stylist. Perfect for special events or when you
                need expert guidance.
              </p>
              <Button className="bg-white text-black hover:bg-gray-100">Schedule Appointment</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
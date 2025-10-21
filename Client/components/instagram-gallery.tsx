"use client"

import { Instagram } from "lucide-react"

export default function InstagramGallery() {
  const images = [
    "/elegant-woman-designer-dress.png",
    "/luxury-handbag-outfit.png",
    "/stylish-woman-evening-wear.png",
    "/luxury-shoes-accessories.png",
    "/luxury-fashion-model.png",
    "/elegant-professional-outfit.png",
    "/luxury-street-style.png",
    "/designer-dress-formal-event.png",
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Instagram className="w-8 h-8 text-gray-800 mr-3" />
            <h2 className="text-3xl font-serif font-bold text-gray-900">@LuxeRent</h2>
          </div>
          <p className="text-lg text-gray-600 mb-8">See how our members style their rentals</p>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 font-medium">
            Follow Us
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg group cursor-pointer">
              <img
                src={image || "/placeholder.svg"}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

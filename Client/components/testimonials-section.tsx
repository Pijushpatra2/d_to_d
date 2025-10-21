"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"

type Testimonial = {
  id: number
  name: string
  role: string
  feedback: string
  image: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophia Patel",
    role: "Marketing Manager",
    feedback:
      "This service has completely changed the way we operate. The team is professional and efficient!",
    image: "/placeholder.svg",
    rating: 5,
  },
  {
    id: 2,
    name: "James Walker",
    role: "Product Designer",
    feedback:
      "A fantastic experience from start to finish. I highly recommend them to anyone.",
    image: "/placeholder.svg",
    rating: 4,
  },
  {
    id: 3,
    name: "Liam Chen",
    role: "Software Engineer",
    feedback:
      "The attention to detail and customer service was beyond expectations.",
    image: "/placeholder.svg",
    rating: 5,
  },
  {
    id: 4,
    name: "Emma Davis",
    role: "Entrepreneur",
    feedback:
      "Smooth process, great results. I'll definitely work with them again!",
    image: "/placeholder.svg",
    rating: 5,
  },
]

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex justify-center mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialCarousel() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 ">
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-serif font-black mb-2">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover why businesses choose our services and how we've helped them
          achieve their goals.
        </p>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="pb-8"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <div
              className="bg-gradient-to-b from-gray-50 to-gray-80 rounded-xl p-8 h-full flex flex-col transition-all duration-300 border border-gray-200"
              style={{ minHeight: "420px" }}
            >
              <div className="flex justify-center mb-6">
                <img
                  src={t.image || "/placeholder.svg"}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>

              <StarRating rating={t.rating} />

              <p className="text-gray-600 mb-6 text-lg leading-relaxed text-center flex-grow">
                &ldquo;{t.feedback}&rdquo;
              </p>

              <div className="mt-auto text-center">
                <h3 className="font-semibold text-xl text-gray-800">
                  {t.name}
                </h3>
                <p className="text-gray-500 font-medium">{t.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

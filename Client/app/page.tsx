import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import CollectionShowcase from "@/components/collection-showcase"
import ProductGrid from "@/components/product-grid"
import HowItWorks from "@/components/how-it-works"
import FeaturedBrands from "@/components/featured-brands"
import TestimonialsSection from "@/components/testimonials-section"
import InstagramGallery from "@/components/instagram-gallery"
import NewsletterSignup from "@/components/newsletter-signup"
import Footer from "@/components/footer"
import PromoTrio from "@/components/promo-trio"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PromoTrio className="my-10 md:my-12" />
      {/* <CollectionShowcase /> */}
      <FeaturedBrands />
      <ProductGrid />
      <HowItWorks />
      <TestimonialsSection />
      <InstagramGallery />
      <NewsletterSignup />
      <Footer />
    </main>
  )
}

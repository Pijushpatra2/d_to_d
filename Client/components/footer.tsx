import Link from "next/link"
import { Instagram, Facebook, Twitter, Mail } from "lucide-react"

export { Footer }

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-serif font-black mb-4">D2D</div>
            <p className="text-background/80 mb-6 max-w-md">
              Experience luxury fashion without the commitment. Rent designer pieces for every occasion and make every
              moment unforgettable.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-background/60 hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-background/60 hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-background/60 hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-background/60 hover:text-primary transition-colors">
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/collections" className="text-background/80 hover:text-primary transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-background/80 hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-background/80 hover:text-primary transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-background/80 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/80 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-background/80 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-background/80 hover:text-primary transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/care-instructions" className="text-background/80 hover:text-primary transition-colors">
                  Care Instructions
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-background/80 hover:text-primary transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-background/80 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Centered Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <p className="text-background/60 text-sm">
              © 2024 LuxeRent. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-background/60 hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-background/60 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

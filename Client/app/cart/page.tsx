"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Gift, Shield, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CartItem {
  id: number
  name: string
  brand: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
  rentalDays?: number
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      // Add default rental days if not present
      const cartWithDefaults = parsedCart.map((item: CartItem) => ({
        ...item,
        rentalDays: item.rentalDays || 4,
      }))
      setCartItems(cartWithDefaults)
    }
    setIsLoading(false)
  }, [])

  const updateCart = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems)
    localStorage.setItem("cart", JSON.stringify(updatedItems))
  }

  const updateQuantity = (id: number, size: string, color: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id, size, color)
      return
    }

    const updatedItems = cartItems.map((item) =>
      item.id === id && item.size === size && item.color === color ? { ...item, quantity: newQuantity } : item,
    )
    updateCart(updatedItems)
  }

  const updateRentalDays = (id: number, size: string, color: string, days: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.size === size && item.color === color ? { ...item, rentalDays: days } : item,
    )
    updateCart(updatedItems)
  }

  const removeItem = (id: number, size: string, color: string) => {
    const updatedItems = cartItems.filter((item) => !(item.id === id && item.size === size && item.color === color))
    updateCart(updatedItems)
  }

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoDiscount(0.1) // 10% discount
    } else if (promoCode.toLowerCase() === "first20") {
      setPromoDiscount(0.2) // 20% discount
    } else {
      setPromoDiscount(0)
      alert("Invalid promo code")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const basePrice = item.price * item.quantity
    const extraDays = Math.max(0, (item.rentalDays || 4) - 4)
    const extraDaysCost = extraDays * 15 * item.quantity // $15 per extra day
    return sum + basePrice + extraDaysCost
  }, 0)

  const discount = subtotal * promoDiscount
  const shipping = subtotal > 100 ? 0 : 15 // Free shipping over $100
  const tax = (subtotal - discount) * 0.08 // 8% tax
  const total = subtotal - discount + shipping + tax

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-black mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Discover our luxury collection and find your perfect rental</p>
            <Button asChild className="bg-black hover:bg-gray-800 text-white">
              <Link href="/products">Shop Collection</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" className="p-0 h-auto font-normal" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>

        <h1 className="text-3xl font-serif text-black mb-8">Shopping Cart ({cartItems.length} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <Card key={`${item.id}-${item.size}-${item.color}`}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-24 h-32 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm text-gray-600">{item.brand}</p>
                          <h3 className="font-medium text-black">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            Size: {item.size} • Color: {item.color}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id, item.size, item.color)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Quantity */}
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          {/* Rental Days */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Rental:</span>
                            <select
                              value={item.rentalDays}
                              onChange={(e) =>
                                updateRentalDays(item.id, item.size, item.color, Number.parseInt(e.target.value))
                              }
                              className="border rounded px-2 py-1 text-sm"
                            >
                              <option value={4}>4 days</option>
                              <option value={8}>8 days (+$15/day)</option>
                              <option value={12}>12 days (+$15/day)</option>
                              <option value={16}>16 days (+$15/day)</option>
                            </select>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold">${item.price * item.quantity}</p>
                          {(item.rentalDays || 4) > 4 && (
                            <p className="text-sm text-gray-600">
                              +${((item.rentalDays || 4) - 4) * 15 * item.quantity} extra days
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Promo Code */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="w-5 h-5 text-gray-600" />
                  <h3 className="font-medium">Promo Code</h3>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={applyPromoCode} className="bg-transparent">
                    Apply
                  </Button>
                </div>
                {promoDiscount > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    Promo code applied! {Math.round(promoDiscount * 100)}% discount
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({Math.round(promoDiscount * 100)}%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout"><Button className="w-full bg-black hover:bg-gray-800 text-white mb-4">Proceed to Checkout</Button></Link>

                {/* Features */}
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Damage protection included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Free shipping & returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-purple-600" />
                    <span>Professional cleaning included</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Need help?</p>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif text-black mb-6">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={`/luxury-fashion-item.png?height=300&width=250&query=luxury fashion item ${i}`}
                      alt={`Recommended item ${i}`}
                      width={250}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600">Designer Brand</p>
                    <h3 className="font-medium text-black mb-2">Luxury Item {i}</h3>
                    <p className="text-lg font-semibold">${59 + i * 10}</p>
                    <Button size="sm" className="w-full mt-2 bg-black hover:bg-gray-800 text-white">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

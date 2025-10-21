"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, CreditCard, MapPin, User, Shield, Truck } from "lucide-react"

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    rentalStart: "",
    rentalEnd: "",
    specialInstructions: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    agreeTerms: false,
    subscribeNewsletter: false,
  })

  const [orderSummary] = useState({
    items: [
      {
        id: 1,
        name: "Elegant Black Evening Gown",
        brand: "Valentino",
        size: "M",
        rentalPrice: 299,
        duration: "4 days",
        image: "/elegant-black-evening-gown.png",
      },
      {
        id: 2,
        name: "Classic Navy Blazer",
        brand: "Tom Ford",
        size: "L",
        rentalPrice: 189,
        duration: "7 days",
        image: "/navy-blazer-suit-jacket.png",
      },
    ],
    subtotal: 488,
    insurance: 25,
    shipping: 0,
    tax: 39.04,
    total: 552.04,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreeTerms) {
      alert("Please agree to the terms and conditions")
      return
    }
    // Handle order submission
    console.log("Order submitted:", formData)
    alert("Order placed successfully!")
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-black mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your luxury rental experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif">
                    <User className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rental Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif">
                    <CalendarDays className="h-5 w-5" />
                    Rental Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rentalStart">Rental Start Date</Label>
                      <Input
                        id="rentalStart"
                        type="date"
                        value={formData.rentalStart}
                        onChange={(e) => handleInputChange("rentalStart", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="rentalEnd">Rental End Date</Label>
                      <Input
                        id="rentalEnd"
                        type="date"
                        value={formData.rentalEnd}
                        onChange={(e) => handleInputChange("rentalEnd", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                    <Textarea
                      id="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                      className="mt-1"
                      rows={3}
                      placeholder="Any special delivery instructions or fitting notes..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      className="mt-1"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        className="mt-1"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        className="mt-1"
                        placeholder="123"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange("cardName", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Newsletter */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <a href="#" className="underline hover:text-gray-600">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="underline hover:text-gray-600">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onCheckedChange={(checked) => handleInputChange("subscribeNewsletter", checked as boolean)}
                    />
                    <Label htmlFor="subscribeNewsletter" className="text-sm leading-relaxed">
                      Subscribe to our newsletter for exclusive offers and new arrivals
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="font-serif">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-4">
                  {orderSummary.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-gray-600">
                          {item.brand} • Size {item.size}
                        </p>
                        <p className="text-xs text-gray-600">{item.duration}</p>
                        <p className="font-medium text-sm">${item.rentalPrice}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${orderSummary.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Damage Protection
                    </span>
                    <span>${orderSummary.insurance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      Shipping
                    </span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${orderSummary.tax}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${orderSummary.total}</span>
                </div>

                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-black hover:bg-gray-800 text-white mt-6"
                  size="lg"
                >
                  Place Order
                </Button>

                <div className="text-xs text-gray-500 text-center mt-4">
                  <p className="flex items-center justify-center gap-1">
                    <Shield className="h-3 w-3" />
                    Secure checkout with 256-bit SSL encryption
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

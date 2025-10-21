"use client"

import { useSearchParams } from "next/navigation"
import { useProducts } from "@/hooks/useProducts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OrderPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("productId")
  const variantId = searchParams.get("variantId")

  const { products, loading, error } = useProducts()

  if (loading) return <p>Loading product...</p>
  if (error) return <p className="text-red-500">{error}</p>

  const product = products.find(p => p.id === Number(productId))
  if (!product) return <p>Product not found</p>

  const variant = product.variants?.find(v => v.id === Number(variantId))

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card>
        <CardContent className="space-y-6">
          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Product Image */}
          {product.images?.[0] && (
            <img
              src={product.images[0].image_url}
              alt={product.images[0].alt_text || product.name}
              className="rounded-lg w-64 h-64 object-cover"
            />
          )}

          {/* Variant Info */}
          {variant && (
            <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
              <p>
                <strong>Variant:</strong> {variant.variant_name}
              </p>
              {variant.sku && (
                <p>
                  <strong>SKU:</strong> {variant.sku}
                </p>
              )}
              <p>
                <strong>Price:</strong> ${variant.price}
              </p>
              <p>
                <strong>Stock:</strong>{" "}
                <span
                  className={
                    variant.stock_quantity > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {variant.stock_quantity > 0
                    ? `${variant.stock_quantity} available`
                    : "Out of stock"}
                </span>
              </p>
            </div>
          )}

          {/* Confirm Button */}
          <Button className="w-full bg-black text-white hover:bg-gray-800 py-3">
            Confirm Order
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

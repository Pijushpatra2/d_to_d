"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import api from "@/lib/axiosInstance"
import ProductVariants from "@/components/admin/ProductVariants"
import ImageGallery from "@/components/admin/ImageGallery"

interface Product {
  id: number
  name: string
  brand: string
  category: string
  price: number
  originalPrice: number
  status: string
  description: string
  image: string
  dateAdded: string
  stock: number
}
interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number(params.id)
  const [product, setProduct] = useState<Product | null>(null)
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch product by ID
  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/products/get/${productId}`)
      const result = response.data

      if (result.success) {
        setProduct(result.data)
      } else {
        setError('Product not found')
      }
    } catch (err) {
      setError('An error occurred while fetching the product')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories/get");
      const result = response.data;

      if (result.success) {
        setCategories(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch categories");
    }
  };

  // Fetch brands
  const fetchBrands = async () => {
    try {
      const response = await api.get("/brands/get");
      const result = response.data;

      if (result.success) {
        setBrands(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch brands");
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  // Get category name by ID
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Unknown";
  };

  // Get brand name by ID
  const getBrandName = (brandId: number | null) => {
    if (!brandId) return "None";
    const brand = brands.find((b) => b.id === brandId);
    return brand ? brand.name : "Unknown";
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error || "Product not found"}</p>
          <Link href="/admin/products">
            <Button className="bg-black text-white hover:bg-gray-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex h-16 items-center px-6">
          <Link href="/admin/products" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
          <h1 className="ml-4 text-2xl font-bold text-foreground">{product.name}</h1>
          <div className="ml-auto">
            <Link href={`/admin/products/${product.id}/edit`}>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Edit className="mr-2 h-4 w-4" />
                Edit Product Details
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Brand</p>
                  <p className="text-lg">{getBrandName(product.brand_id)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p className="text-lg">{getCategoryName(product.category_id)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rental Price</p>
                  <p className="text-lg font-bold">${product.price}/day</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Stock</p>
                  <p className="text-lg">{product.stock ?? 0}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      product.status === "Available"
                        ? "default"
                        : product.status === "Rented"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {product.status}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                <p className="text-base">{product.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date Added</p>
                  <p className="text-lg">{product.dateAdded}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <section>
        <ProductVariants productId={product.id} />
      </section>
      <section>
        <ImageGallery productId={product.id} />
      </section>
      
    </div>
  )
}
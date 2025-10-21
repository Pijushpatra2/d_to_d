export interface Brand {
  id: number
  name: string
  image_url?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: number
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: number
  product_id: number
  image_url: string
  alt_text?: string
  is_primary: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  id: number
  product_id: number
  size: string
  color: string
  stock: number
  price: number
  rental_price: number
  sku: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  stock: number
  category_id: number
  brand_id: number
//   material: string
//   rental_duration: string
//   occasion: string
  is_new: boolean
  rating: number
  review_count: number
  createdAt: string
  updatedAt: string
  // Joined data
  brand_name?: string
  category_name?: string
  brand?: Brand
  category?: Category
  variants?: ProductVariant[]
  images?: ProductImage[]
}



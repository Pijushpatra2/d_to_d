// import { useState, useEffect } from "react"
// import api from "@/lib/axiosInstance" // 👈 import your global api instance

// // API endpoints - Updated based on your routes
// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api/v1"
// // const BRANDS_API = `${API_BASE_URL}/brands`
// // const CATEGORIES_API = `${API_BASE_URL}/categories`
// // const PRODUCTS_API = `${API_BASE_URL}/products`
// // const PRODUCT_VARIANTS_API = `${API_BASE_URL}/product-variants`
// // const PRODUCT_IMAGES_API = `${API_BASE_URL}/product-images`

// const BRANDS_API = "/brands"
// const CATEGORIES_API = "/categories"
// const PRODUCTS_API = "/products"
// const PRODUCT_VARIANTS_API = "/product-variants"
// const PRODUCT_IMAGES_API = "/product-images"


// // Types for API responses
// interface Brand {
//   id: number
//   name: string
//   image_url?: string
//   description?: string
//   createdAt: string
//   updatedAt: string
// }

// interface Category {
//   id: number
//   name: string
//   description?: string
//   createdAt: string
//   updatedAt: string
// }

// interface ProductImage {
//   id: number
//   product_id: number
//   image_url: string
//   alt_text?: string
//   is_primary: boolean
//   createdAt: string
//   updatedAt: string
// }

// interface ProductVariant {
//   id: number
//   product_id: number
//   size: string
//   color: string
//   stock: number
//   price: number
//   rental_price: number
//   sku: string
//   createdAt: string
//   updatedAt: string
// }

// interface Product {
//   id: number
//   name: string
//   slug: string
//   description: string
//   price: number
//   stock: number
//   category_id: number
//   brand_id: number
//   rating: number
//   review_count: number
//   createdAt: string
//   updatedAt: string
//   // Joined data
//   brand_name?: string
//   category_name?: string
//   brand?: Brand
//   category?: Category
//   variants?: ProductVariant[]
//   images?: ProductImage[]
// }

// export const useProducts = () => {
//   const [products, setProducts] = useState<Product[]>([])
//   const [categories, setCategories] = useState<string[]>([])
//   const [brands, setBrands] = useState<string[]>([])
//   const [colors, setColors] = useState<string[]>([])
//   const [sizes, setSizes] = useState<string[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
//         console.log("🔄 Fetching products data...")
        
//         // Test API endpoints first
//         console.log("🔍 Testing API endpoints...")
//         const endpoints = [
//           { name: "Brands", url: `${BRANDS_API}/get` },
//           { name: "Categories", url: `${CATEGORIES_API}/get` },
//           { name: "Products", url: `${PRODUCTS_API}/get` }
//         ]
        
//         for (const endpoint of endpoints) {
//           try {
//             const response = await api.get(endpoint.url)
//             console.log(`${endpoint.name} API status: ${response.status}`)
//           } catch (err: any) {
//             console.error(`❌ ${endpoint.name} API failed:`, err.response?.status || err.message)
//           }
//         }

//         // Fetch brands
//         console.log("📦 Fetching brands from:", `${BRANDS_API}/get`)
//         const brandsResponse = await api.get(`${BRANDS_API}/get`)
//         const brandsResult = brandsResponse.data
//         console.log("📊 Brands API response:", brandsResult)
        
//         let brandNames: string[] = []
//         if (brandsResult.success && Array.isArray(brandsResult.data)) {
//           brandNames = brandsResult.data.map((brand: Brand) => brand.name)
//         } else if (Array.isArray(brandsResult)) {
//           brandNames = brandsResult.map((brand: Brand) => brand.name)
//         } else if (brandsResult.data && Array.isArray(brandsResult.data)) {
//           brandNames = brandsResult.data.map((brand: Brand) => brand.name)
//         } else {
//           console.warn("⚠️ Unexpected brands API format")
//         }
        
//         setBrands(brandNames)
//         console.log("✅ Processed brands:", brandNames)
        
//         // Fetch categories
//         console.log("📦 Fetching categories from:", `${CATEGORIES_API}/get`)
//         const categoriesResponse = await api.get(`${CATEGORIES_API}/get`)
//         const categoriesResult = categoriesResponse.data
//         console.log("📊 Categories API response:", categoriesResult)
        
//         let categoryNames: string[] = []
//         if (categoriesResult.success && Array.isArray(categoriesResult.data)) {
//           categoryNames = categoriesResult.data.map((category: Category) => category.name)
//         } else if (Array.isArray(categoriesResult)) {
//           categoryNames = categoriesResult.map((category: Category) => category.name)
//         } else if (categoriesResult.data && Array.isArray(categoriesResult.data)) {
//           categoryNames = categoriesResult.data.map((category: Category) => category.name)
//         } else {
//           console.warn("⚠️ Unexpected categories API format")
//         }
        
//         setCategories(categoryNames)
//         console.log("✅ Processed categories:", categoryNames)
        
//         // Fetch products with related data
//         console.log("📦 Fetching products from:", `${PRODUCTS_API}/get`)
//         const productsResponse = await api.get(`${PRODUCTS_API}/get`)
//         const productsResult = productsResponse.data
//         console.log("📊 Products API response structure:", productsResult)
        
//         let productsArray: Product[] = []
//         if (productsResult.success && Array.isArray(productsResult.data)) {
//           productsArray = productsResult.data
//         } else if (Array.isArray(productsResult)) {
//           productsArray = productsResult
//         } else if (productsResult.data && Array.isArray(productsResult.data)) {
//           productsArray = productsResult.data
//         } else if (productsResult.products && Array.isArray(productsResult.products)) {
//           productsArray = productsResult.products
//         } else {
//           console.error("❌ Unexpected products API format")
//           setError("Unexpected API response format")
//           return
//         }
        
//         console.log(`✅ Found ${productsArray.length} products`)
        
//         // Enhanced products with variants and images
//         console.log("🔄 Processing products with variants and images...")
//         const enhancedProducts = await Promise.all(
//           productsArray.map(async (product: Product) => {
//             try {
//               let variants: ProductVariant[] = []
//               let images: ProductImage[] = []
              
//               // --- Fetch product variants ---
//               try {
//                 console.log(`📦 Fetching variants for product ${product.id}`)
//                 const variantsResponse = await api.get(`${PRODUCT_VARIANTS_API}/get/product/${product.id}`)
//                 const variantsResult = variantsResponse.data
//                 console.log(`📊 Variants for product ${product.id}:`, variantsResult)

//                 if (variantsResult.success && Array.isArray(variantsResult.data)) {
//                   variants = variantsResult.data
//                 } else if (Array.isArray(variantsResult)) {
//                   variants = variantsResult
//                 } else if (variantsResult.data && Array.isArray(variantsResult.data)) {
//                   variants = variantsResult.data
//                 }
//               } catch (variantError) {
//                 console.warn(`⚠️ Could not fetch variants for product ${product.id}:`, variantError)
//               }
              
//               // --- Fetch product images ---
//               try {
//                 console.log(`🖼️ Fetching images for product ${product.id}`)
//                 const imagesResponse = await api.get(`${PRODUCT_IMAGES_API}/get/product/${product.id}`)
//                 const imagesResult = imagesResponse.data
//                 console.log(`📊 Images for product ${product.id}:`, imagesResult)

//                 if (imagesResult.success && Array.isArray(imagesResult.data)) {
//                   images = imagesResult.data
//                 } else if (Array.isArray(imagesResult)) {
//                   images = imagesResult
//                 } else if (imagesResult.data && Array.isArray(imagesResult.data)) {
//                   images = imagesResult.data
//                 }
//               } catch (imageError) {
//                 console.warn(`⚠️ Could not fetch images for product ${product.id}:`, imageError)
//               }

//               const normalizedVariants = variants.map(v => ({
//                 ...v,
//                 rental_price: Number(v.rental_price) || 0,
//                 price: Number(v.price) || 0
//               }))

//               return {
//                 ...product,
//                 price: Number(product.price) || 0,
//                 variants: normalizedVariants.length > 0 ? normalizedVariants : undefined,
//                 images: images.length > 0 ? images : undefined
//               }
//             } catch (err) {
//               console.error(`❌ Error enhancing product ${product.id}:`, err)
//               return {
//                 ...product,
//                 price: Number(product.price) || 0
//               }
//             }
//           })
//         )

//         setProducts(enhancedProducts)
//         console.log("✅ Enhanced products:", enhancedProducts)
        
//         const allColors = enhancedProducts.flatMap(p => 
//           p.variants ? p.variants.map((v: ProductVariant) => v.color) : []
//         )
//         const uniqueColors = Array.from(new Set(allColors))
//           .filter(color => color && color !== "")
//         setColors(uniqueColors as string[])
//         console.log("✅ Unique colors:", uniqueColors)
        
//         const allSizes = enhancedProducts.flatMap(p => 
//           p.variants ? p.variants.map((v: ProductVariant) => v.size) : []
//         )
//         const uniqueSizes = Array.from(new Set(allSizes))
//           .filter(size => size && size !== "")
//         setSizes(uniqueSizes as string[])
//         console.log("✅ Unique sizes:", uniqueSizes)
        
//         console.log("🎉 Data fetching completed successfully")
        
//       } catch (err) {
//         console.error("❌ Error fetching data:", err)
//         setError("Failed to load products. Please check if the API server is running.")
//       } finally {
//         setLoading(false)
//       }
//     }
    
//     fetchData()
//   }, [])

//   return {
//     products,
//     categories,
//     brands,
//     colors,
//     sizes,
//     loading,
//     error
//   }
// }









import { useState, useEffect } from "react"
import api from "@/lib/axiosInstance"

const BRANDS_API = "/brands"
const CATEGORIES_API = "/categories"
const PRODUCTS_API = "/products"
const PRODUCT_VARIANTS_API = "/product-variants"
const PRODUCT_IMAGES_API = "/product-images"

// API types
interface Brand {
  id: number
  name: string
  image_url?: string
  description?: string
  createdAt: string
  updatedAt: string
}

interface Category {
  id: number
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

interface ProductImage {
  id: number
  product_id: number
  image_url: string
  alt_text?: string
  is_primary: boolean
  createdAt: string
  updatedAt: string
}

interface ProductVariant {
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

// 🔥 Normalized variant for UI
interface NormalizedProductVariant extends ProductVariant {
  stock_quantity: number
  variant_name: string
  attributes: { key: string; value: string }[]
}

interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  stock: number
  category_id: number
  brand_id: number
  rating: number
  review_count: number
  createdAt: string
  updatedAt: string
  // Joined data
  brand_name?: string
  category_name?: string
  brand?: Brand
  category?: Category
  variants?: NormalizedProductVariant[]
  images?: ProductImage[]
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // --- Fetch brands ---
        const brandsResponse = await api.get(`${BRANDS_API}/get`)
        const brandList: Brand[] =
          brandsResponse.data?.data && Array.isArray(brandsResponse.data.data)
            ? brandsResponse.data.data
            : Array.isArray(brandsResponse.data)
            ? brandsResponse.data
            : []
        const brandMap = new Map<number, Brand>()
        brandList.forEach((b) => brandMap.set(b.id, b))
        setBrands(brandList.map((b) => b.name))

        // --- Fetch categories ---
        const categoriesResponse = await api.get(`${CATEGORIES_API}/get`)
        const categoryList: Category[] =
          categoriesResponse.data?.data && Array.isArray(categoriesResponse.data.data)
            ? categoriesResponse.data.data
            : Array.isArray(categoriesResponse.data)
            ? categoriesResponse.data
            : []
        const categoryMap = new Map<number, Category>()
        categoryList.forEach((c) => categoryMap.set(c.id, c))
        setCategories(categoryList.map((c) => c.name))

        // --- Fetch products ---
        const productsResponse = await api.get(`${PRODUCTS_API}/get`)
        let productsArray: Product[] =
          productsResponse.data?.success && Array.isArray(productsResponse.data.data)
            ? productsResponse.data.data
            : Array.isArray(productsResponse.data)
            ? productsResponse.data
            : productsResponse.data?.data && Array.isArray(productsResponse.data.data)
            ? productsResponse.data.data
            : []

        // --- Enhance products with variants + images ---
        const enhancedProducts = await Promise.all(
          productsArray.map(async (product: Product) => {
            let variants: NormalizedProductVariant[] = []
            let images: ProductImage[] = []

            // fetch variants
            try {
              const variantsResponse = await api.get(
                `${PRODUCT_VARIANTS_API}/get/product/${product.id}`
              )
              const rawVariants: ProductVariant[] =
                variantsResponse.data?.data && Array.isArray(variantsResponse.data.data)
                  ? variantsResponse.data.data
                  : Array.isArray(variantsResponse.data)
                  ? variantsResponse.data
                  : []

              // normalize for UI
              variants = rawVariants.map((v) => ({
                ...v,
                price: Number(v.price) || 0,
                rental_price: Number(v.rental_price) || 0,
                stock_quantity: v.stock ?? 0,
                variant_name: [v.size, v.color].filter(Boolean).join(" - ") || `Variant ${v.id}`,
                attributes: [
                  ...(v.size ? [{ key: "Size", value: v.size }] : []),
                  ...(v.color ? [{ key: "Color", value: v.color }] : []),
                ],
              }))
            } catch (e) {
              console.warn(`⚠️ No variants for product ${product.id}`)
            }

            // fetch images
            try {
              const imagesResponse = await api.get(
                `${PRODUCT_IMAGES_API}/get/product/${product.id}`
              )
              images =
                imagesResponse.data?.data && Array.isArray(imagesResponse.data.data)
                  ? imagesResponse.data.data
                  : Array.isArray(imagesResponse.data)
                  ? imagesResponse.data
                  : []
            } catch (e) {
              console.warn(`⚠️ No images for product ${product.id}`)
            }

            return {
              ...product,
              price: Number(product.price) || 0,
              variants: variants.length > 0 ? variants : undefined,
              images: images.length > 0 ? images : undefined,
              brand_name: brandMap.get(product.brand_id)?.name,
              category_name: categoryMap.get(product.category_id)?.name,
              brand: brandMap.get(product.brand_id),
              category: categoryMap.get(product.category_id),
            }
          })
        )

        setProducts(enhancedProducts)

        // --- collect unique colors & sizes ---
        const allColors = enhancedProducts.flatMap((p) =>
          p.variants ? p.variants.map((v) => v.color) : []
        )
        setColors([...new Set(allColors.filter((c) => c))])

        const allSizes = enhancedProducts.flatMap((p) =>
          p.variants ? p.variants.map((v) => v.size) : []
        )
        setSizes([...new Set(allSizes.filter((s) => s))])
      } catch (err) {
        console.error("❌ Error fetching data:", err)
        setError("Failed to load products.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { products, categories, brands, colors, sizes, loading, error }
}

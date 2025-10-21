import { Product } from "@/types/product"

export const getPrimaryImage = (product: Product): string => {
  if (product.images && product.images.length > 0) {
    const primaryImage = product.images.find(img => img.is_primary)
    return primaryImage?.image_url || product.images[0].image_url
  }
  return "/placeholder.svg"
}

export const getMinRentalPrice = (product: Product): number => {
  if (product.variants && product.variants.length > 0) {
    const rentalPrices = product.variants
      .map(v => Number(v.rental_price))
      .filter(p => !isNaN(p) && p > 0)

    if (rentalPrices.length > 0) {
      return Math.min(...rentalPrices)
    }
  }

  return Number(product.price) || 0
}

export const getOriginalPrice = (product: Product): number => {
  if (product.variants && product.variants.length > 0) {
    const prices = product.variants
      .map(v => Number(v.price))
      .filter(p => !isNaN(p) && p > 0)

    if (prices.length > 0) {
      return Math.max(...prices)
    }
  }

  return Number(product.price) || 0
}


export const getBrandName = (product: Product): string => {
  return product.brand_name || product.brand?.name || "Unknown Brand"
}

export const getCategoryName = (product: Product): string => {
  return product.category_name || product.category?.name || "Unknown Category"
}

export const getAvailableSizes = (product: Product): string[] => {
  if (product.variants && product.variants.length > 0) {
    return Array.from(
      new Set(
        product.variants
          .map(v => v.size)
          .filter((s): s is string => !!s)
      )
    )
  }
  return []
}

export const getAvailableColors = (product: Product): string[] => {
  if (product.variants && product.variants.length > 0) {
    return Array.from(
      new Set(
        product.variants
          .map(v => v.color)
          .filter((c): c is string => !!c)
      )
    )
  }
  return []
}

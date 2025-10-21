// utils/priceUtils.ts (optional helper file)
export const getDiscountedPrice = (original: number) => {
  // Random discount % between 10 and 20
  const discountPercent = Math.floor(Math.random() * (20 - 10 + 1)) + 10
  const discounted = Math.round(original * (1 - discountPercent / 100))

  return { discounted, discountPercent }
}

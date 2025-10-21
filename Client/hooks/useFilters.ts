import { useState, useEffect } from "react"

export const useFilters = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
//   const [selectedOccasions, setSelectedOccasions] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 15000])
  const [sortBy, setSortBy] = useState("featured")
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
    occasion: true,
    color: true,
    size: true,
  })

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (err) {
        console.error("Error parsing wishlist from localStorage:", err)
      }
    }
  }, [])

  const toggleFilter = (value: string, selectedValues: string[], setSelectedValues: (values: string[]) => void) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value))
    } else {
      setSelectedValues([...selectedValues, value])
    }
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedBrands([])
    // setSelectedOccasions([])
    setSelectedColors([])
    setSelectedSizes([])
    setPriceRange([0, 15000])
    setShowNewOnly(false)
  }

  const activeFiltersCount =
    selectedCategories.length +
    selectedBrands.length +
    // selectedOccasions.length +
    selectedColors.length +
    selectedSizes.length +
    (showNewOnly ? 1 : 0)

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const newWishlist = prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]

      localStorage.setItem("wishlist", JSON.stringify(newWishlist))
      window.dispatchEvent(new CustomEvent("wishlistUpdated"))

      return newWishlist
    })
  }

  return {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    selectedBrands,
    setSelectedBrands,
    // selectedOccasions,
    // setSelectedOccasions,
    selectedColors,
    setSelectedColors,
    selectedSizes,
    setSelectedSizes,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    showNewOnly,
    setShowNewOnly,
    clearAllFilters,
    activeFiltersCount,
    expandedSections,
    toggleSection,
    wishlist,
    toggleWishlist
  }
}
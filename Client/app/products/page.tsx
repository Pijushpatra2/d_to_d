"use client"

import { useState, useMemo, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ProductFilters } from "@/components/products/ProductFilters"
import { ProductsToolbar } from "@/components/products/ProductsToolbar"
import { ProductGrid } from "@/components/products/ProductGrid"
import { ProductList } from "@/components/products/ProductList"
import { SearchHeader } from "@/components/products/SearchHeader"
import { useProducts } from "@/hooks/useProducts"
import { useFilters } from "@/hooks/useFilters"

export default function ProductsPage() {
  // State for UI controls
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(true)
  
  // Custom hooks for data and filters
  const { products, categories, brands, colors, sizes, loading, error } = useProducts()
  const {
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
  } = useFilters()

  // Debug: Log products when they change
  useEffect(() => {
    console.log("📦 Products loaded:", products.length)
    products.forEach((product, index) => {
      console.log(`Product ${index}:`, {
        id: product.id,
        name: product.name,
        brand: product.brand_name || product.brand?.name,
        category: product.category_name || product.category?.name,
        variants: product.variants?.length || 0,
        images: product.images?.length || 0,
        rental_price: product.variants?.[0]?.rental_price || product.price
      })
    })
  }, [products])

  // Filter products based on current filters
  // Filtered products logic
  const filteredProducts = useMemo(() => {
    console.log("🔍 Applying filters...")
    console.log("Current filters:", {
      searchQuery,
      selectedCategories,
      selectedBrands,
      // selectedOccasions,
      selectedColors,
      selectedSizes,
      priceRange,
      sortBy,
      showNewOnly
    })

    // ✅ If no filters applied → show all products
    const noFiltersApplied =
      !searchQuery &&
      selectedCategories.length === 0 &&
      selectedBrands.length === 0 &&
      // selectedOccasions.length === 0 &&
      selectedColors.length === 0 &&
      selectedSizes.length === 0 &&
      !showNewOnly

    if (noFiltersApplied) {
      console.log("✨ No filters applied, showing all products")
      return [...products]
    }

    // --- existing filter logic ---
    const filtered = products.filter((product) => {
      let passed = true
      const reasons: string[] = []

      // Search query filter
      if (searchQuery) {
        const matchesSearch = 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.brand_name && product.brand_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (product.brand?.name && product.brand.name.toLowerCase().includes(searchQuery.toLowerCase()))
        
        if (!matchesSearch) {
          reasons.push("search query")
          passed = false
        }
      }

      // Multi-select filters
      if (passed && selectedCategories.length > 0) {
        const categoryName = product.category_name || product.category?.name || ""
        if (!selectedCategories.includes(categoryName)) {
          reasons.push("category")
          passed = false
        }
      }
      
      if (passed && selectedBrands.length > 0) {
        const brandName = product.brand_name || product.brand?.name || ""
        if (!selectedBrands.includes(brandName)) {
          reasons.push("brand")
          passed = false
        }
      }
      
      // if (passed && selectedOccasions.length > 0 && !selectedOccasions.includes(product.occasion)) {
      //   reasons.push("occasion")
      //   passed = false
      // }
      
      // Color and size filters - check if any variant matches
      if (passed && selectedColors.length > 0 && !product.variants?.some(v => selectedColors.includes(v.color))) {
        reasons.push("color")
        passed = false
      }
      
      if (passed && selectedSizes.length > 0 && !product.variants?.some(v => selectedSizes.includes(v.size))) {
        reasons.push("size")
        passed = false
      }
      
      // Price range filter - check if any variant is in range
      if (passed && !product.variants?.some(v => v.rental_price >= priceRange[0] && v.rental_price <= priceRange[1])) {
        reasons.push("price range")
        passed = false
      }
      
      // if (passed && showNewOnly && !product.is_new) {
      //   reasons.push("new only")
      //   passed = false
      // }

      if (!passed && reasons.length > 0) {
        console.log(`❌ Product "${product.name}" filtered out due to: ${reasons.join(", ")}`)
      }

      return passed
    })

    console.log(`📊 Filter results: ${filtered.length} of ${products.length} products passed filters`)

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => {
          const aMinPrice = Math.min(...(a.variants?.map(v => v.rental_price) || [0]))
          const bMinPrice = Math.min(...(b.variants?.map(v => v.rental_price) || [0]))
          return aMinPrice - bMinPrice
        })
        break
      case "price-high":
        filtered.sort((a, b) => {
          const aMaxPrice = Math.max(...(a.variants?.map(v => v.rental_price) || [0]))
          const bMaxPrice = Math.max(...(b.variants?.map(v => v.rental_price) || [0]))
          return bMaxPrice - aMaxPrice
        })
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        break
    }

    return filtered
  }, [
    searchQuery,
    selectedCategories,
    selectedBrands,
    // selectedOccasions,
    selectedColors,
    selectedSizes,
    priceRange,
    sortBy,
    showNewOnly,
    products
  ])


  const handleRentNow = (productId: number) => {
    // Navigate to product detail page for rental process
    window.location.href = `/products/${productId}`
  }

  // Debug component to show raw data
  const DebugPanel = () => {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="fixed bottom-4 right-4 z-50 bg-white p-4 border rounded-lg shadow-lg max-w-md max-h-64 overflow-auto">
          <h3 className="font-bold mb-2">Debug Info</h3>
          <div className="text-xs">
            <p>Products: {products.length}</p>
            <p>Filtered: {filteredProducts.length}</p>
            <p>Categories: {categories.length}</p>
            <p>Brands: {brands.length}</p>
            <button 
              onClick={() => console.log("All products:", products)}
              className="text-blue-500 underline mt-2"
            >
              Log Products to Console
            </button>
          </div>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-black text-white">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* <SearchHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFiltersCount={activeFiltersCount}
          clearAllFilters={clearAllFilters}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          showNewOnly={showNewOnly}
          setShowNewOnly={setShowNewOnly}
        /> */}

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Products Section - Shows first on mobile */}
          <div className="order-2 lg:order-2 flex-1">
            <ProductsToolbar
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              filteredProductsCount={filteredProducts.length}
              totalProductsCount={products.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
              activeFiltersCount={activeFiltersCount}
            />

            {/* Products Display */}
            {viewMode === "grid" ? (
              <ProductGrid 
                products={filteredProducts}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                handleRentNow={handleRentNow}
              />
            ) : (
              <ProductList 
                products={filteredProducts}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                handleRentNow={handleRentNow}
              />
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="border-black text-black hover:bg-black hover:text-white bg-transparent"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

          {/* Filters Section - Shows below products on mobile */}
          <ProductFilters
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            categories={categories}
            brands={brands}
            // occasions={occasions}
            colors={colors}
            sizes={sizes}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            // selectedOccasions={selectedOccasions}
            // setSelectedOccasions={setSelectedOccasions}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            showNewOnly={showNewOnly}
            setShowNewOnly={setShowNewOnly}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            activeFiltersCount={activeFiltersCount}
          />
        </div>
      </div>

      <Footer />
      <DebugPanel />
    </div>
  )
}
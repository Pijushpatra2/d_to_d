import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react"
import { Badge } from "../ui/badge"
import { FilterSection } from "./FilterSection"

interface ProductFiltersProps {
  showFilters: boolean
  setShowFilters: (show: boolean) => void
  categories: string[]
  brands: string[]
  occasions: string[]
  colors: string[]
  sizes: string[]
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  selectedBrands: string[]
  setSelectedBrands: (brands: string[]) => void
  selectedOccasions: string[]
  setSelectedOccasions: (occasions: string[]) => void
  selectedColors: string[]
  setSelectedColors: (colors: string[]) => void
  selectedSizes: string[]
  setSelectedSizes: (sizes: string[]) => void
  priceRange: number[]
  setPriceRange: (range: number[]) => void
  showNewOnly: boolean
  setShowNewOnly: (show: boolean) => void
  expandedSections: Record<string, boolean>
  toggleSection: (section: string) => void
  activeFiltersCount: number
}

export const ProductFilters = ({
  showFilters,
  setShowFilters,
  categories,
  brands,
  occasions,
  colors,
  sizes,
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  selectedOccasions,
  setSelectedOccasions,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  priceRange,
  setPriceRange,
  showNewOnly,
  setShowNewOnly,
  expandedSections,
  toggleSection,
  activeFiltersCount
}: ProductFiltersProps) => {
  const toggleFilter = (value: string, selectedValues: string[], setSelectedValues: (values: string[]) => void) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value))
    } else {
      setSelectedValues([...selectedValues, value])
    }
  }

  return (
    <div className={`order-1 lg:order-1 w-full lg:w-80 lg:flex-shrink-0 transition-all duration-300 ${showFilters ? "block" : "hidden lg:block"}`}>
      <div className="lg:sticky lg:top-8">
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Filters</h2>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="bg-black text-white text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-none lg:max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Category Filter */}
            <FilterSection
              title="Category"
              sectionKey="category"
              options={categories}
              selectedOptions={selectedCategories}
              onOptionToggle={(option) => toggleFilter(option, selectedCategories, setSelectedCategories)}
              isExpanded={expandedSections.category}
              onToggleExpand={() => toggleSection('category')}
            />

            {/* Brand Filter */}
            <FilterSection
              title="Brand"
              sectionKey="brand"
              options={brands}
              selectedOptions={selectedBrands}
              onOptionToggle={(option) => toggleFilter(option, selectedBrands, setSelectedBrands)}
              isExpanded={expandedSections.brand}
              onToggleExpand={() => toggleSection('brand')}
            />

            {/* Price Range */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection('price')}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium">Price Range</h3>
                {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {expandedSections.price && (
                <div className="px-4 pb-4">
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={priceRange[1] > 15000 ? priceRange[1] : 15000}
                      min={0}
                      step={500}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
                      <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Occasion Filter */}
            <FilterSection
              title="Occasion"
              sectionKey="occasion"
              options={occasions}
              selectedOptions={selectedOccasions}
              onOptionToggle={(option) => toggleFilter(option, selectedOccasions, setSelectedOccasions)}
              isExpanded={expandedSections.occasion}
              onToggleExpand={() => toggleSection('occasion')}
            />

            {/* Color Filter */}
            {colors.length > 0 && (
              <FilterSection
                title="Color"
                sectionKey="color"
                options={colors}
                selectedOptions={selectedColors}
                onOptionToggle={(option) => toggleFilter(option, selectedColors, setSelectedColors)}
                isExpanded={expandedSections.color}
                onToggleExpand={() => toggleSection('color')}
              />
            )}

            {/* Size Filter */}
            {sizes.length > 0 && (
              <FilterSection
                title="Size"
                sectionKey="size"
                options={sizes}
                selectedOptions={selectedSizes}
                onOptionToggle={(option) => toggleFilter(option, selectedSizes, setSelectedSizes)}
                isExpanded={expandedSections.size}
                onToggleExpand={() => toggleSection('size')}
              />
            )}

            {/* New Items Only */}
            <div className="p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="new-only"
                  checked={showNewOnly}
                  onCheckedChange={(checked) => setShowNewOnly(checked === true)}
                />
                <label htmlFor="new-only" className="text-sm font-medium cursor-pointer">
                  New arrivals only
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface SearchHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeFiltersCount: number
  clearAllFilters: () => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  selectedBrands: string[]
  setSelectedBrands: (brands: string[]) => void
  showNewOnly: boolean
  setShowNewOnly: (show: boolean) => void
}

export const SearchHeader = ({
  searchQuery,
  setSearchQuery,
  activeFiltersCount,
  clearAllFilters,
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  showNewOnly,
  setShowNewOnly
}: SearchHeaderProps) => {
  const removeFilter = (type: 'category' | 'brand' | 'new', value?: string) => {
    switch (type) {
      case 'category':
        setSelectedCategories(selectedCategories.filter(cat => cat !== value))
        break
      case 'brand':
        setSelectedBrands(selectedBrands.filter(brand => brand !== value))
        break
      case 'new':
        setShowNewOnly(false)
        break
    }
  }

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col gap-4 mb-6">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-black mb-2">Our Collection</h1>
          <p className="text-gray-600">Discover luxury fashion pieces available for rent</p>
        </div>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by name or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border-gray-300 focus:border-black"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm text-gray-600">Active filters:</span>
          {selectedCategories.map((category) => (
            <Badge key={category} variant="secondary" className="bg-black text-white">
              {category}
              <X
                className="w-3 h-3 ml-1 cursor-pointer"
                onClick={() => removeFilter('category', category)}
              />
            </Badge>
          ))}
          {selectedBrands.map((brand) => (
            <Badge key={brand} variant="secondary" className="bg-black text-white">
              {brand}
              <X
                className="w-3 h-3 ml-1 cursor-pointer"
                onClick={() => removeFilter('brand', brand)}
              />
            </Badge>
          ))}
          {showNewOnly && (
            <Badge variant="secondary" className="bg-black text-white">
              New Only
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => removeFilter('new')} 
              />
            </Badge>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters} 
            className="text-gray-600 hover:text-black"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}
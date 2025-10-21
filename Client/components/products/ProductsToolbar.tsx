import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Grid, List } from "lucide-react"

interface ProductsToolbarProps {
  showFilters: boolean
  setShowFilters: (show: boolean) => void
  filteredProductsCount: number
  totalProductsCount: number
  sortBy: string
  setSortBy: (sortBy: string) => void
  viewMode: "grid" | "list"
  setViewMode: (viewMode: "grid" | "list") => void
  activeFiltersCount: number
}

export const ProductsToolbar = ({
  showFilters,
  setShowFilters,
  filteredProductsCount,
  totalProductsCount,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  activeFiltersCount
}: ProductsToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden border-black text-black hover:bg-black hover:text-white w-full sm:w-auto"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
        <p className="text-gray-600 text-sm">
          Showing {filteredProductsCount} of {totalProductsCount} products
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-black">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex border border-gray-300 rounded-lg self-center">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={`rounded-r-none ${viewMode === "grid" ? "bg-black text-white" : "hover:bg-gray-100"}`}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={`rounded-l-none ${viewMode === "list" ? "bg-black text-white" : "hover:bg-gray-100"}`}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
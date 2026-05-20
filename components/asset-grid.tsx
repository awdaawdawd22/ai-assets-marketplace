'use client'

import useSWR from 'swr'
import { useStore } from '@/lib/store'
import { fetchAssets, getAssetsKey, type FetchAssetsParams } from '@/lib/data-service'
import { categories } from '@/lib/mock-data'
import { AssetCard } from '@/components/asset-card'
import { CategorySidebar } from '@/components/category-sidebar'
import { AssetGridSkeleton, CategorySidebarSkeleton } from '@/components/skeletons'
import { ErrorState, EmptyState } from '@/components/states'
import { Button } from '@/components/ui/button'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Package, RefreshCw, Search } from 'lucide-react'

export function AssetGrid() {
  const { 
    searchQuery, 
    selectedCategory, 
    priceFilter, 
    sortBy, 
    setPriceFilter, 
    setSortBy, 
    setSelectedCategory,
    setSearchQuery 
  } = useStore()

  const params: FetchAssetsParams = {
    searchQuery,
    category: selectedCategory,
    priceFilter,
    sortBy,
  }

  const { data, error, isLoading, mutate } = useSWR(
    getAssetsKey(params),
    () => fetchAssets(params),
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000,
    }
  )

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setPriceFilter('all')
  }

  const hasActiveFilters = searchQuery || selectedCategory || priceFilter !== 'all'

  return (
    <div className="flex gap-8">
      <CategorySidebar />
      
      <main className="flex-1 min-w-0">
        {/* Filters Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            {isLoading ? (
              <span className="text-sm text-muted-foreground">Loading assets...</span>
            ) : error ? (
              <span className="text-sm text-destructive">Error loading assets</span>
            ) : (
              <span className="text-sm text-muted-foreground">
                {data?.total ?? 0} {data?.total === 1 ? 'asset' : 'assets'} found
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Mobile Category Filter */}
            <div className="lg:hidden">
              <Select 
                value={selectedCategory || 'all'} 
                onValueChange={(v) => setSelectedCategory(v === 'all' ? null : v)}
              >
                <SelectTrigger className="w-[140px] bg-secondary border-0">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Filter */}
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-[120px] bg-secondary border-0">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="on-sale">On Sale</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-secondary border-0">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <AssetGridSkeleton count={6} />
        ) : error ? (
          <ErrorState
            title="Failed to Load Assets"
            message="We couldn't load the assets. Please try again."
            onRetry={() => mutate()}
          />
        ) : data && data.assets.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {data.assets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No assets found"
            message={
              searchQuery 
                ? `No results for "${searchQuery}". Try adjusting your search or filters.`
                : 'No assets match your current filters. Try adjusting your criteria.'
            }
            icon={<Search className="size-8 text-muted-foreground" />}
            action={
              hasActiveFilters ? (
                <Button onClick={handleClearFilters} variant="secondary">
                  Clear Filters
                </Button>
              ) : undefined
            }
          />
        )}
      </main>
    </div>
  )
}

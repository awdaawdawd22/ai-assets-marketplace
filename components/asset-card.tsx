'use client'

import { useState } from 'react'
import { Asset } from '@/lib/types'
import { useStore } from '@/lib/store'
import { Star, ExternalLink, ImageOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface AssetCardProps {
  asset: Asset
}

export function AssetCard({ asset }: AssetCardProps) {
  const { setSelectedAssetSlug } = useStore()
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleClick = () => {
    setSelectedAssetSlug(asset.slug)
  }

  return (
    <button
      onClick={handleClick}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:border-muted-foreground/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-secondary">
        {imageError ? (
          <div className="flex size-full items-center justify-center bg-secondary">
            <ImageOff className="size-8 text-muted-foreground" />
          </div>
        ) : (
          <>
            {imageLoading && (
              <div className="absolute inset-0 animate-pulse bg-secondary" />
            )}
            <img
              src={asset.images[0]}
              alt={asset.name}
              className={cn(
                'size-full object-cover transition-all duration-300',
                imageLoading ? 'opacity-0' : 'opacity-100',
                'group-hover:scale-105'
              )}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true)
                setImageLoading(false)
              }}
            />
          </>
        )}
        {asset.isOnSale && !asset.price && (
          <Badge className="absolute left-2 top-2 bg-chart-1 text-primary-foreground">
            Free
          </Badge>
        )}
        {asset.isOnSale && asset.price > 0 && (
          <Badge className="absolute left-2 top-2 bg-destructive text-destructive-foreground">
            Sale
          </Badge>
        )}
        {!asset.isOnSale && asset.price === 0 && (
          <Badge className="absolute left-2 top-2 bg-chart-1 text-primary-foreground">
            Free
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
          <ExternalLink className="size-5 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-medium text-foreground line-clamp-1 mb-1">
          {asset.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {asset.shortDescription}
        </p>
        
        {/* Publisher */}
        <div className="mt-auto flex items-center gap-2 mb-3">
          <div className="flex size-6 items-center justify-center rounded-full bg-secondary text-xs font-medium">
            {asset.publisher.avatar}
          </div>
          <span className="text-xs text-muted-foreground truncate max-w-[120px]">
            {asset.publisher.name}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-medium">{asset.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({asset.reviewCount.toLocaleString()})
            </span>
          </div>
          <div className="flex items-center gap-2">
            {asset.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${asset.originalPrice}
              </span>
            )}
            <span className="font-semibold text-foreground">
              {asset.price === 0 ? 'Free' : `$${asset.price}`}
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

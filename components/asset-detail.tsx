'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { Asset, Review } from '@/lib/types'
import { fetchAssetBySlug, fetchReviewsForAsset, getAssetKey, getReviewsKey } from '@/lib/data-service'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AssetDetailSkeleton } from '@/components/skeletons'
import { ErrorState, AssetNotFound } from '@/components/states'
import { cn } from '@/lib/utils'
import { 
  ArrowLeft, 
  Star, 
  Download, 
  ShoppingCart, 
  Heart,
  Share2,
  Check,
  Calendar,
  HardDrive,
  FileCode,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Loader2
} from 'lucide-react'

interface AssetDetailProps {
  assetSlug?: string
  asset?: Asset
}

export function AssetDetail({ assetSlug, asset: initialAsset }: AssetDetailProps) {
  const { setSelectedAssetSlug, addToCart, cart } = useStore()

  // If the caller already provided a loaded `asset` object, skip SWR and render directly
  if (initialAsset) {
    return <AssetDetailContent asset={initialAsset} />
  }

  const { data: asset, error, isLoading, mutate } = useSWR(
    assetSlug ? getAssetKey(assetSlug) : null,
    assetSlug ? () => fetchAssetBySlug(assetSlug) : null,
    { revalidateOnFocus: false }
  )

  const handleBack = () => {
    setSelectedAssetSlug(null)
  }

  if (isLoading) {
    return <AssetDetailSkeleton />
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to Load Asset"
        message="We couldn't load this asset. Please try again."
        onRetry={() => mutate()}
      />
    )
  }

  if (!asset) {
    return <AssetNotFound onBack={handleBack} />
  }

  return <AssetDetailContent asset={asset} />
}

function AssetDetailContent({ asset }: { asset: Asset }) {
  const { setSelectedAssetSlug, addToCart, cart } = useStore()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const isInCart = cart.some(a => a.id === asset.id)

  // Fetch reviews separately with SWR
  const { data: reviews = [], isLoading: reviewsLoading, error: reviewsError, mutate: mutateReviews } = useSWR(
    getReviewsKey(asset.id),
    () => fetchReviewsForAsset(asset.id),
    { revalidateOnFocus: false }
  )

  const handleBack = () => {
    setSelectedAssetSlug(null)
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    // Simulate a brief delay for UX feedback
    await new Promise(resolve => setTimeout(resolve, 300))
    addToCart(asset)
    setIsAddingToCart(false)
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % asset.images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + asset.images.length) % asset.images.length)
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
      >
        <ArrowLeft className="size-4" />
        Back to assets
      </button>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left Column - Gallery & Description */}
        <div className="space-y-6">
          {/* Main Image */}
          <ImageGallery 
            images={asset.images}
            name={asset.name}
            selectedIndex={selectedImageIndex}
            onSelect={setSelectedImageIndex}
            onPrev={prevImage}
            onNext={nextImage}
            isOnSale={asset.isOnSale}
          />

          {/* Description */}
          <section>
            <h2 className="mb-4 text-lg font-semibold">Description</h2>
            <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
              {asset.description.split('\n').map((paragraph, i) => (
                <p key={i} className="text-muted-foreground mb-3">{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="mb-4 text-lg font-semibold">Features</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {asset.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="size-4 text-chart-1 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Reviews ({asset.reviewCount.toLocaleString()})
              </h2>
              <Button variant="outline" size="sm">Write a Review</Button>
            </div>
            
            {reviewsLoading ? (
              <ReviewsSkeleton />
            ) : reviewsError ? (
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <p className="text-sm text-muted-foreground mb-3">Failed to load reviews</p>
                <Button variant="outline" size="sm" onClick={() => mutateReviews()}>
                  Try Again
                </Button>
              </div>
            ) : reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  No reviews yet. Be the first to review!
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Right Column - Purchase Info */}
        <div className="lg:sticky lg:top-20 h-fit space-y-6">
          {/* Main Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h1 className="mb-2 text-xl font-semibold">{asset.name}</h1>
            
            {/* Publisher */}
            <div className="mb-4 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-secondary font-medium text-sm">
                {asset.publisher.avatar}
              </div>
              <div>
                <p className="text-sm font-medium">{asset.publisher.name}</p>
                <p className="text-xs text-muted-foreground">{asset.publisher.assetCount} assets</p>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4 flex items-center gap-2">
              <div className="flex" role="img" aria-label={`Rating: ${asset.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      'size-5',
                      star <= Math.round(asset.rating)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-muted-foreground'
                    )}
                  />
                ))}
              </div>
              <span className="font-medium">{asset.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({asset.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {asset.originalPrice && (
                <span className="mr-2 text-lg text-muted-foreground line-through">
                  ${asset.originalPrice}
                </span>
              )}
              <span className="text-3xl font-bold">
                {asset.price === 0 ? 'Free' : `$${asset.price}`}
              </span>
              {asset.isOnSale && asset.originalPrice && (
                <Badge variant="destructive" className="ml-2">
                  {Math.round((1 - asset.price / asset.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {asset.price === 0 ? (
                <Button className="w-full" size="lg">
                  <Download className="mr-2 size-5" />
                  Download
                </Button>
              ) : isInCart ? (
                <Button className="w-full" size="lg" variant="secondary" disabled>
                  <Check className="mr-2 size-5" />
                  Added to Cart
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? (
                    <Loader2 className="mr-2 size-5 animate-spin" />
                  ) : (
                    <ShoppingCart className="mr-2 size-5" />
                  )}
                  {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </Button>
              )}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Heart className="mr-2 size-4" />
                  Wishlist
                </Button>
                <Button variant="outline" size="icon" aria-label="Share">
                  <Share2 className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Asset Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-muted-foreground">
                  <FileCode className="size-4" />
                  Version
                </dt>
                <dd className="font-medium">{asset.version}</dd>
              </div>
              {asset.unityVersion && (
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <FileCode className="size-4" />
                    Unity Version
                  </dt>
                  <dd className="font-medium">{asset.unityVersion}</dd>
                </div>
              )}
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-muted-foreground">
                  <HardDrive className="size-4" />
                  File Size
                </dt>
                <dd className="font-medium">{asset.fileSize}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="size-4" />
                  Last Updated
                </dt>
                <dd className="font-medium">{new Date(asset.lastUpdated).toLocaleDateString()}</dd>
              </div>
            </dl>

            <Separator className="my-4" />

            {/* Category */}
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-medium">Category</h4>
              <Badge variant="outline">{asset.category}</Badge>
            </div>

            {/* Tags */}
            <div>
              <h4 className="mb-2 text-sm font-medium">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {asset.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ImageGalleryProps {
  images: string[]
  name: string
  selectedIndex: number
  onSelect: (index: number) => void
  onPrev: () => void
  onNext: () => void
  isOnSale?: boolean
}

function ImageGallery({ images, name, selectedIndex, onSelect, onPrev, onNext, isOnSale }: ImageGalleryProps) {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({ 0: true })

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }))
    setImageLoading(prev => ({ ...prev, [index]: false }))
  }

  const handleImageLoad = (index: number) => {
    setImageLoading(prev => ({ ...prev, [index]: false }))
  }

  return (
    <>
      {/* Main Image */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-secondary">
        {imageErrors[selectedIndex] ? (
          <div className="flex size-full items-center justify-center">
            <ImageOff className="size-12 text-muted-foreground" />
          </div>
        ) : (
          <>
            {imageLoading[selectedIndex] && (
              <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                <Loader2 className="size-8 animate-spin text-muted-foreground" />
              </div>
            )}
            <img
              src={images[selectedIndex]}
              alt={`${name} - Image ${selectedIndex + 1}`}
              className={cn(
                'size-full object-cover transition-opacity',
                imageLoading[selectedIndex] ? 'opacity-0' : 'opacity-100'
              )}
              onLoad={() => handleImageLoad(selectedIndex)}
              onError={() => handleImageError(selectedIndex)}
            />
          </>
        )}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
        {isOnSale && (
          <Badge className="absolute left-4 top-4 bg-destructive text-destructive-foreground">
            Sale
          </Badge>
        )}
        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(index)
                if (!imageLoading[index]) {
                  setImageLoading(prev => ({ ...prev, [index]: true }))
                }
              }}
              className={cn(
                'relative shrink-0 aspect-video w-24 overflow-hidden rounded-lg border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                selectedIndex === index
                  ? 'border-foreground'
                  : 'border-transparent hover:border-muted-foreground/50'
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={selectedIndex === index ? 'true' : 'false'}
            >
              {imageErrors[index] ? (
                <div className="flex size-full items-center justify-center bg-secondary">
                  <ImageOff className="size-4 text-muted-foreground" />
                </div>
              ) : (
                <img 
                  src={image} 
                  alt="" 
                  className="size-full object-cover"
                  onError={() => handleImageError(index)}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

function ReviewsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <div key={i} className="rounded-lg border border-border bg-card p-4 animate-pulse">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-secondary" />
              <div>
                <div className="h-4 w-24 bg-secondary rounded mb-1" />
                <div className="h-3 w-16 bg-secondary rounded" />
              </div>
            </div>
            <div className="h-4 w-20 bg-secondary rounded" />
          </div>
          <div className="h-4 w-full bg-secondary rounded mb-2" />
          <div className="h-4 w-3/4 bg-secondary rounded" />
        </div>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState(review.helpful)
  const [hasVoted, setHasVoted] = useState(false)

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpful(prev => prev + 1)
      setHasVoted(true)
    }
  }

  return (
    <article className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-secondary font-medium">
            {review.userAvatar}
          </div>
          <div>
            <p className="font-medium">{review.userName}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(review.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
        <div className="flex" role="img" aria-label={`Rating: ${review.rating} out of 5`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                'size-4',
                star <= review.rating
                  ? 'fill-yellow-500 text-yellow-500'
                  : 'text-muted-foreground'
              )}
            />
          ))}
        </div>
      </div>
      <p className="mb-3 text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
      <button 
        onClick={handleHelpful}
        disabled={hasVoted}
        className={cn(
          'flex items-center gap-1.5 text-xs transition-colors',
          hasVoted 
            ? 'text-chart-1 cursor-default' 
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <ThumbsUp className={cn('size-3.5', hasVoted && 'fill-current')} />
        Helpful ({helpful})
      </button>
    </article>
  )
}

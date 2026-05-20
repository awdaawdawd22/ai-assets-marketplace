'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function AssetCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      {/* Image skeleton */}
      <Skeleton className="aspect-video w-full" />
      
      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-3" />
        
        {/* Publisher */}
        <div className="mt-auto flex items-center gap-2 mb-3">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </div>
  )
}

export function AssetGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <AssetCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function AssetDetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse">
      {/* Back button */}
      <Skeleton className="h-5 w-32 mb-6" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Main Image */}
          <Skeleton className="aspect-video w-full rounded-xl" />
          
          {/* Thumbnails */}
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="aspect-video w-24 rounded-lg" />
            ))}
          </div>

          {/* Description */}
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* Features */}
          <div>
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="grid gap-2 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-5 w-32" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <Skeleton className="h-7 w-3/4 mb-2" />
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="size-8 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-5 w-32 mb-4" />
            <Skeleton className="h-10 w-24 mb-6" />
            <Skeleton className="h-12 w-full mb-3" />
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <Skeleton className="h-5 w-28 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CategorySidebarSkeleton() {
  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-20">
        <Skeleton className="h-4 w-20 mb-4" />
        <div className="flex flex-col gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </aside>
  )
}

'use client'

import { Asset, Review } from './types'
import { assets, reviews, categories as mockCategories, getAssetBySlug as getAssetBySlugSync } from './mock-data'

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Simulate random failures for testing error states (disable for production)
const SIMULATE_ERRORS = false
const ERROR_RATE = 0.1 // 10% chance of error

function maybeThrow() {
  if (SIMULATE_ERRORS && Math.random() < ERROR_RATE) {
    throw new Error('Network error: Failed to fetch data')
  }
}

export interface FetchAssetsParams {
  searchQuery?: string
  category?: string | null
  priceFilter?: string
  sortBy?: string
}

export interface FetchAssetsResult {
  assets: Asset[]
  total: number
}

export async function fetchAssets(params: FetchAssetsParams): Promise<FetchAssetsResult> {
  await delay(300 + Math.random() * 400) // 300-700ms delay
  maybeThrow()
  
  let filtered = [...assets]

  // Search filter
  if (params.searchQuery) {
    const query = params.searchQuery.toLowerCase()
    filtered = filtered.filter(
      a =>
        a.name.toLowerCase().includes(query) ||
        a.shortDescription.toLowerCase().includes(query) ||
        a.tags.some(t => t.toLowerCase().includes(query)) ||
        a.publisher.name.toLowerCase().includes(query)
    )
  }

  // Category filter
  if (params.category && params.category !== 'all') {
    filtered = filtered.filter(a => a.category === params.category)
  }

  // Price filter
  if (params.priceFilter === 'free') {
    filtered = filtered.filter(a => a.price === 0)
  } else if (params.priceFilter === 'paid') {
    filtered = filtered.filter(a => a.price > 0)
  } else if (params.priceFilter === 'on-sale') {
    filtered = filtered.filter(a => a.isOnSale)
  }

  // Sort
  switch (params.sortBy) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      break
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'popular':
      filtered.sort((a, b) => b.reviewCount - a.reviewCount)
      break
    default:
      // relevance - featured first, then by rating
      filtered.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1
        if (!a.isFeatured && b.isFeatured) return 1
        return b.rating - a.rating
      })
  }

  return {
    assets: filtered,
    total: filtered.length,
  }
}

export async function fetchAssetBySlug(slug: string): Promise<Asset | null> {
  await delay(200 + Math.random() * 300) // 200-500ms delay
  maybeThrow()
  
  const asset = getAssetBySlugSync(slug)
  return asset || null
}

export async function fetchReviewsForAsset(assetId: string): Promise<Review[]> {
  await delay(150 + Math.random() * 250) // 150-400ms delay
  maybeThrow()
  
  return reviews.filter(r => r.assetId === assetId)
}

export async function fetchCategories() {
  await delay(100 + Math.random() * 100) // 100-200ms delay
  maybeThrow()
  
  return mockCategories
}

// Hook for SWR
export function getAssetsKey(params: FetchAssetsParams) {
  return ['assets', params.searchQuery, params.category, params.priceFilter, params.sortBy]
}

export function getAssetKey(slug: string) {
  return ['asset', slug]
}

export function getReviewsKey(assetId: string) {
  return ['reviews', assetId]
}

'use client'

import { Asset, Order, Review } from './types'
import {
  assets,
  reviews,
  categories as mockCategories,
  getAssetBySlug as getAssetBySlugSync,
} from './mock-data'

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Control simulation via env var `NEXT_PUBLIC_SIMULATE` (default: false)
const SIMULATE = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SIMULATE === 'true') ?? false
const ERROR_RATE = 0.1 // 10% chance of error when simulation enabled

const ASSET_OVERRIDES_KEY = 'ai-assets-admin-overrides'
const ORDER_STORAGE_KEY = 'ai-assets-orders'

function maybeThrow() {
  if (SIMULATE && Math.random() < ERROR_RATE) {
    throw new Error('Network error: Failed to fetch data')
  }
}

function isClient() {
  return typeof window !== 'undefined'
}

function loadAssetOverrides(): Record<string, Partial<Asset>> {
  if (!isClient()) return {}

  try {
    const raw = window.localStorage.getItem(ASSET_OVERRIDES_KEY)
    return raw ? (JSON.parse(raw) as Record<string, Partial<Asset>>) : {}
  } catch {
    return {}
  }
}

function saveAssetOverrides(overrides: Record<string, Partial<Asset>>) {
  if (!isClient()) return
  window.localStorage.setItem(ASSET_OVERRIDES_KEY, JSON.stringify(overrides))
}

function loadOrders(): Order[] {
  if (!isClient()) return []

  try {
    const raw = window.localStorage.getItem(ORDER_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Order[]) : []
  } catch {
    return []
  }
}

function saveOrders(orders: Order[]) {
  if (!isClient()) return
  window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders))
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

export function getAssetsWithOverrides(): Asset[] {
  const overrides = loadAssetOverrides()
  return assets.map((asset) => ({
    ...asset,
    ...(overrides[asset.slug] ?? {}),
  }))
}

export function saveAssetOverride(slug: string, override: Partial<Asset>) {
  if (!isClient()) return
  const overrides = loadAssetOverrides()
  overrides[slug] = {
    ...overrides[slug],
    ...override,
  }
  saveAssetOverrides(overrides)
}

export function deleteAssetOverride(slug: string) {
  if (!isClient()) return
  const overrides = loadAssetOverrides()
  delete overrides[slug]
  saveAssetOverrides(overrides)
}

export async function fetchAssets(params: FetchAssetsParams): Promise<FetchAssetsResult> {
  if (SIMULATE) await delay(300 + Math.random() * 400) // 300-700ms delay
  maybeThrow()

  let filtered = [...getAssetsWithOverrides()]

  // Search filter
  if (params.searchQuery) {
    const query = params.searchQuery.toLowerCase()
    filtered = filtered.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.shortDescription.toLowerCase().includes(query) ||
        a.tags.some((t) => t.toLowerCase().includes(query)) ||
        a.publisher.name.toLowerCase().includes(query)
    )
  }

  // Category filter
  if (params.category && params.category !== 'all') {
    filtered = filtered.filter((a) => a.category === params.category)
  }

  // Price filter
  if (params.priceFilter === 'free') {
    filtered = filtered.filter((a) => a.price === 0)
  } else if (params.priceFilter === 'paid') {
    filtered = filtered.filter((a) => a.price > 0)
  } else if (params.priceFilter === 'on-sale') {
    filtered = filtered.filter((a) => a.isOnSale)
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
  if (SIMULATE) await delay(200 + Math.random() * 300) // 200-500ms delay
  maybeThrow()

  const asset = getAssetsWithOverrides().find((item) => item.slug === slug)
  return asset || null
}

export async function fetchReviewsForAsset(assetId: string): Promise<Review[]> {
  if (SIMULATE) await delay(150 + Math.random() * 250) // 150-400ms delay
  maybeThrow()

  return reviews.filter((r) => r.assetId === assetId)
}

export async function fetchCategories() {
  if (SIMULATE) await delay(100 + Math.random() * 100) // 100-200ms delay
  maybeThrow()

  return mockCategories
}

export async function fetchOrders(): Promise<Order[]> {
  if (SIMULATE) await delay(150 + Math.random() * 200)
  maybeThrow()

  return loadOrders()
}

export async function saveOrder(order: Order): Promise<Order> {
  if (SIMULATE) await delay(100 + Math.random() * 150)
  maybeThrow()

  const current = loadOrders()
  saveOrders([order, ...current])
  return order
}

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<Order | null> {
  if (SIMULATE) await delay(100 + Math.random() * 150)
  maybeThrow()

  const current = loadOrders()
  const orderIndex = current.findIndex((order) => order.id === orderId)
  if (orderIndex === -1) return null

  const updatedOrder = { ...current[orderIndex], status }
  current[orderIndex] = updatedOrder
  saveOrders(current)

  return updatedOrder
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

export function getOrdersKey() {
  return ['orders']
}

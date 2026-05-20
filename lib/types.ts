export interface Asset {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  category: string
  tags: string[]
  publisher: Publisher
  images: string[]
  version: string
  unityVersion?: string
  fileSize: string
  releaseDate: string
  lastUpdated: string
  features: string[]
  isFeatured?: boolean
  isOnSale?: boolean
}

export interface Publisher {
  id: string
  name: string
  avatar: string
  assetCount: number
  rating: number
}

export interface Review {
  id: string
  assetId: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
  helpful: number
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  count: number
}

export type SortOption = 'relevance' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular'

export type PriceFilter = 'all' | 'free' | 'paid' | 'on-sale'

export interface Order {
  id: string
  createdAt: string
  status: 'completed' | 'pending' | 'cancelled'
  total: number
  items: Asset[]
}

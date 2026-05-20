'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Asset } from './types'

interface StoreState {
  // View state
  selectedAssetSlug: string | null
  searchQuery: string
  selectedCategory: string | null
  priceFilter: string
  sortBy: string
  
  // Cart
  cart: Asset[]
  // Role: buyer | seller
  role: 'buyer' | 'seller'
  
  // Actions
  setSelectedAssetSlug: (slug: string | null) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string | null) => void
  setPriceFilter: (filter: string) => void
  setSortBy: (sort: string) => void
  addToCart: (asset: Asset) => void
  removeFromCart: (assetId: string) => void
  clearCart: () => void
  setRole: (role: 'buyer' | 'seller') => void
  toggleRole: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      selectedAssetSlug: null,
      searchQuery: '',
      selectedCategory: null,
      priceFilter: 'all',
      sortBy: 'relevance',
      cart: [],
        role: 'buyer',
      
      setSelectedAssetSlug: (slug) => set({ selectedAssetSlug: slug }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setPriceFilter: (filter) => set({ priceFilter: filter }),
      setSortBy: (sort) => set({ sortBy: sort }),
      addToCart: (asset) => set((state) => ({ 
        cart: state.cart.find(a => a.id === asset.id) ? state.cart : [...state.cart, asset] 
      })),
      removeFromCart: (assetId) => set((state) => ({ 
        cart: state.cart.filter(a => a.id !== assetId) 
      })),
      clearCart: () => set({ cart: [] }),
      setRole: (role) => set({ role }),
      toggleRole: () => set((state) => ({ role: state.role === 'buyer' ? 'seller' : 'buyer' })),
    }),
    {
      name: 'asset-store',
      partialize: (state) => ({ cart: state.cart, role: state.role }),
    }
  )
)

'use client'

import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/lib/store'
import { useState } from 'react'

export function Header() {
  const { searchQuery, setSearchQuery, cart, setSelectedAssetSlug } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogoClick = () => {
    setSelectedAssetSlug(null)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <button 
          onClick={handleLogoClick}
          className="flex items-center gap-2 font-semibold text-lg shrink-0"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background font-bold">
            A
          </div>
          <span className="hidden sm:inline">Asset Store</span>
        </button>

        {/* Search Bar - Desktop */}
        <div className="hidden flex-1 max-w-xl md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 bg-secondary border-0"
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="sm">Browse</Button>
          <Button variant="ghost" size="sm">Publishers</Button>
          <Button variant="ghost" size="sm">Sales</Button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="size-5" />
            {cart.length > 0 && (
              <Badge className="absolute -right-1 -top-1 size-5 p-0 flex items-center justify-center text-xs">
                {cart.length}
              </Badge>
            )}
          </Button>
          <Button variant="default" size="sm" className="hidden sm:flex">
            Sign In
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t border-border px-4 py-2 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 bg-secondary border-0"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start">Browse</Button>
            <Button variant="ghost" className="justify-start">Publishers</Button>
            <Button variant="ghost" className="justify-start">Sales</Button>
            <Button variant="default" className="mt-2">Sign In</Button>
          </div>
        </nav>
      )}
    </header>
  )
}

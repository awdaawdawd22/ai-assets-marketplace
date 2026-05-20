'use client'

import { Search, ShoppingCart, Menu, X, User, User2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/lib/store'
import { t } from '@/lib/i18n'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function Header() {
  const { searchQuery, setSearchQuery, cart, setSelectedAssetSlug, role, toggleRole } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

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
          <span className="hidden sm:inline">{t('site.name')}</span>
        </button>

        {/* Search Bar - Desktop */}
        <div className="hidden flex-1 max-w-xl md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('header.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 bg-secondary border-0"
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="sm">{t('nav.browse')}</Button>
          <Button variant="ghost" size="sm">{t('nav.publishers')}</Button>
          <Button variant="ghost" size="sm">{t('nav.sales')}</Button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            title="Toggle role"
            onClick={() => toggleRole()}
            className="hidden sm:flex items-center gap-2 rounded-md px-3 py-1 text-sm bg-secondary/60"
          >
            {role === 'buyer' ? <User className="size-4" /> : <User2 className="size-4" />}
            <span className="text-sm">{role === 'buyer' ? t('account.buyer') : t('account.seller')}</span>
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => router.push('/checkout')}
          >
            <ShoppingCart className="size-5" />
            {cart.length > 0 && (
              <Badge className="absolute -right-1 -top-1 size-5 p-0 flex items-center justify-center text-xs">
                {cart.length}
              </Badge>
            )}
          </Button>
            <Button variant="default" size="sm" className="hidden sm:flex" onClick={() => router.push('/checkout')}>
            {t('nav.checkout')}
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
                        placeholder={t('header.search_placeholder')}
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
            <Button variant="ghost" className="justify-start">{t('nav.browse')}</Button>
            <Button variant="ghost" className="justify-start">{t('nav.publishers')}</Button>
            <Button variant="ghost" className="justify-start">{t('nav.sales')}</Button>
            <Button variant="default" className="mt-2" onClick={() => router.push('/account')}>{t('nav.sign_in')}</Button>
          </div>
        </nav>
      )}
    </header>
  )
}

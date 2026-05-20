'use client'

import { Header } from '@/components/header'
import { AssetGrid } from '@/components/asset-grid'

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Каталог</h1>
        <p className="text-sm text-muted-foreground mb-6">Просматривайте доступные ассеты, фильтруйте и покупайте.</p>
        <AssetGrid />
      </div>
    </div>
  )
}

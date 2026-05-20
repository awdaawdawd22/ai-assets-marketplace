'use client'

import { Header } from '@/components/header'
import { AssetGrid } from '@/components/asset-grid'
import { AssetDetail } from '@/components/asset-detail'
import { useStore } from '@/lib/store'
import { getAssetBySlug } from '@/lib/mock-data'

export default function Page() {
  const { selectedAssetSlug } = useStore()
  
  const selectedAsset = selectedAssetSlug ? getAssetBySlug(selectedAssetSlug) : null

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8">
        {selectedAsset ? (
          <AssetDetail asset={selectedAsset} />
        ) : (
          <AssetGrid />
        )}
      </div>
    </div>
  )
}

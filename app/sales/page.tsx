'use client'

import { Header } from '@/components/header'

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Акции</h1>
        <p className="mt-4 text-sm text-muted-foreground">Текущие распродажи и специальные предложения от издателей.</p>
      </div>
    </div>
  )
}

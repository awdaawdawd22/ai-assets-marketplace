'use client'

import { Header } from '@/components/header'
import { AssetGrid } from '@/components/asset-grid'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Users, ShoppingBag, Star } from 'lucide-react'
import Link from 'next/link'
import { useStore } from '@/lib/store'

export default function HomePage() {
  const { setSelectedAssetSlug } = useStore()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-background via-background to-muted/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f610_1px,transparent_1px)] [background-size:50px_50px]"></div>
        
        <div className="mx-auto max-w-7xl px-4 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/80 px-4 py-1.5 text-sm mb-8 border border-border">
            <Sparkles className="size-4 text-primary" /> AI Assets Marketplace
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            Премиум ассеты<br />для <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">AI проектов</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10">
            Тысячи высококачественных 3D-моделей, инструментов, анимаций и VFX-паков от топовых создателей
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="text-lg h-14 px-10" asChild>
              <Link href="/browse">
                Открыть каталог <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8" asChild>
              <Link href="/sell">Стать продавцом</Link>
            </Button>
          </div>

          <div className="flex justify-center gap-12 text-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="size-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">12,400+</div>
                <div className="text-muted-foreground">разработчиков</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <ShoppingBag className="size-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">3,450+</div>
                <div className="text-muted-foreground">ассетов</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Star className="size-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">4.9</div>
                <div className="text-muted-foreground">средний рейтинг</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 border-t">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight">Рекомендуемые ассеты</h2>
              <p className="text-muted-foreground mt-2">Выбор редакции</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/browse">Все ассеты →</Link>
            </Button>
          </div>
          
          <AssetGrid />
        </div>
      </section>
    </div>
  )
}

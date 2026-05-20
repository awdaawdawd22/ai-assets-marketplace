'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function SalesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-2xl font-semibold mb-4">Акции</h1>
        <p className="text-sm text-muted-foreground mb-6">Текущие скидки и промо-ассеты. Воспользуйтесь фильтром "On sale" в каталоге, чтобы увидеть все товары со скидкой.</p>
        <div className="mt-4">
          <Button onClick={() => router.push('/browse')}>Открыть каталог</Button>
        </div>
      </div>
    </div>
  )
}

'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'

export default function PublishersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-2xl font-semibold mb-4">Издатели</h1>
        <p className="text-sm text-muted-foreground mb-6">Список издателей платформы и их работы. В демо версии показываем описание и возможность связаться.</p>

        <div className="space-y-4">
          <div className="rounded-md border p-4">
            <h3 className="font-semibold">Studio A</h3>
            <p className="text-sm text-muted-foreground">Автор множества графических пакетов и UI-ассетов.</p>
            <div className="mt-3">
              <Button variant="outline">Посмотреть работы</Button>
            </div>
          </div>

          <div className="rounded-md border p-4">
            <h3 className="font-semibold">Indie Devs</h3>
            <p className="text-sm text-muted-foreground">Команда разработчиков игр и интерактивных проектов.</p>
            <div className="mt-3">
              <Button variant="outline">Посмотреть работы</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

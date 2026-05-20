'use client'

import { Header } from '@/components/header'

export default function PublishersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Издатели</h1>
        <p className="mt-4 text-sm text-muted-foreground">Список авторов и студий, публикующих активы на нашей платформе.</p>
      </div>
    </div>
  )
}

'use client'

import { Header } from '@/components/header'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function SellPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('0')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const uploadsRaw = window.localStorage.getItem('user-uploads')
    const uploads = uploadsRaw ? JSON.parse(uploadsRaw) : []
    uploads.unshift({ id: Date.now().toString(), name, description, price, createdAt: new Date().toISOString() })
    window.localStorage.setItem('user-uploads', JSON.stringify(uploads))
    setMessage('Ваш лот сохранён локально. (Демо)')
    setName('')
    setDescription('')
    setPrice('0')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Продавайте свои работы</h1>
        <p className="text-sm text-muted-foreground mb-6">Здесь вы можете опубликовать своё произведение для продажи: коды, игры, графика или готовые ассеты.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <div className="text-sm font-medium">Название</div>
            <input className="mt-1 w-full rounded-md border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Описание</div>
            <textarea className="mt-1 w-full rounded-md border px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Цена (USD)</div>
            <input type="number" className="mt-1 w-48 rounded-md border px-3 py-2" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>

          <div>
            <Button type="submit">Опубликовать (демо)</Button>
          </div>
        </form>

        {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  )
}

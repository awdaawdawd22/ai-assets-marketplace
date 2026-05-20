'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function SellPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // demo: save to localStorage (seller uploads)
    const items = JSON.parse(window.localStorage.getItem('seller-items') || '[]')
    items.unshift({ id: Date.now(), title, description, createdAt: new Date().toISOString() })
    window.localStorage.setItem('seller-items', JSON.stringify(items))
    setTitle('')
    setDescription('')
    alert('Спасибо — ваша публикация сохранена локально (демо).')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Продавайте свои работы</h1>
        <p className="mt-2 text-sm text-muted-foreground">Загрузите артефакт, опишите его и начните продавать — демо-режим сохраняет данные локально.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm">Название</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
          </label>
          <label className="block">
            <span className="text-sm">Описание</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
          </label>
          <div className="flex gap-2">
            <Button type="submit">Опубликовать (демо)</Button>
            <Button variant="outline" onClick={() => alert('Загрузка файлов в демо отключена. На продакшене здесь будет загрузчик файлов.')}>Загрузить файл</Button>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-lg font-semibold">Почему продавать у нас</h2>
          <ul className="list-disc ml-6 mt-2 text-sm">
            <li>Продавайте коды, игры, готовые работы и ассеты.</li>
            <li>Мы — агрегатор, помогаем авторам находить покупателей.</li>
            <li>Готовые решения и исходники можно выгружать как пакеты.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

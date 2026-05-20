'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function AccountPage() {
  const { role, setRole } = useStore()
  const router = useRouter()

  useEffect(() => {
    // keep users on account page when role changes
  }, [role])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Личный кабинет</h1>
        <div className="mb-6 flex items-center gap-4">
          <Button variant={role === 'buyer' ? 'secondary' : 'outline'} onClick={() => setRole('buyer')}>Покупатель</Button>
          <Button variant={role === 'seller' ? 'secondary' : 'outline'} onClick={() => setRole('seller')}>Продавец</Button>
        </div>

        {role === 'buyer' ? (
          <div>
            <h2 className="text-lg font-semibold">Функции покупателя</h2>
            <ul className="list-disc ml-6 mt-2 text-sm">
              <li>Просмотр каталога</li>
              <li>Оформление заказов</li>
              <li>История покупок (локально)</li>
            </ul>
            <div className="mt-6">
              <Button onClick={() => router.push('/')}>Перейти в магазин</Button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold">Функции продавца</h2>
            <ul className="list-disc ml-6 mt-2 text-sm">
              <li>Управление своими ассетами (демо)</li>
              <li>Просмотр заказов, связанных с вашими товарами</li>
              <li>Редактирование цен и статусов</li>
            </ul>
            <div className="mt-6">
              <Button onClick={() => router.push('/admin')}>Открыть панель управления (админ)</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { fetchOrders, getOrdersKey, updateOrderStatus } from '@/lib/data-service'
import { isAdminAuthenticated, logoutAdmin } from '@/lib/admin-auth'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/states'
import { ArrowLeft, RefreshCw } from 'lucide-react'

const statusOptions = ['completed', 'pending', 'cancelled'] as const

export default function AdminOrdersPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const { data: orders = [], error, isLoading, mutate } = useSWR(
    isAdmin ? getOrdersKey() : null,
    fetchOrders,
    { revalidateOnFocus: false }
  )

  useEffect(() => {
    setIsAdmin(isAdminAuthenticated())
  }, [])

  const handleStatusChange = async (orderId: string, status: typeof statusOptions[number]) => {
    await updateOrderStatus(orderId, status)
    mutate()
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-xl px-4 py-20">
          <div className="rounded-3xl border border-border bg-card p-10 shadow-sm">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">Admin access required</p>
              <h1 className="text-3xl font-semibold">Please sign in first</h1>
            </div>
            <div className="flex flex-col gap-4">
              <Button onClick={() => router.push('/admin')}>Go to admin login</Button>
              <Button variant="outline" onClick={() => router.push('/')}>Back to store</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Order management</p>
            <h1 className="text-3xl font-semibold">Recent orders</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={() => router.push('/admin')}>Admin dashboard</Button>
            <Button variant="outline" onClick={() => router.push('/')}>Back to store</Button>
            <Button variant="secondary" onClick={() => mutate()}>
              <RefreshCw className="mr-2 size-4" /> Refresh orders
            </Button>
            <Button variant="outline" onClick={() => { logoutAdmin(); router.push('/admin') }}>
              Log out
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-3xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
            Loading orders...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-10 text-sm text-destructive">
            Failed to load orders.
          </div>
        ) : orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            message="Orders will appear here when checkout is completed."
            action={
              <Button onClick={() => router.push('/checkout')}>
                Go to checkout
              </Button>
            }
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-3xl border border-border bg-card p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-lg font-semibold">Order {order.id.slice(0, 8)}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant={order.status === 'completed' ? 'secondary' : order.status === 'pending' ? 'outline' : 'destructive'}>
                      {order.status}
                    </Badge>
                    <span className="text-sm font-semibold">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_220px]">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Items</p>
                    <div className="grid gap-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-border bg-background p-3">
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {item.price === 0 ? 'Free' : `$${item.price}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3 rounded-3xl border border-border bg-secondary/50 p-4">
                    <p className="text-sm font-medium">Change status</p>
                    <div className="grid gap-2">
                      {statusOptions.map((status) => (
                        <Button
                          key={status}
                          variant={order.status === status ? 'secondary' : 'outline'}
                          onClick={() => handleStatusChange(order.id, status)}
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

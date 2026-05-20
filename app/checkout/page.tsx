'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { saveOrder } from '@/lib/data-service'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { EmptyState } from '@/components/states'
import { ShoppingCart, CheckCircle2, ArrowLeft } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, removeFromCart, clearCart } = useStore()
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true)

    const order = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()),
      createdAt: new Date().toISOString(),
      status: 'completed' as const,
      total,
      items: cart,
    }

    await saveOrder(order)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsPlacingOrder(false)
    setOrderPlaced(true)
    clearCart()
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <EmptyState
            title="Your cart is empty"
            message="Add some assets first and return here to complete your order."
            action={
              <Button onClick={() => router.push('/')}>
                <ArrowLeft className="mr-2 size-4" />
                Back to Store
              </Button>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Checkout</p>
            <h1 className="text-3xl font-semibold">Review your order</h1>
          </div>
          <Button variant="ghost" onClick={() => router.push('/')}>Continue shopping</Button>
        </div>

        {orderPlaced ? (
          <div className="rounded-3xl border border-border bg-card p-10 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="size-10" />
            </div>
            <h2 className="mb-3 text-2xl font-semibold">Order placed successfully</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Your mock purchase is complete. Thank you for shopping with Asset Store.
            </p>
            <Button onClick={() => router.push('/')}>Back to marketplace</Button>
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">
            <section className="space-y-6 rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Cart items</h2>
                  <p className="text-sm text-muted-foreground">{cart.length} items in your cart</p>
                </div>
                <Badge variant="secondary">Mock checkout</Badge>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-border bg-background p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-base font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.shortDescription}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-semibold">{item.price === 0 ? 'Free' : `$${item.price}`}</p>
                        <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 rounded-3xl border border-border bg-card p-6">
              <div>
                <p className="text-sm text-muted-foreground">Order summary</p>
                <h2 className="text-xl font-semibold">Total</h2>
              </div>
              <div className="space-y-3 rounded-3xl bg-secondary/50 p-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{total === 0 ? 'Free' : `$${total.toFixed(2)}`}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Tax estimate</span>
                  <span>$0.00</span>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{total === 0 ? 'Free' : `$${total.toFixed(2)}`}</span>
              </div>
              <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={isPlacingOrder}>
                <ShoppingCart className="mr-2 size-5" />
                {isPlacingOrder ? 'Placing order...' : 'Place order'}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => clearCart()}>
                Clear cart
              </Button>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

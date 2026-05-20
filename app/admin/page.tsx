'use client'

import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { fetchAssets, getAssetsKey, saveAssetOverride, deleteAssetOverride, fetchOrders, getOrdersKey } from '@/lib/data-service'
import { isAdminAuthenticated, loginAdmin, logoutAdmin } from '@/lib/admin-auth'
import { Asset, Order } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, RefreshCw } from 'lucide-react'

interface AssetEditState {
  price: string
  isOnSale: boolean
  isFeatured: boolean
}

export default function AdminPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    setIsAdmin(isAdminAuthenticated())
  }, [])

  const { data: assetsData, error: assetsError, isLoading: assetsLoading, mutate: mutateAssets } = useSWR(
    isAdmin ? getAssetsKey({}) : null,
    () => fetchAssets({}),
    { revalidateOnFocus: false }
  )

  const { data: orders = [], error: ordersError, isLoading: ordersLoading, mutate: mutateOrders } = useSWR(
    isAdmin ? getOrdersKey() : null,
    fetchOrders,
    { revalidateOnFocus: false }
  )

  const [edits, setEdits] = useState<Record<string, AssetEditState>>({})

  useEffect(() => {
    if (!assetsData) return

    const initialState = assetsData.assets.reduce<Record<string, AssetEditState>>((acc, asset) => {
      acc[asset.slug] = {
        price: String(asset.price),
        isOnSale: !!asset.isOnSale,
        isFeatured: !!asset.isFeatured,
      }
      return acc
    }, {})

    setEdits(initialState)
  }, [assetsData])

  const summary = useMemo(() => {
    const assetCount = assetsData?.assets.length ?? 0
    const onSaleCount = assetsData?.assets.filter((asset) => asset.isOnSale).length ?? 0
    const completedOrders = orders.filter((order) => order.status === 'completed')
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0)

    return {
      assetCount,
      onSaleCount,
      orderCount: orders.length,
      totalRevenue,
    }
  }, [assetsData, orders])

  const handleUpdate = async (asset: Asset) => {
    const edit = edits[asset.slug]
    if (!edit) return

    saveAssetOverride(asset.slug, {
      price: Number(edit.price),
      isOnSale: edit.isOnSale,
      isFeatured: edit.isFeatured,
    })

    await mutateAssets()
  }

  const handleReset = async (asset: Asset) => {
    deleteAssetOverride(asset.slug)
    await mutateAssets()
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-xl px-4 py-20">
          <div className="rounded-3xl border border-border bg-card p-10 shadow-sm">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">Admin sign in</p>
              <h1 className="text-3xl font-semibold">Enter admin credentials</h1>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-muted-foreground">
                Password
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2"
                  placeholder="Enter password"
                />
              </label>
              {loginError ? (
                <p className="text-sm text-destructive">{loginError}</p>
              ) : (
                <p className="text-sm text-muted-foreground">Demo admin password: <span className="font-medium text-foreground">admin123</span></p>
              )}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    if (loginAdmin(password)) {
                      setIsAdmin(true)
                      setLoginError('')
                    } else {
                      setLoginError('Wrong password, try again.')
                    }
                  }}
                >
                  Sign in
                </Button>
                <Button variant="outline" onClick={() => router.push('/')}>Back to store</Button>
              </div>
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
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
            <h1 className="text-3xl font-semibold">Manage store data</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={() => router.push('/')}>Back to store</Button>
            <Button variant="outline" onClick={() => router.push('/admin/orders')}>Orders</Button>
            <Button variant="outline" onClick={() => { logoutAdmin(); setIsAdmin(false) }}>
              Log out
            </Button>
            <Button variant="secondary" onClick={() => { mutateAssets(); mutateOrders() }}>
              <RefreshCw className="mr-2 size-4" /> Refresh data
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Total assets</p>
            <p className="mt-3 text-3xl font-semibold">{summary.assetCount}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Assets on sale</p>
            <p className="mt-3 text-3xl font-semibold">{summary.onSaleCount}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Orders</p>
            <p className="mt-3 text-3xl font-semibold">{summary.orderCount}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Revenue</p>
            <p className="mt-3 text-3xl font-semibold">
              {summary.totalRevenue === 0 ? 'Free' : `$${summary.totalRevenue.toFixed(2)}`}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Assets</h2>
                  <p className="text-sm text-muted-foreground">Edit prices, featured and sale states.</p>
                </div>
              </div>

              {assetsLoading ? (
                <div className="rounded-3xl border border-border bg-background p-6 text-center text-sm text-muted-foreground">
                  Loading assets...
                </div>
              ) : assetsError ? (
                <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
                  Failed to load asset data.
                </div>
              ) : (
                <div className="space-y-4">
                  {assetsData?.assets.map((asset) => {
                    const edit = edits[asset.slug] || {
                      price: String(asset.price),
                      isOnSale: !!asset.isOnSale,
                      isFeatured: !!asset.isFeatured,
                    }
                    return (
                      <div key={asset.id} className="rounded-3xl border border-border bg-background p-4">
                        <div className="grid gap-4 sm:grid-cols-[1fr_90px_90px_90px] sm:items-end">
                          <div>
                            <p className="font-semibold">{asset.name}</p>
                            <p className="text-sm text-muted-foreground">{asset.category}</p>
                          </div>
                          <label className="space-y-2 text-sm">
                            <span>Price</span>
                            <Input
                              type="number"
                              value={edit.price}
                              onChange={(event) =>
                                setEdits((prev) => ({
                                  ...prev,
                                  [asset.slug]: {
                                    ...edit,
                                    price: event.target.value,
                                  },
                                }))
                              }
                            />
                          </label>
                          <label className="space-y-2 text-sm">
                            <span>On sale</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={edit.isOnSale}
                                onChange={(event) =>
                                  setEdits((prev) => ({
                                    ...prev,
                                    [asset.slug]: {
                                      ...edit,
                                      isOnSale: event.target.checked,
                                    },
                                  }))
                                }
                              />
                              <span className="text-sm text-muted-foreground">Enabled</span>
                            </div>
                          </label>
                          <label className="space-y-2 text-sm">
                            <span>Featured</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={edit.isFeatured}
                                onChange={(event) =>
                                  setEdits((prev) => ({
                                    ...prev,
                                    [asset.slug]: {
                                      ...prev[asset.slug],
                                      isFeatured: event.target.checked,
                                    },
                                  }))
                                }
                              />
                              <span className="text-sm text-muted-foreground">Yes</span>
                            </div>
                          </label>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <Button size="sm" onClick={() => handleUpdate(asset)}>
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleReset(asset)}>
                            Reset
                          </Button>
                          <Badge variant={asset.isOnSale ? 'destructive' : 'secondary'}>
                            {asset.isOnSale ? 'On sale' : 'Regular'}
                          </Badge>
                          {asset.isFeatured && <Badge>Featured</Badge>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Recent orders</h2>
                <p className="text-sm text-muted-foreground">Track orders created from checkout.</p>
              </div>
              {ordersLoading ? (
                <div className="rounded-3xl border border-border bg-background p-6 text-center text-sm text-muted-foreground">
                  Loading orders...
                </div>
              ) : ordersError ? (
                <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
                  Failed to load orders.
                </div>
              ) : orders.length === 0 ? (
                <div className="rounded-3xl border border-border bg-background p-6 text-sm text-muted-foreground">
                  No orders yet. Place an order from the checkout page.
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="rounded-3xl border border-border bg-background p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold">{order.items.length} items</p>
                          <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
                          <Badge className="mt-1">{order.status}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Store insights</h2>
                <Badge>{orders.length} total orders</Badge>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Top active assets</span>
                  <span>{summary.assetCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Highest revenue</span>
                  <span>${summary.totalRevenue.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Assets on sale</span>
                  <span>{summary.onSaleCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

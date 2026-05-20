'use client'

import { AlertCircle, Package, RefreshCw, WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({ 
  title = 'Something went wrong', 
  message = 'We couldn\'t load the data. Please try again.',
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="size-8 text-destructive" />
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary">
          <RefreshCw className="mr-2 size-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}

export function NetworkErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Connection Problem"
      message="Please check your internet connection and try again."
      onRetry={onRetry}
    />
  )
}

interface EmptyStateProps {
  title?: string
  message?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({
  title = 'No results found',
  message = 'Try adjusting your search or filters.',
  icon,
  action
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-secondary">
        {icon || <Package className="size-8 text-muted-foreground" />}
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">{message}</p>
      {action}
    </div>
  )
}

interface AssetNotFoundProps {
  onBack?: () => void
}

export function AssetNotFound({ onBack }: AssetNotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-secondary">
        <Package className="size-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-medium">Asset Not Found</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        The asset you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      {onBack && (
        <Button onClick={onBack} variant="secondary">
          Back to Assets
        </Button>
      )}
    </div>
  )
}

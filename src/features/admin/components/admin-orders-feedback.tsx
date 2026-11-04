import { Button } from '@/components/ui/button'

const SKELETON_TILES = 4
const SKELETON_ROWS = 3

export function AdminOrdersLoading() {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-7">
      <span className="sr-only">Loading orders…</span>
      <div aria-hidden="true" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {Array.from({ length: SKELETON_TILES }, (_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
      <div aria-hidden="true" className="flex flex-col gap-3">
        {Array.from({ length: SKELETON_ROWS }, (_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    </div>
  )
}

interface AdminOrdersErrorProps {
  readonly message: string
  readonly onRetry: () => void
}

export function AdminOrdersError({ message, onRetry }: AdminOrdersErrorProps) {
  return (
    <div role="alert" className="rounded-2xl border border-destructive/20 bg-card p-6">
      <p className="text-sm font-medium text-neutral-900">Could not load orders</p>
      <p className="mt-1 text-sm text-neutral-500">{message}</p>
      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}

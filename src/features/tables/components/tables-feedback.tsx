import { Button } from '@/components/ui/button'

const SKELETON_TABLES = 12

export function TablesLoading() {
  return (
    <div role="status" aria-live="polite" className="rounded-2xl bg-muted/70 p-6">
      <span className="sr-only">Loading tables…</span>
      <div aria-hidden="true" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: SKELETON_TABLES }, (_, index) => (
          <div key={index} className="aspect-square animate-pulse rounded-xl bg-neutral-200/70" />
        ))}
      </div>
    </div>
  )
}

interface TablesErrorProps {
  readonly message: string
  readonly onRetry: () => void
}

export function TablesError({ message, onRetry }: TablesErrorProps) {
  return (
    <div role="alert" className="rounded-2xl border border-destructive/20 bg-card p-6">
      <p className="text-sm font-medium text-neutral-900">Could not load tables</p>
      <p className="mt-1 text-sm text-neutral-500">{message}</p>
      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}

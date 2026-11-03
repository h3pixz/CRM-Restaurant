import { Button } from '@/components/ui/button'

export function AnalyticsLoading() {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-6">
      <span className="sr-only">Loading analytics…</span>
      <div aria-hidden="true" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
      <div aria-hidden="true" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="h-72 animate-pulse rounded-2xl bg-muted lg:col-span-2" />
        <div className="h-72 animate-pulse rounded-2xl bg-muted" />
      </div>
    </div>
  )
}

interface AnalyticsErrorProps {
  readonly message: string
  readonly onRetry: () => void
}

export function AnalyticsError({ message, onRetry }: AnalyticsErrorProps) {
  return (
    <div role="alert" className="rounded-2xl border border-destructive/20 bg-card p-6">
      <p className="text-sm font-medium text-neutral-900">Could not load analytics</p>
      <p className="mt-1 text-sm text-neutral-500">{message}</p>
      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}

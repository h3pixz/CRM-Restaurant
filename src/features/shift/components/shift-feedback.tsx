import { Button } from '@/components/ui/button'

export function ShiftLoading() {
  return (
    <div role="status" aria-live="polite" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <span className="sr-only">Loading shifts…</span>
      {Array.from({ length: 2 }, (_, index) => (
        <div key={index} aria-hidden="true" className="h-72 animate-pulse rounded-2xl bg-muted" />
      ))}
    </div>
  )
}

interface ShiftErrorProps {
  readonly message: string
  readonly onRetry: () => void
}

export function ShiftError({ message, onRetry }: ShiftErrorProps) {
  return (
    <div role="alert" className="rounded-2xl border border-destructive/20 bg-card p-6">
      <p className="text-sm font-medium text-neutral-900">Could not load shifts</p>
      <p className="mt-1 text-sm text-neutral-500">{message}</p>
      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}

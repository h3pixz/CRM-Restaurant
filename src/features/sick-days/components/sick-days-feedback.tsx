import { Button } from '@/components/ui/button'

const SKELETON_ROWS = 5

export function SickDaysLoading() {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-3">
      <span className="sr-only">Loading sick day records…</span>
      {Array.from({ length: SKELETON_ROWS }, (_, index) => (
        <div key={index} aria-hidden="true" className="h-16 animate-pulse rounded-xl bg-muted" />
      ))}
    </div>
  )
}

interface SickDaysErrorProps {
  readonly message: string
  readonly onRetry: () => void
}

export function SickDaysError({ message, onRetry }: SickDaysErrorProps) {
  return (
    <div role="alert" className="rounded-2xl border border-destructive/20 bg-card p-6">
      <p className="text-sm font-medium text-neutral-900">Could not load sick day records</p>
      <p className="mt-1 text-sm text-neutral-500">{message}</p>
      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}

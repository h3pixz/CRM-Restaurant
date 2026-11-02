import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

const SKELETON_ROWS = 4

export function TableOrderLoading() {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-3">
      <span className="sr-only">Loading order…</span>
      {Array.from({ length: SKELETON_ROWS }, (_, index) => (
        <div key={index} aria-hidden="true" className="h-14 animate-pulse rounded-xl bg-muted" />
      ))}
    </div>
  )
}

interface TableOrderErrorProps {
  readonly message: string
  readonly onRetry: () => void
}

export function TableOrderError({ message, onRetry }: TableOrderErrorProps) {
  return (
    <div role="alert" className="rounded-2xl border border-destructive/20 bg-card p-6">
      <p className="text-sm font-medium text-neutral-900">Could not load the order</p>
      <p className="mt-1 text-sm text-neutral-500">{message}</p>
      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}

interface TableOrderMessageProps {
  readonly title: string
  readonly description: string
}

function TableOrderMessage({ title, description }: TableOrderMessageProps) {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-card p-10 text-center">
      <p className="text-sm font-medium text-neutral-900">{title}</p>
      <p className="mt-1 text-sm text-neutral-500">{description}</p>
      <Button asChild variant="outline" size="sm" className="mt-4">
        <Link to="/tables">Back to tables</Link>
      </Button>
    </div>
  )
}

export function TableOrderNotFound() {
  return (
    <TableOrderMessage
      title="Table not found"
      description="The table may have been removed from the floor plan."
    />
  )
}

export function TableOrderEmpty() {
  return (
    <TableOrderMessage
      title="No order yet"
      description="This table has no active order."
    />
  )
}

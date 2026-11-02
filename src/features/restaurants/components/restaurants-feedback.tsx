import { Button } from '@/components/ui/button'

const PANEL_CLASS =
  'order-2 flex min-h-0 flex-1 flex-col border-t border-gray-200/90 bg-[#fbfbfc] lg:order-1 lg:w-[365px] lg:flex-none lg:border-t-0 lg:border-r'

const SKELETON_CARDS = 3

export function RestaurantsLoading() {
  return (
    <aside className={PANEL_CLASS} role="status" aria-live="polite">
      <span className="sr-only">Loading restaurants…</span>

      <div aria-hidden="true" className="shrink-0 border-b border-gray-100 bg-white/70 p-3 pb-2">
        <div className="h-8 animate-pulse rounded-lg bg-gray-200/70" />
      </div>

      <div aria-hidden="true" className="space-y-3 p-3">
        {Array.from({ length: SKELETON_CARDS }, (_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-xl bg-gray-200/70" />
        ))}
      </div>
    </aside>
  )
}

interface RestaurantsErrorProps {
  readonly message: string
  readonly onRetry: () => void
}

export function RestaurantsError({ message, onRetry }: RestaurantsErrorProps) {
  return (
    <aside className={PANEL_CLASS}>
      <div role="alert" className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <p className="text-sm font-medium text-gray-800">Could not load restaurants</p>
        <p className="mt-1 max-w-xs text-xs text-gray-500">{message}</p>
        <Button type="button" variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      </div>
    </aside>
  )
}

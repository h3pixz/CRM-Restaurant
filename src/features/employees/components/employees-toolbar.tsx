import { Funnel, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmployeesToolbar() {
  return (
    <div className="mb-4 flex items-center justify-between">
      <Button
        type="button"
        variant="secondary"
        className="h-7 gap-2 rounded-md px-3 text-xs font-semibold text-neutral-700 hover:bg-neutral-300/80"
      >
        <Funnel aria-hidden="true" className="size-3.5 text-neutral-500" strokeWidth={2} />
        Filters
      </Button>

      <Button
        type="button"
        variant="secondary"
        size="icon-sm"
        aria-label="Search"
        className="rounded-md text-neutral-700 hover:bg-neutral-300/80"
      >
        <Search aria-hidden="true" className="size-4 text-neutral-600" strokeWidth={2} />
      </Button>
    </div>
  )
}

import { Funnel, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface EmployeesToolbarProps {
  readonly search: string
  readonly onSearchChange: (value: string) => void
}

export function EmployeesToolbar({ search, onSearchChange }: EmployeesToolbarProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <Button
        type="button"
        variant="secondary"
        className="h-7 gap-2 rounded-md px-3 text-xs font-semibold text-neutral-700 hover:bg-neutral-300/80"
      >
        <Funnel aria-hidden="true" className="size-3.5 text-neutral-500" strokeWidth={2} />
        Filters
      </Button>

      <div className="relative w-full max-w-64">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-neutral-500"
          strokeWidth={2}
        />
        <Input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or email"
          aria-label="Search employees"
          className="h-8 rounded-md border-neutral-200 bg-white pr-3 pl-8 text-xs shadow-xs placeholder:text-neutral-400"
        />
      </div>
    </div>
  )
}

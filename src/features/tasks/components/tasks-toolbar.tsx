import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface TasksToolbarProps {
  readonly search: string
  readonly onSearchChange: (value: string) => void
}

export function TasksToolbar({ search, onSearchChange }: TasksToolbarProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs font-medium text-neutral-500">
        Tasks are stored as demo data for the current version of the CRM.
      </p>

      <div className="relative w-full sm:max-w-64">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-neutral-500"
          strokeWidth={2}
        />
        <Input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks or assignees"
          aria-label="Search tasks"
          className="h-8 rounded-md border-neutral-200 bg-white pr-3 pl-8 text-xs shadow-xs placeholder:text-neutral-400"
        />
      </div>
    </div>
  )
}

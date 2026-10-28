import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { EmployeeFilter } from '../types/employee'

export interface EmployeeMetric {
  readonly key: EmployeeFilter
  readonly label: string
  readonly value: number
}

interface EmployeesMetricsProps {
  readonly metrics: readonly EmployeeMetric[]
  readonly activeFilter: EmployeeFilter
  readonly onFilterChange: (filter: EmployeeFilter) => void
}

export function EmployeesMetrics({
  metrics,
  activeFilter,
  onFilterChange,
}: EmployeesMetricsProps) {
  return (
    <section aria-label="Employee statistics" className="mb-7 grid grid-cols-1 gap-6 md:grid-cols-3">
      {metrics.map((metric) => {
        const isActive = metric.key === activeFilter

        return (
          <article
            key={metric.key}
            className={cn(
              'flex flex-col justify-between rounded-2xl bg-muted/70 p-6 transition-shadow',
              isActive && 'ring-1 ring-neutral-400/70',
            )}
          >
            <span className="mb-3 text-xs font-semibold text-neutral-500">{metric.label}</span>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex flex-1 items-center gap-6 pr-6">
                <span className="text-4xl font-bold tracking-tight text-neutral-900">
                  {metric.value}
                </span>
                <div className="h-[1.5px] w-full rounded-full bg-neutral-400/80" />
              </div>

              <Button
                type="button"
                variant="outline"
                aria-pressed={isActive}
                onClick={() => onFilterChange(metric.key)}
                className={cn(
                  'h-7 rounded-md border-neutral-200/50 bg-white px-4 text-xs font-medium text-neutral-800 shadow-sm hover:bg-neutral-50',
                  isActive && 'border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800',
                )}
              >
                View
              </Button>
            </div>
          </article>
        )
      })}
    </section>
  )
}

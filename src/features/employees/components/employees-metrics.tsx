import { Button } from '@/components/ui/button'

export interface EmployeeMetric {
  readonly key: string
  readonly label: string
  readonly value: number
}

interface EmployeesMetricsProps {
  metrics: readonly EmployeeMetric[]
}

export function EmployeesMetrics({ metrics }: EmployeesMetricsProps) {
  return (
    <section aria-label="Employee statistics" className="mb-7 grid grid-cols-1 gap-6 md:grid-cols-3">
      {metrics.map((metric) => (
        <article key={metric.key} className="flex flex-col justify-between rounded-2xl bg-muted/70 p-6">
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
              className="h-7 rounded-md border-neutral-200/50 bg-white px-4 text-xs font-medium text-neutral-800 shadow-sm hover:bg-neutral-50 cursor-pointer"
            >
              View
            </Button>
          </div>
        </article>
      ))}
    </section>
  )
}

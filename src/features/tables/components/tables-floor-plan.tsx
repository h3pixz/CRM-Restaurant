import type { RestaurantTable } from '../types/table'
import { TableCard } from './table-card'

interface TablesFloorPlanProps {
  readonly tables: readonly RestaurantTable[]
  readonly emptyMessage: string
}

export function TablesFloorPlan({ tables, emptyMessage }: TablesFloorPlanProps) {
  return (
    <section
      aria-label="Table floor plan"
      className="rounded-2xl border border-neutral-100 bg-muted/70 p-6"
    >
      {tables.length === 0 ? (
        <p className="py-12 text-center text-sm text-neutral-500">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {tables.map((table) => (
            <TableCard key={table.id} table={table} />
          ))}
        </div>
      )}
    </section>
  )
}

import { Link } from '@tanstack/react-router'
import type { OrderItem } from '@/features/tables'
import { formatCurrency } from '@/utils/format-currency'

export interface AdminOrderRow {
  readonly tableId: string
  readonly tableLabel: string
  readonly items: readonly OrderItem[]
  readonly itemsCount: number
  readonly total: number
}

interface AdminOrdersListProps {
  readonly rows: readonly AdminOrderRow[]
}

export function AdminOrdersList({ rows }: AdminOrdersListProps) {
  return (
    <section
      aria-label="Current checks"
      className="overflow-hidden rounded-2xl border border-neutral-100 bg-card"
    >
      <header className="flex items-center justify-between gap-3 border-b border-neutral-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-900">Current checks</h2>
        <span className="text-xs text-neutral-500">{rows.length} open</span>
      </header>

      {rows.length === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-neutral-500">
          No open checks yet. Tables with items on the order will appear here.
        </p>
      ) : (
        <ul className="divide-y divide-neutral-100">
          {rows.map((row) => (
            <li key={row.tableId} className="px-5 py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-base font-semibold text-neutral-900">
                    Table {row.tableLabel}
                  </h3>
                  <span className="text-xs text-neutral-500">
                    {row.itemsCount} {row.itemsCount === 1 ? 'item' : 'items'} ·{' '}
                    {row.items.length} {row.items.length === 1 ? 'position' : 'positions'}
                  </span>
                </div>
                <span className="text-base font-semibold text-neutral-900">
                  {formatCurrency(row.total)}
                </span>
              </div>

              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                {row.items.map((item) => (
                  <li key={item.id} className="text-xs text-neutral-600">
                    <span className="font-semibold text-neutral-800">{item.quantity}×</span>{' '}
                    {item.name}
                    {item.note && <span className="text-neutral-500"> — {item.note}</span>}
                  </li>
                ))}
              </ul>

              <Link
                to="/tables/$tableId"
                params={{ tableId: row.tableId }}
                className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-neutral-800 underline-offset-4 transition-colors hover:text-black hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Open order
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

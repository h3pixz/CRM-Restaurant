import { ORDER_CATEGORY_LABELS, type OrderCategory } from '@/features/tables'
import { formatCurrency } from '@/utils/format-currency'

export interface CategoryRevenue {
  readonly category: OrderCategory
  readonly total: number
}

interface RevenueByCategoryPanelProps {
  readonly entries: readonly CategoryRevenue[]
  readonly revenue: number
}

export function RevenueByCategoryPanel({ entries, revenue }: RevenueByCategoryPanelProps) {
  const maxTotal = Math.max(...entries.map((entry) => entry.total), 0)

  return (
    <section
      aria-label="Revenue by category"
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-card"
    >
      <header className="flex items-center justify-between gap-3 border-b border-neutral-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-900">Revenue by category</h2>
        <span className="text-xs text-neutral-500">{formatCurrency(revenue)} in total</span>
      </header>

      {revenue === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-neutral-500">
          No orders yet. Revenue will appear here once checks are opened.
        </p>
      ) : (
        <ul className="flex flex-col gap-5 px-5 py-5">
          {entries.map((entry) => {
            const share = revenue === 0 ? 0 : Math.round((entry.total / revenue) * 100)

            return (
              <li key={entry.category}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium text-neutral-700">
                    {ORDER_CATEGORY_LABELS[entry.category]}
                  </span>
                  <span className="flex items-baseline gap-2">
                    <span className="text-[11px] text-neutral-500">{share}%</span>
                    <span className="text-sm font-semibold text-neutral-900">
                      {formatCurrency(entry.total)}
                    </span>
                  </span>
                </div>

                <div className="mt-2 h-2.5 rounded-full bg-neutral-100">
                  <div
                    title={`${ORDER_CATEGORY_LABELS[entry.category]}: ${formatCurrency(entry.total)}`}
                    className="h-2.5 rounded-full bg-neutral-900"
                    style={{ width: `${maxTotal === 0 ? 0 : (entry.total / maxTotal) * 100}%` }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

import { Link } from '@tanstack/react-router'
import {
  ORDER_CATEGORIES,
  ORDER_CATEGORY_LABELS,
  type OrderCategory,
  type TableOrder,
} from '@/features/tables'
import { formatCurrency } from '@/utils/format-currency'

interface HomeRevenuePanelProps {
  readonly orders: readonly TableOrder[]
}

export function HomeRevenuePanel({ orders }: HomeRevenuePanelProps) {
  const totals = ORDER_CATEGORIES.map((category: OrderCategory) => ({
    category,
    total: orders.reduce(
      (sum, order) =>
        sum +
        order.items
          .filter((item) => item.category === category)
          .reduce((itemSum, item) => itemSum + item.price * item.quantity, 0),
      0,
    ),
  }))

  const maxTotal = Math.max(...totals.map((entry) => entry.total), 0)
  const revenue = totals.reduce((sum, entry) => sum + entry.total, 0)

  return (
    <section
      aria-label="Revenue by category"
      className="flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-card"
    >
      <header className="flex items-center justify-between gap-3 border-b border-neutral-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-900">Revenue by category</h2>
        <Link
          to="/analytics"
          className="inline-flex min-h-11 items-center text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900 md:min-h-0"
        >
          Open analytics
        </Link>
      </header>

      {revenue === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-neutral-500">
          No orders yet. Current checks will show up here.
        </p>
      ) : (
        <div className="px-5 py-5">
          <ul className="flex flex-col gap-4">
            {totals.map((entry) => (
              <li key={entry.category}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-xs font-medium text-neutral-600">
                    {ORDER_CATEGORY_LABELS[entry.category]}
                  </span>
                  <span className="text-xs font-semibold text-neutral-900">
                    {formatCurrency(entry.total)}
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-neutral-100">
                  <div
                    title={`${ORDER_CATEGORY_LABELS[entry.category]}: ${formatCurrency(entry.total)}`}
                    className="h-2 rounded-full bg-neutral-900"
                    style={{ width: `${maxTotal === 0 ? 0 : (entry.total / maxTotal) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-[11px] text-neutral-400">
            {formatCurrency(revenue)} across all current checks
          </p>
        </div>
      )}
    </section>
  )
}

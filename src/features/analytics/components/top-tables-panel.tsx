import { formatCurrency } from '@/utils/format-currency'

export interface TopTableRow {
  readonly id: string
  readonly label: string
  readonly itemsCount: number
  readonly total: number
}

interface TopTablesPanelProps {
  readonly rows: readonly TopTableRow[]
}

export function TopTablesPanel({ rows }: TopTablesPanelProps) {
  const maxTotal = Math.max(...rows.map((row) => row.total), 0)

  return (
    <section
      aria-label="Top tables by check size"
      className="overflow-hidden rounded-2xl border border-neutral-100 bg-card"
    >
      <header className="flex items-center justify-between gap-3 border-b border-neutral-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-900">Top tables by check size</h2>
        <span className="text-xs text-neutral-500">{rows.length} shown</span>
      </header>

      {rows.length === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-neutral-500">
          No open checks yet. Tables with orders will be ranked here.
        </p>
      ) : (
        <ul className="divide-y divide-neutral-100">
          {rows.map((row, index) => (
            <li key={row.id} className="px-5 py-4">
              <div className="flex items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-2.5">
                  <span className="w-4 text-[11px] font-semibold text-neutral-500">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-neutral-900">Table {row.label}</span>
                  <span className="text-[11px] text-neutral-500">
                    {row.itemsCount} {row.itemsCount === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <span className="text-sm font-semibold text-neutral-900">
                  {formatCurrency(row.total)}
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-neutral-100">
                <div
                  title={`Table ${row.label}: ${formatCurrency(row.total)}`}
                  className="h-2 rounded-full bg-neutral-900"
                  style={{ width: `${maxTotal === 0 ? 0 : (row.total / maxTotal) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

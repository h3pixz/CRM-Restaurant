import { Link } from '@tanstack/react-router'
import type { RestaurantTable, TableStatus } from '@/features/tables'

interface HomeFloorPanelProps {
  readonly tables: readonly RestaurantTable[]
}

const SEGMENTS: readonly { key: TableStatus; label: string; dotClass: string }[] = [
  { key: 'free', label: 'Free', dotClass: 'bg-[#bbf78a]' },
  { key: 'occupied', label: 'Occupied', dotClass: 'bg-[#f8cf62]' },
  { key: 'reserved', label: 'Reserved', dotClass: 'bg-[#f6685e]' },
]

export function HomeFloorPanel({ tables }: HomeFloorPanelProps) {
  const counts: Record<TableStatus, number> = { free: 0, occupied: 0, reserved: 0 }

  for (const table of tables) {
    counts[table.status] += 1
  }

  const total = tables.length

  return (
    <section
      aria-label="Floor overview"
      className="flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-card"
    >
      <header className="flex items-center justify-between gap-3 border-b border-neutral-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-900">Floor overview</h2>
        <Link
          to="/tables"
          className="inline-flex min-h-11 items-center text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900 lg:min-h-0"
        >
          Open tables
        </Link>
      </header>

      {total === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-neutral-500">
          No tables yet. Add documents to the &quot;tables&quot; collection in Firestore.
        </p>
      ) : (
        <div className="px-5 py-5">
          <div
            role="img"
            aria-label={`Free: ${counts.free}, occupied: ${counts.occupied}, reserved: ${counts.reserved}`}
            className="flex h-2 gap-[2px]"
          >
            {SEGMENTS.map((segment) =>
              counts[segment.key] === 0 ? null : (
                <div
                  key={segment.key}
                  title={`${segment.label}: ${counts[segment.key]}`}
                  className={`h-2 rounded-full ${segment.dotClass}`}
                  style={{ width: `${(counts[segment.key] / total) * 100}%` }}
                />
              ),
            )}
          </div>

          <ul className="mt-5 flex flex-col gap-2.5">
            {SEGMENTS.map((segment) => (
              <li key={segment.key} className="flex items-center gap-2.5 text-sm">
                <span aria-hidden="true" className={`size-2 rounded-full ${segment.dotClass}`} />
                <span className="flex-1 text-neutral-600">{segment.label}</span>
                <span className="text-xs font-semibold text-neutral-900">
                  {counts[segment.key]}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-[11px] text-neutral-400">{total} tables in total</p>
        </div>
      )}
    </section>
  )
}

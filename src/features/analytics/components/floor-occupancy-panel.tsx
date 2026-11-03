import type { TableStatus } from '@/features/tables'

interface FloorOccupancyPanelProps {
  readonly counts: Readonly<Record<TableStatus, number>>
  readonly total: number
}

const SEGMENTS: readonly { key: TableStatus; label: string; dotClass: string }[] = [
  { key: 'free', label: 'Free', dotClass: 'bg-[#bbf78a]' },
  { key: 'occupied', label: 'Occupied', dotClass: 'bg-[#f8cf62]' },
  { key: 'reserved', label: 'Reserved', dotClass: 'bg-[#f6685e]' },
]

export function FloorOccupancyPanel({ counts, total }: FloorOccupancyPanelProps) {
  const occupiedShare = total === 0 ? 0 : Math.round((counts.occupied / total) * 100)

  return (
    <section
      aria-label="Floor occupancy"
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-card"
    >
      <header className="flex items-center justify-between gap-3 border-b border-neutral-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-900">Floor occupancy</h2>
        <span className="text-xs text-neutral-400">{occupiedShare}% occupied</span>
      </header>

      {total === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-neutral-500">
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

          <ul className="mt-5 flex flex-col gap-3">
            {SEGMENTS.map((segment) => {
              const share = Math.round((counts[segment.key] / total) * 100)

              return (
                <li key={segment.key} className="flex items-center gap-2.5 text-sm">
                  <span aria-hidden="true" className={`size-2 rounded-full ${segment.dotClass}`} />
                  <span className="flex-1 text-neutral-600">{segment.label}</span>
                  <span className="text-[11px] text-neutral-400">{share}%</span>
                  <span className="w-6 text-right text-xs font-semibold text-neutral-900">
                    {counts[segment.key]}
                  </span>
                </li>
              )
            })}
          </ul>

          <p className="mt-5 text-[11px] text-neutral-400">{total} tables in total</p>
        </div>
      )}
    </section>
  )
}

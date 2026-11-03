import { cn } from '@/lib/utils'

export interface StatTile {
  readonly label: string
  readonly value: string
  readonly hint: string
}

interface StatTilesProps {
  readonly ariaLabel: string
  readonly tiles: readonly StatTile[]
  readonly className?: string
}

export function StatTiles({ ariaLabel, tiles, className }: StatTilesProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={cn(
        'mb-7 grid grid-cols-1 gap-6 sm:grid-cols-2',
        className ?? 'md:grid-cols-3',
      )}
    >
      {tiles.map((tile) => (
        <article key={tile.label} className="rounded-2xl bg-muted/70 p-6">
          <span className="text-xs font-semibold text-neutral-500">{tile.label}</span>
          <p className="mt-3 text-3xl font-bold tracking-tight text-neutral-900">{tile.value}</p>
          <p className="mt-2 text-[11px] text-neutral-400">{tile.hint}</p>
        </article>
      ))}
    </section>
  )
}

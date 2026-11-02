import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { RestaurantTable } from '../types/table'
import {
  TABLE_BADGE_LABELS,
  TABLE_BADGE_STYLES,
  TABLE_CARD_STYLES,
} from './table-status'

interface TableCardProps {
  readonly table: RestaurantTable
}

export function TableCard({ table }: TableCardProps) {
  return (
    <Link
      to="/tables/$tableId"
      params={{ tableId: table.id }}
      aria-label={`Open order for table ${table.label}`}
      className={cn(
        'group flex aspect-square flex-col justify-between rounded-xl border p-3 shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        TABLE_CARD_STYLES[table.status],
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-bold text-neutral-800">{table.label}</span>
        <Badge
          className={cn(
            'rounded px-1.5 py-0.5 text-[10px] font-semibold',
            TABLE_BADGE_STYLES[table.status],
          )}
        >
          {TABLE_BADGE_LABELS[table.status]}
        </Badge>
      </div>

      <div className="flex flex-col items-center justify-center gap-1 pb-1">
        {table.status === 'reserved' && table.reservedAt && (
          <span className="text-xs font-bold text-neutral-900">{table.reservedAt}</span>
        )}
        <ArrowRight
          aria-hidden="true"
          className="size-4 text-neutral-700 transition-transform group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      </div>
    </Link>
  )
}

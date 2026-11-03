import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatShortDate } from '@/utils/format-date'
import type { SickDayRecord, SickDayStatus } from '../types/sick-day'
import { SICK_DAY_STATUS_LABELS, SICK_DAY_STATUS_STYLES } from './sick-day-status'

interface SickDaysListProps {
  readonly records: readonly SickDayRecord[]
  readonly statusById: Readonly<Record<string, SickDayStatus>>
  readonly emptyMessage: string
  readonly onRecover: (recordId: string) => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
}

export function SickDaysList({
  records,
  statusById,
  emptyMessage,
  onRecover,
}: SickDaysListProps) {
  const totalDays = records.reduce((sum, record) => sum + record.days, 0)

  return (
    <section
      aria-label="Sick day records"
      className="overflow-hidden rounded-2xl border border-neutral-100 bg-card"
    >
      <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-900">Sick day records</h2>
        <span className="text-xs text-neutral-400">
          {records.length} shown · {totalDays} recorded {totalDays === 1 ? 'day' : 'days'}
        </span>
      </div>

      {records.length === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-neutral-500">{emptyMessage}</p>
      ) : (
        <ul className="divide-y divide-neutral-100">
          {records.map((record) => {
            const status = statusById[record.id] ?? record.status

            return (
              <li
                key={record.id}
                className="flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4 transition-colors hover:bg-neutral-50/80"
              >
                <div className="flex min-w-0 basis-full items-center gap-3 sm:flex-1 sm:basis-auto">
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className="text-[10px]">
                      {getInitials(record.employee)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-900">{record.employee}</p>
                    <p className="mt-0.5 text-[11px] text-neutral-400">{record.reason}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs font-medium text-neutral-800">
                    {formatShortDate(record.startDate)} – {formatShortDate(record.endDate)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-neutral-400">
                    {record.days} {record.days === 1 ? 'day' : 'days'}
                  </p>
                </div>

                {record.hasCertificate && (
                  <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-600">
                    Certificate
                  </span>
                )}

                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${SICK_DAY_STATUS_STYLES[status]}`}
                >
                  {SICK_DAY_STATUS_LABELS[status]}
                </span>

                {status === 'open' && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-md border-neutral-200 px-3 text-xs"
                    onClick={() => onRecover(record.id)}
                  >
                    Mark recovered
                  </Button>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

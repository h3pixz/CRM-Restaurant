import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatShortDate } from '@/utils/format-date'
import type { VacationDecision, VacationRequest } from '../types/vacation'
import {
  VACATION_STATUS_LABELS,
  VACATION_STATUS_STYLES,
} from './vacation-status'

interface VacationListProps {
  readonly requests: readonly VacationRequest[]
  readonly emptyMessage: string
  readonly onDecide: (requestId: string, status: VacationDecision) => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
}

export function VacationList({
  requests,
  emptyMessage,
  onDecide,
}: VacationListProps) {
  return (
    <section
      aria-label="Vacation requests"
      className="overflow-hidden rounded-2xl border border-neutral-100 bg-card"
    >
      <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-900">Vacation requests</h2>
        <span className="text-xs text-neutral-500">{requests.length} shown</span>
      </div>

      {requests.length === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-neutral-500">{emptyMessage}</p>
      ) : (
        <ul className="divide-y divide-neutral-100">
          {requests.map((request) => {
            const status = request.status

            return (
              <li
                key={request.id}
                className="flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4 transition-colors hover:bg-neutral-50/80"
              >
                <div className="flex min-w-0 basis-full items-center gap-3 sm:flex-1 sm:basis-auto">
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className="text-[10px]">
                      {getInitials(request.employee)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-900">{request.employee}</p>
                    <p className="mt-0.5 text-[11px] text-neutral-500">
                      Requested {formatShortDate(request.submittedAt)}
                    </p>
                    {request.note && (
                      <p className="mt-1 text-[11px] text-neutral-500">{request.note}</p>
                    )}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs font-medium text-neutral-800">
                    {formatShortDate(request.startDate)} – {formatShortDate(request.endDate)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-neutral-500">
                    {request.days} {request.days === 1 ? 'day' : 'days'}
                  </p>
                </div>

                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${VACATION_STATUS_STYLES[status]}`}
                >
                  {VACATION_STATUS_LABELS[status]}
                </span>

                {status === 'pending' && (
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      className="h-11 rounded-md px-3 text-xs lg:h-7"
                      onClick={() => onDecide(request.id, 'approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-11 rounded-md border-neutral-200 px-3 text-xs lg:h-7"
                      onClick={() => onDecide(request.id, 'declined')}
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

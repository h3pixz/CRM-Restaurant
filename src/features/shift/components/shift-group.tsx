import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import type { Employee, ShiftType } from '@/features/employees'
import { SHIFT_META } from './shift-meta'

interface ShiftGroupProps {
  readonly shift: ShiftType
  readonly employees: readonly Employee[]
  readonly pendingEmployeeId: string | null
  readonly onToggle: (employee: Employee) => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
}

export function ShiftGroup({
  shift,
  employees,
  pendingEmployeeId,
  onToggle,
}: ShiftGroupProps) {
  const meta = SHIFT_META[shift]
  const onShiftCount = employees.filter((employee) => employee.onShift).length

  return (
    <section
      aria-label={meta.label}
      className="flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-card"
    >
      <header className="flex items-center justify-between gap-4 border-b border-neutral-100 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span aria-hidden="true" className={`size-2 rounded-full ${meta.dotClass}`} />
          <div>
            <h2 className="text-sm font-semibold text-neutral-900">{meta.label}</h2>
            <p className="mt-0.5 text-[11px] text-neutral-400">{meta.description}</p>
          </div>
        </div>

        <span className="text-xs font-medium text-neutral-500">
          {onShiftCount}/{employees.length} on shift
        </span>
      </header>

      {employees.length === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-neutral-500">
          No employees match the current filters.
        </p>
      ) : (
        <ul className="divide-y divide-neutral-100">
          {employees.map((employee) => {
            const isPending = pendingEmployeeId === employee.id

            return (
              <li
                key={employee.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-3 px-5 py-4 transition-colors hover:bg-neutral-50/80"
              >
                <div className="flex min-w-0 basis-full items-center gap-3 sm:flex-1 sm:basis-auto">
                  <Avatar className="size-9 shrink-0">
                    <AvatarImage src={employee.avatarUrl} alt="" />
                    <AvatarFallback className="text-[10px]">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-900">{employee.name}</p>
                    <p className="mt-0.5 truncate text-[11px] text-neutral-400">
                      {employee.email}
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                    employee.onShift
                      ? 'border-[#d6e3cf] bg-[#eef4ea] text-[#4c6640]'
                      : 'border-neutral-200 bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {employee.onShift ? 'On shift' : 'Off duty'}
                </span>

                <Button
                  type="button"
                  variant={employee.onShift ? 'outline' : 'default'}
                  size="sm"
                  disabled={isPending}
                  onClick={() => onToggle(employee)}
                  className="h-7 rounded-md px-3 text-xs"
                >
                  {employee.onShift ? 'Clock out' : 'Clock in'}
                </Button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

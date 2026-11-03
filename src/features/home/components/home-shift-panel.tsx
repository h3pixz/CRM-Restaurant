import { Link } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { EmployeeShiftBadge, type Employee } from '@/features/employees'

interface HomeShiftPanelProps {
  readonly employees: readonly Employee[]
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
}

export function HomeShiftPanel({ employees }: HomeShiftPanelProps) {
  const onShift = employees.filter((employee) => employee.onShift).slice(0, 5)

  return (
    <section
      aria-label="Employees on shift"
      className="flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-card"
    >
      <header className="flex items-center justify-between gap-3 border-b border-neutral-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-900">On shift now</h2>
        <Link
          to="/shift"
          className="text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          View shift
        </Link>
      </header>

      {onShift.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-neutral-500">
          No employees are on shift right now.
        </p>
      ) : (
        <ul className="divide-y divide-neutral-100">
          {onShift.map((employee) => (
            <li key={employee.id} className="flex items-center gap-3 px-5 py-3">
              <Avatar className="size-8">
                <AvatarImage src={employee.avatarUrl} alt="" />
                <AvatarFallback className="text-[10px]">
                  {getInitials(employee.name)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-900">{employee.name}</p>
                <p className="truncate text-[11px] text-neutral-400">{employee.email}</p>
              </div>

              <EmployeeShiftBadge shift={employee.shift} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

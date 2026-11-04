import { Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatShortDate } from '@/utils/format-date'
import type { Employee } from '../types/employee'
import { EmployeeShiftBadge } from './employee-shift-badge'

interface EmployeesTableProps {
  readonly employees: readonly Employee[]
  readonly emptyMessage: string
  readonly onAddBonus: (employee: Employee) => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
}

interface EmployeeCardProps {
  readonly employee: Employee
  readonly onAddBonus: (employee: Employee) => void
}

function EmployeeCard({ employee, onAddBonus }: EmployeeCardProps) {
  return (
    <li className="rounded-2xl border border-neutral-100 bg-card p-4">
      <div className="flex items-start gap-3">
        <Avatar className="size-10">
          <AvatarImage src={employee.avatarUrl} alt="" />
          <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-neutral-900">{employee.name}</p>
              <p className="truncate text-[11px] text-neutral-400">{employee.email}</p>
            </div>
            <EmployeeShiftBadge shift={employee.shift} />
          </div>

          <div className="mt-3 flex items-end justify-between gap-3">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
              <div>
                <dt className="text-neutral-400">Employment</dt>
                <dd className="mt-0.5 font-medium text-neutral-800">
                  {formatShortDate(employee.employmentDate)}
                </dd>
              </div>
              <div>
                <dt className="text-neutral-400">Billing</dt>
                <dd className="mt-0.5 font-medium text-neutral-800">
                  {formatShortDate(employee.billingDate)}
                </dd>
              </div>
            </dl>

            <Button
              type="button"
              variant="secondary"
              aria-label={`Add bonus for ${employee.name}`}
              onClick={() => onAddBonus(employee)}
              className="h-11 shrink-0 gap-1.5 rounded-md bg-neutral-200/70 px-3 text-xs font-medium text-neutral-800 hover:bg-neutral-300"
            >
              <Plus aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
              Bonus
            </Button>
          </div>
        </div>
      </div>
    </li>
  )
}

export function EmployeesTable({ employees, emptyMessage, onAddBonus }: EmployeesTableProps) {
  if (employees.length === 0) {
    return (
      <p className="rounded-2xl border border-neutral-100 bg-card px-4 py-12 text-center text-sm text-neutral-500">
        {emptyMessage}
      </p>
    )
  }

  return (
    <>
      <ul aria-label="Employees" className="flex flex-col gap-3 md:hidden">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} onAddBonus={onAddBonus} />
        ))}
      </ul>

      <div className="hidden w-full overflow-x-auto md:block">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="text-xs font-semibold text-neutral-500 select-none">
              <th scope="col" className="w-8 px-3 py-3 font-normal">
                <input
                  type="checkbox"
                  aria-label="Select all employees"
                  className="size-3.5 cursor-pointer accent-neutral-900"
                />
              </th>
              <th scope="col" className="px-4 py-3 text-xs font-medium">
                Employee
              </th>
              <th scope="col" className="px-4 py-3 text-xs font-medium">
                Shift
              </th>
              <th scope="col" className="px-4 py-3 text-xs font-medium">
                Employment date
              </th>
              <th scope="col" className="px-4 py-3 text-xs font-medium">
                Billing date
              </th>
              <th scope="col" className="w-20 px-4 py-3 text-center text-xs font-medium">
                Bonus
              </th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b border-neutral-100 bg-card transition-colors last:border-0 hover:bg-neutral-50/80"
              >
                <td className="px-3 py-3.5">
                  <input
                    type="checkbox"
                    aria-label={`Select ${employee.name}`}
                    className="size-3.5 cursor-pointer accent-neutral-900"
                  />
                </td>

                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3.5">
                    <Avatar className="size-9">
                      <AvatarImage src={employee.avatarUrl} alt="" />
                      <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                      <p className="text-sm font-medium text-neutral-900">{employee.name}</p>
                      <p className="text-[11px] text-neutral-400">{employee.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3.5">
                  <EmployeeShiftBadge shift={employee.shift} />
                </td>

                <td className="px-4 py-3.5 text-xs font-medium text-neutral-800">
                  {formatShortDate(employee.employmentDate)}
                </td>

                <td className="px-4 py-3.5 text-xs font-medium text-neutral-800">
                  {formatShortDate(employee.billingDate)}
                </td>

                <td className="px-4 py-3.5 text-center">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-xs"
                    aria-label={`Add bonus for ${employee.name}`}
                    onClick={() => onAddBonus(employee)}
                    className="size-6 rounded-full bg-neutral-200/70 text-neutral-800 hover:bg-neutral-300"
                  >
                    <Plus aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

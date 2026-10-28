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

export function EmployeesTable({ employees, emptyMessage, onAddBonus }: EmployeesTableProps) {
  return (
    <div className="w-full overflow-x-auto">
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
          {employees.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-sm text-neutral-500">
                {emptyMessage}
              </td>
            </tr>
          )}

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
  )
}

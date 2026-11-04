import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { EmployeeShiftBadge } from '@/features/employees'
import { formatCurrency } from '@/utils/format-currency'
import { formatShortDate } from '@/utils/format-date'
import { PAY_PERIOD_HOURS, SHIFT_HOURLY_RATES } from '../constants'
import type { PayrollEntry } from '../types/payroll'

interface PayrollTableProps {
  readonly entries: readonly PayrollEntry[]
  readonly emptyMessage: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
}

export function PayrollTable({ entries, emptyMessage }: PayrollTableProps) {
  const totals = entries.reduce(
    (sum, entry) => ({
      base: sum.base + entry.base,
      bonus: sum.bonus + entry.bonus,
      total: sum.total + entry.total,
    }),
    { base: 0, bonus: 0, total: 0 },
  )

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-neutral-100 bg-card">
      <table className="w-full min-w-[820px] border-collapse text-left">
        <thead>
          <tr className="border-b border-neutral-100 text-xs text-neutral-500 select-none">
            <th scope="col" className="px-5 py-3 text-xs font-medium">
              Employee
            </th>
            <th scope="col" className="px-4 py-3 text-xs font-medium">
              Shift
            </th>
            <th scope="col" className="px-4 py-3 text-xs font-medium">
              Base pay
            </th>
            <th scope="col" className="px-4 py-3 text-xs font-medium">
              Bonus
            </th>
            <th scope="col" className="px-4 py-3 text-xs font-medium">
              Total
            </th>
            <th scope="col" className="px-4 py-3 text-xs font-medium">
              Billing date
            </th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {entries.length === 0 && (
            <tr>
              <td colSpan={6} className="px-5 py-12 text-center text-sm text-neutral-500">
                {emptyMessage}
              </td>
            </tr>
          )}

          {entries.map((entry) => (
            <tr
              key={entry.employee.id}
              className="border-b border-neutral-100 transition-colors last:border-0 hover:bg-neutral-50/80"
            >
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3.5">
                  <Avatar className="size-9">
                    <AvatarImage src={entry.employee.avatarUrl} alt="" />
                    <AvatarFallback className="text-[10px]">
                      {getInitials(entry.employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="leading-tight">
                    <p className="text-sm font-medium text-neutral-900">{entry.employee.name}</p>
                    <p className="text-[11px] text-neutral-500">{entry.employee.email}</p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-3.5">
                <EmployeeShiftBadge shift={entry.employee.shift} />
              </td>

              <td className="px-4 py-3.5">
                <p className="text-xs font-medium text-neutral-800">{formatCurrency(entry.base)}</p>
                <p className="mt-0.5 text-[11px] text-neutral-500">
                  {PAY_PERIOD_HOURS} h × {formatCurrency(SHIFT_HOURLY_RATES[entry.employee.shift])}
                </p>
              </td>

              <td className="px-4 py-3.5 text-xs font-medium text-neutral-800">
                {formatCurrency(entry.bonus)}
              </td>

              <td className="px-4 py-3.5 text-sm font-semibold text-neutral-900">
                {formatCurrency(entry.total)}
              </td>

              <td className="px-4 py-3.5 text-xs font-medium text-neutral-800">
                {formatShortDate(entry.employee.billingDate)}
              </td>
            </tr>
          ))}
        </tbody>

        {entries.length > 0 && (
          <tfoot>
            <tr className="border-t border-neutral-100 bg-muted/40 text-xs font-semibold text-neutral-800">
              <td className="px-5 py-3.5" colSpan={2}>
                Total
              </td>
              <td className="px-4 py-3.5">{formatCurrency(totals.base)}</td>
              <td className="px-4 py-3.5">{formatCurrency(totals.bonus)}</td>
              <td className="px-4 py-3.5 text-sm text-neutral-900">
                {formatCurrency(totals.total)}
              </td>
              <td className="px-4 py-3.5" />
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}

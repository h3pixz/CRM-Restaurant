import { useMemo } from 'react'
import { StatTiles, type StatTile } from '@/components/stat-tiles'
import { useEmployeesQuery, type Employee } from '@/features/employees'
import { formatCurrency } from '@/utils/format-currency'
import { PAY_PERIOD_HOURS, SHIFT_HOURLY_RATES } from '../constants'
import type { PayrollEntry } from '../types/payroll'
import { PayrollError, PayrollLoading } from './payroll-feedback'
import { PayrollTable } from './payroll-table'

const EMPTY_EMPLOYEES: readonly Employee[] = []

export function PayrollPage() {
  const employeesQuery = useEmployeesQuery()
  const employees = employeesQuery.data ?? EMPTY_EMPLOYEES

  const entries = useMemo<readonly PayrollEntry[]>(
    () =>
      employees.map((employee) => {
        const base = PAY_PERIOD_HOURS * SHIFT_HOURLY_RATES[employee.shift]

        return {
          employee,
          base,
          bonus: employee.bonus,
          total: base + employee.bonus,
        }
      }),
    [employees],
  )

  const metrics = useMemo<readonly StatTile[]>(() => {
    const total = entries.reduce((sum, entry) => sum + entry.total, 0)
    const bonuses = entries.reduce((sum, entry) => sum + entry.bonus, 0)
    const average = entries.length === 0 ? 0 : total / entries.length

    return [
      {
        label: 'Total payroll',
        value: formatCurrency(total),
        hint: `Across ${entries.length} ${entries.length === 1 ? 'employee' : 'employees'}`,
      },
      {
        label: 'Bonuses',
        value: formatCurrency(bonuses),
        hint: 'Included in the total above',
      },
      {
        label: 'Average pay',
        value: formatCurrency(average),
        hint: `Base for ${PAY_PERIOD_HOURS} hours plus bonus`,
      },
    ]
  }, [entries])

  const emptyMessage =
    employees.length === 0
      ? 'No employees yet. Add documents to the "employees" collection in Firestore.'
      : 'No employees to pay for the current period.'

  return (
    <>
      <StatTiles ariaLabel="Payroll statistics" tiles={metrics} />

      {employeesQuery.isPending && <PayrollLoading />}

      {employeesQuery.isError && (
        <PayrollError
          message={
            employeesQuery.error instanceof Error
              ? employeesQuery.error.message
              : 'Unexpected error while loading employees.'
          }
          onRetry={() => {
            void employeesQuery.refetch()
          }}
        />
      )}

      {employeesQuery.isSuccess && (
        <PayrollTable entries={entries} emptyMessage={emptyMessage} />
      )}
    </>
  )
}

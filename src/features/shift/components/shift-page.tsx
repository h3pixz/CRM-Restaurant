import { useCallback, useMemo, useState } from 'react'
import {
  useEmployeesQuery,
  useSetEmployeeOnShift,
  type Employee,
  type ShiftType,
} from '@/features/employees'
import type { ShiftFilter } from '../types/shift'
import { ShiftError, ShiftLoading } from './shift-feedback'
import { ShiftGroup } from './shift-group'
import { SHIFT_FILTER_LABELS, SHIFT_ORDER } from './shift-meta'
import { ShiftMetrics, type ShiftMetric } from './shift-metrics'

const EMPTY_EMPLOYEES: readonly Employee[] = []
const METRIC_FILTERS: readonly ShiftFilter[] = ['all', 'on-shift', 'off-duty']

export function ShiftPage() {
  const employeesQuery = useEmployeesQuery()
  const setEmployeeOnShift = useSetEmployeeOnShift()
  const [filter, setFilter] = useState<ShiftFilter>('all')

  const employees = employeesQuery.data ?? EMPTY_EMPLOYEES

  const metrics = useMemo<readonly ShiftMetric[]>(() => {
    const onShiftCount = employees.filter((employee) => employee.onShift).length

    return METRIC_FILTERS.map((key) => ({
      key,
      label: SHIFT_FILTER_LABELS[key],
      value:
        key === 'all'
          ? employees.length
          : key === 'on-shift'
            ? onShiftCount
            : employees.length - onShiftCount,
    }))
  }, [employees])

  const groups = useMemo<readonly { shift: ShiftType; employees: readonly Employee[] }[]>(() => {
    const visibleEmployees = employees.filter((employee) => {
      if (filter === 'on-shift') {
        return employee.onShift
      }
      if (filter === 'off-duty') {
        return !employee.onShift
      }

      return true
    })

    return SHIFT_ORDER.map((shift) => ({
      shift,
      employees: visibleEmployees
        .filter((employee) => employee.shift === shift)
        .slice()
        .sort((left, right) => Number(right.onShift) - Number(left.onShift)),
    }))
  }, [employees, filter])

  const handleToggle = useCallback(
    (employee: Employee) => {
      setEmployeeOnShift.mutate({ employeeId: employee.id, onShift: !employee.onShift })
    },
    [setEmployeeOnShift],
  )

  const pendingEmployeeId = setEmployeeOnShift.isPending
    ? (setEmployeeOnShift.variables?.employeeId ?? null)
    : null

  return (
    <>
      <ShiftMetrics metrics={metrics} activeFilter={filter} onFilterChange={setFilter} />

      {setEmployeeOnShift.isError && (
        <p role="alert" className="mb-4 text-sm text-destructive">
          Could not update the shift status. Try again.
        </p>
      )}

      {employeesQuery.isPending && <ShiftLoading />}

      {employeesQuery.isError && (
        <ShiftError
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {groups.map((group) => (
            <ShiftGroup
              key={group.shift}
              shift={group.shift}
              employees={group.employees}
              pendingEmployeeId={pendingEmployeeId}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </>
  )
}

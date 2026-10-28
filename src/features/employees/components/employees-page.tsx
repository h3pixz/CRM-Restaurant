import { useCallback, useMemo, useState } from 'react'
import { useEmployeesQuery } from '../api'
import type { Employee, EmployeeFilter } from '../types/employee'
import { EmployeeBonusDialog } from './employee-bonus-dialog'
import { EmployeesError, EmployeesLoading } from './employees-feedback'
import { EmployeesMetrics, type EmployeeMetric } from './employees-metrics'
import { EmployeesTable } from './employees-table'
import { EmployeesToolbar } from './employees-toolbar'

const METRIC_LABELS: Record<EmployeeFilter, string> = {
  all: 'All Employees',
  'on-shift': 'On Shift',
  idle: 'Idle',
}

const EMPTY_EMPLOYEES: readonly Employee[] = []

export function EmployeesPage() {
  const employeesQuery = useEmployeesQuery()
  const [filter, setFilter] = useState<EmployeeFilter>('all')
  const [search, setSearch] = useState('')
  const [bonusTarget, setBonusTarget] = useState<Employee | null>(null)

  const employees = employeesQuery.data ?? EMPTY_EMPLOYEES

  const metrics = useMemo<readonly EmployeeMetric[]>(() => {
    const onShiftCount = employees.filter((employee) => employee.onShift).length

    return [
      { key: 'all', label: METRIC_LABELS.all, value: employees.length },
      { key: 'on-shift', label: METRIC_LABELS['on-shift'], value: onShiftCount },
      { key: 'idle', label: METRIC_LABELS.idle, value: employees.length - onShiftCount },
    ]
  }, [employees])

  const visibleEmployees = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return employees.filter((employee) => {
      if (filter === 'on-shift' && !employee.onShift) {
        return false
      }
      if (filter === 'idle' && employee.onShift) {
        return false
      }
      if (!normalizedSearch) {
        return true
      }

      return (
        employee.name.toLowerCase().includes(normalizedSearch) ||
        employee.email.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [employees, filter, search])

  const handleBonusOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setBonusTarget(null)
    }
  }, [])

  const emptyMessage =
    employees.length === 0
      ? 'No employees yet. Add documents to the "employees" collection in Firestore.'
      : 'No employees match the current filters.'

  return (
    <>
      <EmployeesMetrics
        metrics={metrics}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      <EmployeesToolbar search={search} onSearchChange={setSearch} />

      {employeesQuery.isPending && <EmployeesLoading />}

      {employeesQuery.isError && (
        <EmployeesError
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
        <EmployeesTable
          employees={visibleEmployees}
          emptyMessage={emptyMessage}
          onAddBonus={setBonusTarget}
        />
      )}

      <EmployeeBonusDialog
        key={bonusTarget?.id ?? 'closed'}
        employee={bonusTarget}
        onOpenChange={handleBonusOpenChange}
      />
    </>
  )
}

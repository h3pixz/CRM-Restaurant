import { MOCK_EMPLOYEES } from '../data/mock-employees'
import { EmployeesMetrics, type EmployeeMetric } from './employees-metrics'
import { EmployeesTable } from './employees-table'
import { EmployeesToolbar } from './employees-toolbar'

const METRICS: readonly EmployeeMetric[] = [
  { key: 'all', label: 'All Employees', value: 55 },
  { key: 'on-shift', label: 'On Shift', value: 31 },
  { key: 'idle', label: 'Idle', value: 24 },
]

export function EmployeesPage() {
  return (
    <>
      <EmployeesMetrics metrics={METRICS} />
      <EmployeesToolbar />
      <EmployeesTable employees={MOCK_EMPLOYEES} />
    </>
  )
}

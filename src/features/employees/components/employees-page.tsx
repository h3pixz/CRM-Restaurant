import { AppSidebar } from '@/components/layout/app-sidebar'
import { TopBar } from '@/components/layout/top-bar'
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
    <div className="flex min-h-screen bg-background text-foreground selection:bg-neutral-800 selection:text-white">
      <AppSidebar />

      <main className="flex min-w-0 flex-1 flex-col bg-background px-10 py-7">
        <TopBar title="Employees" userName="Dwayne Exum" />
        <EmployeesMetrics metrics={METRICS} />
        <EmployeesToolbar />
        <EmployeesTable employees={MOCK_EMPLOYEES} />
      </main>
    </div>
  )
}

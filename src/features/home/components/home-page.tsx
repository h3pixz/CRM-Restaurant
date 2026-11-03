import { useMemo } from 'react'
import { StatTiles, type StatTile } from '@/components/stat-tiles'
import { useEmployeesQuery, type Employee } from '@/features/employees'
import {
  useOrdersQuery,
  useTablesQuery,
  type RestaurantTable,
  type TableOrder,
} from '@/features/tables'
import { formatCurrency } from '@/utils/format-currency'
import { HomeError, HomeLoading } from './home-feedback'
import { HomeFloorPanel } from './home-floor-panel'
import { HomeRevenuePanel } from './home-revenue-panel'
import { HomeShiftPanel } from './home-shift-panel'

const EMPTY_EMPLOYEES: readonly Employee[] = []
const EMPTY_TABLES: readonly RestaurantTable[] = []
const EMPTY_ORDERS: readonly TableOrder[] = []

export function HomePage() {
  const employeesQuery = useEmployeesQuery()
  const tablesQuery = useTablesQuery()
  const ordersQuery = useOrdersQuery()

  const employees = employeesQuery.data ?? EMPTY_EMPLOYEES
  const tables = tablesQuery.data ?? EMPTY_TABLES
  const orders = ordersQuery.data ?? EMPTY_ORDERS

  const metrics = useMemo<readonly StatTile[]>(() => {
    const onShiftCount = employees.filter((employee) => employee.onShift).length
    const occupiedCount = tables.filter((table) => table.status === 'occupied').length
    const openChecks = orders.filter((order) => order.items.length > 0).length
    const revenue = orders.reduce(
      (sum, order) =>
        sum + order.items.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0),
      0,
    )

    return [
      {
        label: 'On shift',
        value: String(onShiftCount),
        hint: `of ${employees.length} employees`,
      },
      {
        label: 'Occupied tables',
        value: String(occupiedCount),
        hint: `of ${tables.length} tables in the hall`,
      },
      {
        label: 'Open checks',
        value: String(openChecks),
        hint: 'Tables with items on the order',
      },
      {
        label: 'Current revenue',
        value: formatCurrency(revenue),
        hint: 'Across all current checks',
      },
    ]
  }, [employees, orders, tables])

  const isLoading = employeesQuery.isPending || tablesQuery.isPending || ordersQuery.isPending
  const firstError = employeesQuery.error ?? tablesQuery.error ?? ordersQuery.error

  const handleRetry = () => {
    void employeesQuery.refetch()
    void tablesQuery.refetch()
    void ordersQuery.refetch()
  }

  if (isLoading) {
    return <HomeLoading />
  }

  if (firstError) {
    return (
      <HomeError
        message={
          firstError instanceof Error ? firstError.message : 'Unexpected error while loading data.'
        }
        onRetry={handleRetry}
      />
    )
  }

  return (
    <>
      <StatTiles ariaLabel="Restaurant overview" tiles={metrics} className="xl:grid-cols-4" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <HomeShiftPanel employees={employees} />
        <HomeFloorPanel tables={tables} />
        <HomeRevenuePanel orders={orders} />
      </div>
    </>
  )
}

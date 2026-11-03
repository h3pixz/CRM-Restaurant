import { useMemo } from 'react'
import { StatTiles, type StatTile } from '@/components/stat-tiles'
import {
  ORDER_CATEGORIES,
  useOrdersQuery,
  useTablesQuery,
  type RestaurantTable,
  type TableOrder,
  type TableStatus,
} from '@/features/tables'
import { formatCurrency } from '@/utils/format-currency'
import { AnalyticsError, AnalyticsLoading } from './analytics-feedback'
import { FloorOccupancyPanel } from './floor-occupancy-panel'
import { RevenueByCategoryPanel, type CategoryRevenue } from './revenue-by-category-panel'
import { TopTablesPanel, type TopTableRow } from './top-tables-panel'

const EMPTY_TABLES: readonly RestaurantTable[] = []
const EMPTY_ORDERS: readonly TableOrder[] = []
const TOP_TABLES_COUNT = 5

function getOrderTotal(order: TableOrder): number {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function getOrderItemCount(order: TableOrder): number {
  return order.items.reduce((sum, item) => sum + item.quantity, 0)
}

export function AnalyticsPage() {
  const tablesQuery = useTablesQuery()
  const ordersQuery = useOrdersQuery()

  const tables = tablesQuery.data ?? EMPTY_TABLES
  const orders = ordersQuery.data ?? EMPTY_ORDERS

  const revenueByCategory = useMemo<readonly CategoryRevenue[]>(() => {
    return ORDER_CATEGORIES.map((category) => ({
      category,
      total: orders.reduce(
        (sum, order) =>
          sum +
          order.items
            .filter((item) => item.category === category)
            .reduce((itemSum, item) => itemSum + item.price * item.quantity, 0),
        0,
      ),
    }))
  }, [orders])

  const revenue = revenueByCategory.reduce((sum, entry) => sum + entry.total, 0)

  const metrics = useMemo<readonly StatTile[]>(() => {
    const checks = orders.filter((order) => order.items.length > 0)
    const itemsCount = checks.reduce((sum, order) => sum + getOrderItemCount(order), 0)
    const occupiedCount = tables.filter((table) => table.status === 'occupied').length

    return [
      {
        label: 'Total revenue',
        value: formatCurrency(revenue),
        hint: 'Across all current checks',
      },
      {
        label: 'Checks',
        value: String(checks.length),
        hint: `${itemsCount} items ordered in total`,
      },
      {
        label: 'Average check',
        value: formatCurrency(checks.length === 0 ? 0 : revenue / checks.length),
        hint: 'Revenue per open check',
      },
      {
        label: 'Occupied tables',
        value: String(occupiedCount),
        hint: `of ${tables.length} tables in the hall`,
      },
    ]
  }, [orders, revenue, tables])

  const statusCounts = useMemo<Record<TableStatus, number>>(() => {
    const counts: Record<TableStatus, number> = { free: 0, occupied: 0, reserved: 0 }

    for (const table of tables) {
      counts[table.status] += 1
    }

    return counts
  }, [tables])

  const topTables = useMemo<readonly TopTableRow[]>(() => {
    const labels = new Map(tables.map((table) => [table.id, table.label]))

    return orders
      .filter((order) => order.items.length > 0)
      .map((order) => ({
        id: order.tableId,
        label: labels.get(order.tableId) ?? order.tableId,
        itemsCount: getOrderItemCount(order),
        total: getOrderTotal(order),
      }))
      .sort((left, right) => right.total - left.total)
      .slice(0, TOP_TABLES_COUNT)
  }, [orders, tables])

  const isLoading = tablesQuery.isPending || ordersQuery.isPending
  const firstError = tablesQuery.error ?? ordersQuery.error

  const handleRetry = () => {
    void tablesQuery.refetch()
    void ordersQuery.refetch()
  }

  if (isLoading) {
    return <AnalyticsLoading />
  }

  if (firstError) {
    return (
      <AnalyticsError
        message={
          firstError instanceof Error ? firstError.message : 'Unexpected error while loading data.'
        }
        onRetry={handleRetry}
      />
    )
  }

  return (
    <>
      <StatTiles ariaLabel="Analytics summary" tiles={metrics} className="md:grid-cols-4" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueByCategoryPanel entries={revenueByCategory} revenue={revenue} />
        </div>
        <FloorOccupancyPanel counts={statusCounts} total={tables.length} />
      </div>

      <div className="mt-6">
        <TopTablesPanel rows={topTables} />
      </div>
    </>
  )
}

import { useMemo } from 'react'
import { StatTiles, type StatTile } from '@/components/stat-tiles'
import {
  useOrdersQuery,
  useTablesQuery,
  type RestaurantTable,
  type TableOrder,
} from '@/features/tables'
import { formatCurrency } from '@/utils/format-currency'
import { AdminOrdersError, AdminOrdersLoading } from './admin-orders-feedback'
import { AdminOrdersList, type AdminOrderRow } from './admin-orders-list'

const EMPTY_ORDERS: readonly TableOrder[] = []
const EMPTY_TABLES: readonly RestaurantTable[] = []

function getOrderTotal(order: TableOrder): number {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function getOrderItemCount(order: TableOrder): number {
  return order.items.reduce((sum, item) => sum + item.quantity, 0)
}

export function AdminOrdersPage() {
  const ordersQuery = useOrdersQuery()
  const tablesQuery = useTablesQuery()

  const orders = ordersQuery.data ?? EMPTY_ORDERS
  const tables = tablesQuery.data ?? EMPTY_TABLES

  const checks = useMemo(
    () => orders.filter((order) => order.items.length > 0),
    [orders],
  )

  const rows = useMemo<readonly AdminOrderRow[]>(() => {
    const labels = new Map(tables.map((table) => [table.id, table.label]))

    return checks
      .map((order) => ({
        tableId: order.tableId,
        tableLabel: labels.get(order.tableId) ?? order.tableId,
        items: order.items,
        itemsCount: getOrderItemCount(order),
        total: getOrderTotal(order),
      }))
      .sort((left, right) => right.total - left.total)
  }, [checks, tables])

  const metrics = useMemo<readonly StatTile[]>(() => {
    const itemsCount = checks.reduce((sum, order) => sum + getOrderItemCount(order), 0)
    const revenue = checks.reduce((sum, order) => sum + getOrderTotal(order), 0)
    const tablesWithChecks = new Set(checks.map((order) => order.tableId)).size

    return [
      {
        label: 'Open checks',
        value: String(checks.length),
        hint: `${itemsCount} items ordered in total`,
      },
      {
        label: 'Current revenue',
        value: formatCurrency(revenue),
        hint: 'Across all current checks',
      },
      {
        label: 'Average check',
        value: formatCurrency(checks.length === 0 ? 0 : revenue / checks.length),
        hint: 'Revenue per open check',
      },
      {
        label: 'Tables with checks',
        value: String(tablesWithChecks),
        hint: `of ${tables.length} tables in the hall`,
      },
    ]
  }, [checks, tables])

  const isLoading = ordersQuery.isPending || tablesQuery.isPending
  const firstError = ordersQuery.error ?? tablesQuery.error

  const handleRetry = () => {
    void ordersQuery.refetch()
    void tablesQuery.refetch()
  }

  return (
    <>
      <h2 className="mb-6 text-[28px] leading-tight font-bold text-neutral-900">Orders</h2>

      {isLoading && <AdminOrdersLoading />}

      {!isLoading && firstError && (
        <AdminOrdersError
          message={
            firstError instanceof Error
              ? firstError.message
              : 'Unexpected error while loading data.'
          }
          onRetry={handleRetry}
        />
      )}

      {!isLoading && !firstError && (
        <>
          <StatTiles ariaLabel="Orders summary" tiles={metrics} className="md:grid-cols-4" />
          <AdminOrdersList rows={rows} />
        </>
      )}
    </>
  )
}

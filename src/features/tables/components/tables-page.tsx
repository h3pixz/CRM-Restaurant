import { useCallback, useMemo, useState } from 'react'
import { useTablesQuery } from '../api'
import type { RestaurantTable, TableFilter, TableStatus } from '../types/table'
import { TABLE_METRIC_LABELS } from './table-status'
import { TablesError, TablesLoading } from './tables-feedback'
import { TablesFloorPlan } from './tables-floor-plan'
import { TablesMetrics, type TableMetric } from './tables-metrics'

const EMPTY_TABLES: readonly RestaurantTable[] = []
const TABLE_STATUSES: readonly TableStatus[] = ['free', 'occupied', 'reserved']

export function TablesPage() {
  const tablesQuery = useTablesQuery()
  const [filter, setFilter] = useState<TableFilter>('all')

  const tables = tablesQuery.data ?? EMPTY_TABLES

  const metrics = useMemo<readonly TableMetric[]>(() => {
    const counts: Record<TableStatus, number> = { free: 0, occupied: 0, reserved: 0 }

    for (const table of tables) {
      counts[table.status] += 1
    }

    return TABLE_STATUSES.map((status) => ({
      key: status,
      label: TABLE_METRIC_LABELS[status],
      value: counts[status],
    }))
  }, [tables])

  const visibleTables = useMemo(
    () => (filter === 'all' ? tables : tables.filter((table) => table.status === filter)),
    [tables, filter],
  )

  const handleFilterChange = useCallback((nextFilter: TableStatus) => {
    setFilter((currentFilter) => (currentFilter === nextFilter ? 'all' : nextFilter))
  }, [])

  const emptyMessage =
    tables.length === 0
      ? 'No tables yet. Add documents to the "tables" collection in Firestore.'
      : 'No tables match the current filter.'

  return (
    <>
      <TablesMetrics
        metrics={metrics}
        activeFilter={filter}
        onFilterChange={handleFilterChange}
      />

      {tablesQuery.isPending && <TablesLoading />}

      {tablesQuery.isError && (
        <TablesError
          message={
            tablesQuery.error instanceof Error
              ? tablesQuery.error.message
              : 'Unexpected error while loading tables.'
          }
          onRetry={() => {
            void tablesQuery.refetch()
          }}
        />
      )}

      {tablesQuery.isSuccess && (
        <TablesFloorPlan tables={visibleTables} emptyMessage={emptyMessage} />
      )}
    </>
  )
}

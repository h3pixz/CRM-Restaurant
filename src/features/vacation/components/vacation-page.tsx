import { useCallback, useMemo, useState } from 'react'
import { VACATION_REQUESTS } from '../data/vacation-requests'
import type {
  VacationDecision,
  VacationFilter,
  VacationRequest,
  VacationStatus,
} from '../types/vacation'
import { VacationList } from './vacation-list'
import { VacationMetrics, type VacationMetric } from './vacation-metrics'
import { VACATION_STATUS_LABELS } from './vacation-status'
import { VacationToolbar } from './vacation-toolbar'

const METRIC_STATUSES: readonly VacationStatus[] = ['pending', 'approved', 'declined']

const STATUS_RANK: Record<VacationStatus, number> = {
  pending: 0,
  approved: 1,
  declined: 2,
}

export function VacationPage() {
  const [filter, setFilter] = useState<VacationFilter>('all')
  const [search, setSearch] = useState('')
  const [statusById, setStatusById] = useState<Readonly<Record<string, VacationStatus>>>({})

  const metrics = useMemo<readonly VacationMetric[]>(
    () =>
      METRIC_STATUSES.map((status) => ({
        key: status,
        label: VACATION_STATUS_LABELS[status],
        value: VACATION_REQUESTS.filter(
          (request) => (statusById[request.id] ?? request.status) === status,
        ).length,
      })),
    [statusById],
  )

  const visibleRequests = useMemo<readonly VacationRequest[]>(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return VACATION_REQUESTS.filter((request) => {
      const status = statusById[request.id] ?? request.status

      if (filter !== 'all' && status !== filter) {
        return false
      }
      if (!normalizedSearch) {
        return true
      }

      return request.employee.toLowerCase().includes(normalizedSearch)
    })
      .slice()
      .sort((left, right) => {
        const leftStatus = statusById[left.id] ?? left.status
        const rightStatus = statusById[right.id] ?? right.status

        return (
          STATUS_RANK[leftStatus] - STATUS_RANK[rightStatus] ||
          left.startDate.localeCompare(right.startDate)
        )
      })
  }, [filter, search, statusById])

  const handleFilterChange = useCallback((nextFilter: VacationStatus) => {
    setFilter((currentFilter) => (currentFilter === nextFilter ? 'all' : nextFilter))
  }, [])

  const handleDecide = useCallback((requestId: string, status: VacationDecision) => {
    setStatusById((current) => ({ ...current, [requestId]: status }))
  }, [])

  const emptyMessage =
    VACATION_REQUESTS.length === 0
      ? 'No vacation requests yet. New requests will appear in this list.'
      : 'No vacation requests match the current filters.'

  return (
    <>
      <VacationMetrics
        metrics={metrics}
        activeFilter={filter}
        onFilterChange={handleFilterChange}
      />

      <VacationToolbar search={search} onSearchChange={setSearch} />

      <VacationList
        requests={visibleRequests}
        statusById={statusById}
        emptyMessage={emptyMessage}
        onDecide={handleDecide}
      />
    </>
  )
}

import { useCallback, useMemo, useState } from 'react'
import { useSetVacationStatus, useVacationRequestsQuery } from '../api'
import type {
  VacationDecision,
  VacationFilter,
  VacationRequest,
  VacationStatus,
} from '../types/vacation'
import { VacationError, VacationLoading } from './vacation-feedback'
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

const EMPTY_REQUESTS: readonly VacationRequest[] = []

export function VacationPage() {
  const requestsQuery = useVacationRequestsQuery()
  const { mutate: setVacationStatus } = useSetVacationStatus()
  const [filter, setFilter] = useState<VacationFilter>('all')
  const [search, setSearch] = useState('')

  const requests = requestsQuery.data ?? EMPTY_REQUESTS

  const metrics = useMemo<readonly VacationMetric[]>(
    () =>
      METRIC_STATUSES.map((status) => ({
        key: status,
        label: VACATION_STATUS_LABELS[status],
        value: requests.filter((request) => request.status === status).length,
      })),
    [requests],
  )

  const visibleRequests = useMemo<readonly VacationRequest[]>(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return requests
      .filter((request) => {
        if (filter !== 'all' && request.status !== filter) {
          return false
        }
        if (!normalizedSearch) {
          return true
        }

        return request.employee.toLowerCase().includes(normalizedSearch)
      })
      .slice()
      .sort(
        (left, right) =>
          STATUS_RANK[left.status] - STATUS_RANK[right.status] ||
          left.startDate.localeCompare(right.startDate),
      )
  }, [filter, requests, search])

  const handleFilterChange = useCallback((nextFilter: VacationStatus) => {
    setFilter((currentFilter) => (currentFilter === nextFilter ? 'all' : nextFilter))
  }, [])

  const handleDecide = useCallback(
    (requestId: string, status: VacationDecision) => {
      setVacationStatus({ requestId, status })
    },
    [setVacationStatus],
  )

  const emptyMessage =
    requests.length === 0
      ? 'No vacation requests yet. Add documents to the "vacationRequests" collection in Firestore.'
      : 'No vacation requests match the current filters.'

  return (
    <>
      <VacationMetrics
        metrics={metrics}
        activeFilter={filter}
        onFilterChange={handleFilterChange}
      />

      <VacationToolbar search={search} onSearchChange={setSearch} />

      {requestsQuery.isPending && <VacationLoading />}

      {requestsQuery.isError && (
        <VacationError
          message={
            requestsQuery.error instanceof Error
              ? requestsQuery.error.message
              : 'Unexpected error while loading vacation requests.'
          }
          onRetry={() => {
            void requestsQuery.refetch()
          }}
        />
      )}

      {requestsQuery.isSuccess && (
        <VacationList
          requests={visibleRequests}
          emptyMessage={emptyMessage}
          onDecide={handleDecide}
        />
      )}
    </>
  )
}

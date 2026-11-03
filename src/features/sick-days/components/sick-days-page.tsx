import { useCallback, useMemo, useState } from 'react'
import { useSetSickDayStatus, useSickDayRecordsQuery } from '../api'
import type { SickDayFilter, SickDayRecord } from '../types/sick-day'
import { SickDaysError, SickDaysLoading } from './sick-days-feedback'
import { SickDaysList } from './sick-days-list'
import { SickDaysMetrics, type SickDayMetric } from './sick-days-metrics'
import { SickDaysToolbar } from './sick-days-toolbar'

const EMPTY_RECORDS: readonly SickDayRecord[] = []

export function SickDaysPage() {
  const recordsQuery = useSickDayRecordsQuery()
  const { mutate: setSickDayStatus } = useSetSickDayStatus()
  const [filter, setFilter] = useState<SickDayFilter>('all')
  const [search, setSearch] = useState('')

  const records = recordsQuery.data ?? EMPTY_RECORDS

  const metrics = useMemo<readonly SickDayMetric[]>(() => {
    const openCount = records.filter((record) => record.status === 'open').length

    return [
      { key: 'all', label: 'All records', value: records.length },
      { key: 'open', label: 'Open cases', value: openCount },
      { key: 'closed', label: 'Closed cases', value: records.length - openCount },
    ]
  }, [records])

  const visibleRecords = useMemo<readonly SickDayRecord[]>(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return records
      .filter((record) => {
        if (filter !== 'all' && record.status !== filter) {
          return false
        }
        if (!normalizedSearch) {
          return true
        }

        return (
          record.employee.toLowerCase().includes(normalizedSearch) ||
          record.reason.toLowerCase().includes(normalizedSearch)
        )
      })
      .slice()
      .sort((left, right) => {
        const leftOpen = left.status === 'open' ? 0 : 1
        const rightOpen = right.status === 'open' ? 0 : 1

        return leftOpen - rightOpen || right.startDate.localeCompare(left.startDate)
      })
  }, [filter, records, search])

  const handleRecover = useCallback(
    (recordId: string) => {
      setSickDayStatus({ recordId, status: 'closed' })
    },
    [setSickDayStatus],
  )

  const emptyMessage =
    records.length === 0
      ? 'No sick day records yet. Add documents to the "sickDays" collection in Firestore.'
      : 'No sick day records match the current filters.'

  return (
    <>
      <SickDaysMetrics metrics={metrics} activeFilter={filter} onFilterChange={setFilter} />

      <SickDaysToolbar search={search} onSearchChange={setSearch} />

      {recordsQuery.isPending && <SickDaysLoading />}

      {recordsQuery.isError && (
        <SickDaysError
          message={
            recordsQuery.error instanceof Error
              ? recordsQuery.error.message
              : 'Unexpected error while loading sick day records.'
          }
          onRetry={() => {
            void recordsQuery.refetch()
          }}
        />
      )}

      {recordsQuery.isSuccess && (
        <SickDaysList
          records={visibleRecords}
          emptyMessage={emptyMessage}
          onRecover={handleRecover}
        />
      )}
    </>
  )
}

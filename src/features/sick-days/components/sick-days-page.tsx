import { useCallback, useMemo, useState } from 'react'
import { SICK_DAY_RECORDS } from '../data/sick-day-records'
import type { SickDayFilter, SickDayRecord, SickDayStatus } from '../types/sick-day'
import { SickDaysList } from './sick-days-list'
import { SickDaysMetrics, type SickDayMetric } from './sick-days-metrics'
import { SickDaysToolbar } from './sick-days-toolbar'

export function SickDaysPage() {
  const [filter, setFilter] = useState<SickDayFilter>('all')
  const [search, setSearch] = useState('')
  const [statusById, setStatusById] = useState<Readonly<Record<string, SickDayStatus>>>({})

  const metrics = useMemo<readonly SickDayMetric[]>(() => {
    const openCount = SICK_DAY_RECORDS.filter(
      (record) => (statusById[record.id] ?? record.status) === 'open',
    ).length

    return [
      { key: 'all', label: 'All records', value: SICK_DAY_RECORDS.length },
      { key: 'open', label: 'Open cases', value: openCount },
      { key: 'closed', label: 'Closed cases', value: SICK_DAY_RECORDS.length - openCount },
    ]
  }, [statusById])

  const visibleRecords = useMemo<readonly SickDayRecord[]>(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return SICK_DAY_RECORDS.filter((record) => {
      const status = statusById[record.id] ?? record.status

      if (filter !== 'all' && status !== filter) {
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
        const leftOpen = (statusById[left.id] ?? left.status) === 'open' ? 0 : 1
        const rightOpen = (statusById[right.id] ?? right.status) === 'open' ? 0 : 1

        return leftOpen - rightOpen || right.startDate.localeCompare(left.startDate)
      })
  }, [filter, search, statusById])

  const handleRecover = useCallback((recordId: string) => {
    setStatusById((current) => ({ ...current, [recordId]: 'closed' }))
  }, [])

  const emptyMessage =
    SICK_DAY_RECORDS.length === 0
      ? 'No sick day records yet. New records will appear in this list.'
      : 'No sick day records match the current filters.'

  return (
    <>
      <SickDaysMetrics metrics={metrics} activeFilter={filter} onFilterChange={setFilter} />

      <SickDaysToolbar search={search} onSearchChange={setSearch} />

      <SickDaysList
        records={visibleRecords}
        statusById={statusById}
        emptyMessage={emptyMessage}
        onRecover={handleRecover}
      />
    </>
  )
}

import { useQuery } from '@tanstack/react-query'
import { fetchTable } from './tables-api'
import { tablesQueryKeys } from './use-tables'

export function useTableQuery(tableId: string) {
  return useQuery({
    queryKey: tablesQueryKeys.detail(tableId),
    queryFn: () => fetchTable(tableId),
    enabled: tableId.length > 0,
  })
}

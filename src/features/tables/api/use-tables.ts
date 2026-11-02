import { useQuery } from '@tanstack/react-query'
import { fetchTables } from './tables-api'

export const tablesQueryKeys = {
  all: ['tables'] as const,
  list: () => [...tablesQueryKeys.all, 'list'] as const,
  detail: (tableId: string) => [...tablesQueryKeys.all, 'detail', tableId] as const,
}

export function useTablesQuery() {
  return useQuery({
    queryKey: tablesQueryKeys.list(),
    queryFn: fetchTables,
  })
}

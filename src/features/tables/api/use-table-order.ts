import { useQuery } from '@tanstack/react-query'
import { fetchTableOrder } from './orders-api'

export const tableOrderQueryKeys = {
  all: ['table-orders'] as const,
  detail: (tableId: string) => [...tableOrderQueryKeys.all, tableId] as const,
}

export function useTableOrderQuery(tableId: string) {
  return useQuery({
    queryKey: tableOrderQueryKeys.detail(tableId),
    queryFn: () => fetchTableOrder(tableId),
    enabled: tableId.length > 0,
  })
}

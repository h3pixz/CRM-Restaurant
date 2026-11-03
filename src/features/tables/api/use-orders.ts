import { useQuery } from '@tanstack/react-query'
import { fetchOrders } from './orders-api'

export const ordersQueryKeys = {
  all: ['orders'] as const,
  list: () => [...ordersQueryKeys.all, 'list'] as const,
}

export function useOrdersQuery() {
  return useQuery({
    queryKey: ordersQueryKeys.list(),
    queryFn: fetchOrders,
  })
}

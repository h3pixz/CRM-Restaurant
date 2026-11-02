import { useQuery } from '@tanstack/react-query'
import { fetchRestaurants } from './restaurants-api'

export const restaurantQueryKeys = {
  all: ['restaurants'] as const,
  list: () => [...restaurantQueryKeys.all, 'list'] as const,
}

export function useRestaurantsQuery() {
  return useQuery({
    queryKey: restaurantQueryKeys.list(),
    queryFn: fetchRestaurants,
  })
}

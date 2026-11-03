import { useQuery } from '@tanstack/react-query'
import { fetchVacationRequests } from './vacation-api'

export const vacationQueryKeys = {
  all: ['vacationRequests'] as const,
  list: () => [...vacationQueryKeys.all, 'list'] as const,
}

export function useVacationRequestsQuery() {
  return useQuery({
    queryKey: vacationQueryKeys.list(),
    queryFn: fetchVacationRequests,
  })
}

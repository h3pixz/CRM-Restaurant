import { useQuery } from '@tanstack/react-query'
import { fetchSickDayRecords } from './sick-days-api'

export const sickDayQueryKeys = {
  all: ['sickDays'] as const,
  list: () => [...sickDayQueryKeys.all, 'list'] as const,
}

export function useSickDayRecordsQuery() {
  return useQuery({
    queryKey: sickDayQueryKeys.list(),
    queryFn: fetchSickDayRecords,
  })
}

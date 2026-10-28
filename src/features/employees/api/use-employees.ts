import { useQuery } from '@tanstack/react-query'
import { fetchEmployees } from './employees-api'

export const employeeQueryKeys = {
  all: ['employees'] as const,
  list: () => [...employeeQueryKeys.all, 'list'] as const,
}

export function useEmployeesQuery() {
  return useQuery({
    queryKey: employeeQueryKeys.list(),
    queryFn: fetchEmployees,
  })
}

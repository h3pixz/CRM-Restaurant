import { useQuery } from '@tanstack/react-query'
import { fetchTasks } from './tasks-api'

export const taskQueryKeys = {
  all: ['tasks'] as const,
  list: () => [...taskQueryKeys.all, 'list'] as const,
}

export function useTasksQuery() {
  return useQuery({
    queryKey: taskQueryKeys.list(),
    queryFn: fetchTasks,
  })
}

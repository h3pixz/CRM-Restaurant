import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Task, TaskStatus } from '../types/task'
import { setTaskStatus } from './tasks-api'
import { taskQueryKeys } from './use-tasks'

interface SetTaskStatusVariables {
  readonly taskId: string
  readonly status: TaskStatus
}

interface SetTaskStatusContext {
  readonly previousTasks: readonly Task[] | undefined
}

export function useSetTaskStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, status }: SetTaskStatusVariables) => setTaskStatus(taskId, status),

    onMutate: async ({
      taskId,
      status,
    }: SetTaskStatusVariables): Promise<SetTaskStatusContext> => {
      const queryKey = taskQueryKeys.list()
      await queryClient.cancelQueries({ queryKey })
      const previousTasks = queryClient.getQueryData<readonly Task[]>(queryKey)

      if (previousTasks) {
        queryClient.setQueryData<readonly Task[]>(
          queryKey,
          previousTasks.map((task) => (task.id === taskId ? { ...task, status } : task)),
        )
      }

      return { previousTasks }
    },

    onError: (_error, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(taskQueryKeys.list(), context.previousTasks)
      }
    },

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: taskQueryKeys.list() })
    },
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { VacationRequest, VacationStatus } from '../types/vacation'
import { setVacationStatus } from './vacation-api'
import { vacationQueryKeys } from './use-vacation-requests'

interface SetVacationStatusVariables {
  readonly requestId: string
  readonly status: VacationStatus
}

interface SetVacationStatusContext {
  readonly previousRequests: readonly VacationRequest[] | undefined
}

export function useSetVacationStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ requestId, status }: SetVacationStatusVariables) =>
      setVacationStatus(requestId, status),

    onMutate: async ({
      requestId,
      status,
    }: SetVacationStatusVariables): Promise<SetVacationStatusContext> => {
      const queryKey = vacationQueryKeys.list()
      await queryClient.cancelQueries({ queryKey })
      const previousRequests = queryClient.getQueryData<readonly VacationRequest[]>(queryKey)

      if (previousRequests) {
        queryClient.setQueryData<readonly VacationRequest[]>(
          queryKey,
          previousRequests.map((request) =>
            request.id === requestId ? { ...request, status } : request,
          ),
        )
      }

      return { previousRequests }
    },

    onError: (_error, _variables, context) => {
      if (context?.previousRequests) {
        queryClient.setQueryData(vacationQueryKeys.list(), context.previousRequests)
      }
    },

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: vacationQueryKeys.list() })
    },
  })
}

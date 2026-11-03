import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { SickDayRecord, SickDayStatus } from '../types/sick-day'
import { setSickDayStatus } from './sick-days-api'
import { sickDayQueryKeys } from './use-sick-day-records'

interface SetSickDayStatusVariables {
  readonly recordId: string
  readonly status: SickDayStatus
}

interface SetSickDayStatusContext {
  readonly previousRecords: readonly SickDayRecord[] | undefined
}

export function useSetSickDayStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ recordId, status }: SetSickDayStatusVariables) =>
      setSickDayStatus(recordId, status),

    onMutate: async ({
      recordId,
      status,
    }: SetSickDayStatusVariables): Promise<SetSickDayStatusContext> => {
      const queryKey = sickDayQueryKeys.list()
      await queryClient.cancelQueries({ queryKey })
      const previousRecords = queryClient.getQueryData<readonly SickDayRecord[]>(queryKey)

      if (previousRecords) {
        queryClient.setQueryData<readonly SickDayRecord[]>(
          queryKey,
          previousRecords.map((record) =>
            record.id === recordId ? { ...record, status } : record,
          ),
        )
      }

      return { previousRecords }
    },

    onError: (_error, _variables, context) => {
      if (context?.previousRecords) {
        queryClient.setQueryData(sickDayQueryKeys.list(), context.previousRecords)
      }
    },

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: sickDayQueryKeys.list() })
    },
  })
}

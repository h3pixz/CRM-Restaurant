import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Employee } from '../types/employee'
import { setEmployeeOnShift } from './employees-api'
import { employeeQueryKeys } from './use-employees'

interface SetEmployeeOnShiftVariables {
  readonly employeeId: string
  readonly onShift: boolean
}

interface SetEmployeeOnShiftContext {
  readonly previousEmployees: readonly Employee[] | undefined
}

export function useSetEmployeeOnShift() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ employeeId, onShift }: SetEmployeeOnShiftVariables) =>
      setEmployeeOnShift(employeeId, onShift),

    onMutate: async ({
      employeeId,
      onShift,
    }: SetEmployeeOnShiftVariables): Promise<SetEmployeeOnShiftContext> => {
      const queryKey = employeeQueryKeys.list()
      await queryClient.cancelQueries({ queryKey })
      const previousEmployees = queryClient.getQueryData<readonly Employee[]>(queryKey)

      if (previousEmployees) {
        queryClient.setQueryData<readonly Employee[]>(
          queryKey,
          previousEmployees.map((employee) =>
            employee.id === employeeId ? { ...employee, onShift } : employee,
          ),
        )
      }

      return { previousEmployees }
    },

    onError: (_error, _variables, context) => {
      if (context?.previousEmployees) {
        queryClient.setQueryData(employeeQueryKeys.list(), context.previousEmployees)
      }
    },

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: employeeQueryKeys.list() })
    },
  })
}

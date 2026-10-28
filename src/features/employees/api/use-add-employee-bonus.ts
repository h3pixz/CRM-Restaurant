import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Employee } from '../types/employee'
import { addEmployeeBonus } from './employees-api'
import { employeeQueryKeys } from './use-employees'

interface AddEmployeeBonusVariables {
  readonly employeeId: string
  readonly amount: number
}

interface AddEmployeeBonusContext {
  readonly previousEmployees: readonly Employee[] | undefined
}

export function useAddEmployeeBonus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ employeeId, amount }: AddEmployeeBonusVariables) =>
      addEmployeeBonus(employeeId, amount),

    onMutate: async ({
      employeeId,
      amount,
    }: AddEmployeeBonusVariables): Promise<AddEmployeeBonusContext> => {
      const queryKey = employeeQueryKeys.list()
      await queryClient.cancelQueries({ queryKey })
      const previousEmployees = queryClient.getQueryData<readonly Employee[]>(queryKey)

      if (previousEmployees) {
        queryClient.setQueryData<readonly Employee[]>(
          queryKey,
          previousEmployees.map((employee) =>
            employee.id === employeeId
              ? { ...employee, bonus: employee.bonus + amount }
              : employee,
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

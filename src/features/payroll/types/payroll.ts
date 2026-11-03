import type { Employee } from '@/features/employees'

export interface PayrollEntry {
  readonly employee: Employee
  readonly base: number
  readonly bonus: number
  readonly total: number
}

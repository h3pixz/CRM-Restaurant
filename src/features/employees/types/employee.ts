export type ShiftType = 'A' | 'B'

export type EmployeeFilter = 'all' | 'on-shift' | 'idle'

export interface Employee {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly avatarUrl: string
  readonly shift: ShiftType
  readonly onShift: boolean
  readonly employmentDate: string
  readonly billingDate: string
  readonly bonus: number
}

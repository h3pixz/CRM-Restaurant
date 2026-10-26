export type ShiftType = 'A' | 'B'

export interface Employee {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly avatarUrl: string
  readonly shift: ShiftType
  /** ISO 8601 date, e.g. "2021-01-05" */
  readonly employmentDate: string
  /** ISO 8601 date, e.g. "2023-01-05" */
  readonly billingDate: string
}

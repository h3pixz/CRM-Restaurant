export const VACATION_STATUSES = ['pending', 'approved', 'declined'] as const

export type VacationStatus = (typeof VACATION_STATUSES)[number]

export type VacationFilter = 'all' | VacationStatus

export type VacationDecision = Extract<VacationStatus, 'approved' | 'declined'>

export interface VacationRequest {
  readonly id: string
  readonly employee: string
  readonly startDate: string
  readonly endDate: string
  readonly days: number
  readonly submittedAt: string
  readonly status: VacationStatus
  readonly note?: string
}

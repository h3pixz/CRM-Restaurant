export const SICK_DAY_STATUSES = ['open', 'closed'] as const

export type SickDayStatus = (typeof SICK_DAY_STATUSES)[number]

export type SickDayFilter = 'all' | SickDayStatus

export interface SickDayRecord {
  readonly id: string
  readonly employee: string
  readonly startDate: string
  readonly endDate: string
  readonly days: number
  readonly reason: string
  readonly status: SickDayStatus
  readonly hasCertificate: boolean
}

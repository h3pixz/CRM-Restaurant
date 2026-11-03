import type { VacationFilter, VacationStatus } from '../types/vacation'

export const VACATION_FILTERS: readonly VacationFilter[] = [
  'all',
  'pending',
  'approved',
  'declined',
]

export const VACATION_STATUS_LABELS: Record<VacationStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  declined: 'Declined',
}

export const VACATION_FILTER_LABELS: Record<VacationFilter, string> = {
  all: 'All requests',
  pending: 'Pending',
  approved: 'Approved',
  declined: 'Declined',
}

export const VACATION_STATUS_STYLES: Record<VacationStatus, string> = {
  pending: 'border-[#e8ddb5] bg-[#fbf5dc] text-[#8a6a13]',
  approved: 'border-[#d6e3cf] bg-[#eef4ea] text-[#4c6640]',
  declined: 'border-[#edd0d0] bg-[#fae5e5] text-[#b32020]',
}

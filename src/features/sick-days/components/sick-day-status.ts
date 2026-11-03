import type { SickDayStatus } from '../types/sick-day'

export const SICK_DAY_STATUS_LABELS: Record<SickDayStatus, string> = {
  open: 'Open',
  closed: 'Closed',
}

export const SICK_DAY_STATUS_STYLES: Record<SickDayStatus, string> = {
  open: 'border-[#e8ddb5] bg-[#fbf5dc] text-[#8a6a13]',
  closed: 'border-[#d6e3cf] bg-[#eef4ea] text-[#4c6640]',
}

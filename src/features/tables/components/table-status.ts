import type { TableStatus } from '../types/table'

export const TABLE_METRIC_LABELS: Record<TableStatus, string> = {
  free: 'Free',
  occupied: 'Occupied',
  reserved: 'Reserved',
}

export const TABLE_BADGE_LABELS: Record<TableStatus, string> = {
  free: 'Free',
  occupied: 'Occ',
  reserved: 'Res',
}

export const TABLE_CARD_STYLES: Record<TableStatus, string> = {
  free: 'border-[#d5d7da] bg-white hover:bg-neutral-50',
  occupied: 'border-[#e8ddb5] bg-[#fbf5dc] hover:bg-[#f9f1d0]',
  reserved: 'border-[#edd0d0] bg-[#fae5e5] hover:bg-[#f8dcdc]',
}

export const TABLE_BADGE_STYLES: Record<TableStatus, string> = {
  free: 'bg-[#bbf78a] text-neutral-800',
  occupied: 'bg-[#f8cf62] text-neutral-800',
  reserved: 'bg-[#f6685e] text-white',
}

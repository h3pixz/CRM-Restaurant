import type { ShiftType } from '@/features/employees'
import type { ShiftFilter } from '../types/shift'

export const SHIFT_ORDER: readonly ShiftType[] = ['A', 'B']

export const SHIFT_META: Record<
  ShiftType,
  { readonly label: string; readonly description: string; readonly dotClass: string }
> = {
  A: {
    label: 'Shift A',
    description: 'Morning · 08:00 – 16:00',
    dotClass: 'bg-shift-a',
  },
  B: {
    label: 'Shift B',
    description: 'Evening · 16:00 – 00:00',
    dotClass: 'bg-shift-b',
  },
}

export const SHIFT_FILTER_LABELS: Record<ShiftFilter, string> = {
  all: 'All employees',
  'on-shift': 'On shift now',
  'off-duty': 'Off duty',
}

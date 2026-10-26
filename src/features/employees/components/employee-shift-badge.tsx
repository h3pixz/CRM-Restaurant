import type { ShiftType } from '../types/employee'
import { cn } from '@/lib/utils'

const SHIFT_CLASS: Record<ShiftType, string> = {
  A: 'bg-shift-a',
  B: 'bg-shift-b',
}

export function EmployeeShiftBadge({ shift }: { shift: ShiftType }) {
  return (
    <span
      aria-label={`Shift ${shift}`}
      className={cn(
        'inline-flex size-6 items-center justify-center rounded-full text-xs font-semibold text-white',
        SHIFT_CLASS[shift],
      )}
    >
      {shift}
    </span>
  )
}

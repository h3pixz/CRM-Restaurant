import {
  BriefcaseBusiness,
  CalendarDays,
  ChartLine,
  CreditCard,
  HeartPulse,
  Home,
  ListTree,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  icon: LucideIcon
  active?: boolean
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', icon: Home },
  { label: 'Shift', icon: CalendarDays },
  { label: 'Payroll', icon: CreditCard },
  { label: 'Tasks', icon: ListTree },
  { label: 'Analytics', icon: ChartLine },
  { label: 'Employees', icon: Users, active: true },
  { label: 'Vacation', icon: BriefcaseBusiness },
  { label: 'Sick days', icon: HeartPulse },
]

export function AppSidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col bg-sidebar px-6 py-7">
      <div className="mb-10 pl-3">
        <h1 className="font-logo text-[19px] font-bold tracking-[0.12em] text-black uppercase">
          Restaurant CRM
        </h1>
        <div className="mt-4 h-px w-full bg-neutral-300" />
      </div>

      <nav aria-label="Main navigation" className="flex-1 space-y-2">
        {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
          <a
            key={label}
            href="#"
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3.5 rounded-xl px-4 py-3 text-[15px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              active
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-neutral-700 hover:bg-neutral-200/60',
            )}
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.8}
              className={cn('size-5 shrink-0', active ? 'text-white' : 'text-neutral-500')}
            />
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}

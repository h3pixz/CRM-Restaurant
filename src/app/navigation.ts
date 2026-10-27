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

export interface NavItem {
  readonly label: string
  readonly to: string
  readonly icon: LucideIcon
}

export const NAV_ITEMS = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Shift', to: '/shift', icon: CalendarDays },
  { label: 'Payroll', to: '/payroll', icon: CreditCard },
  { label: 'Tasks', to: '/tasks', icon: ListTree },
  { label: 'Analytics', to: '/analytics', icon: ChartLine },
  { label: 'Employees', to: '/employees', icon: Users },
  { label: 'Vacation', to: '/vacation', icon: BriefcaseBusiness },
  { label: 'Sick days', to: '/sick-days', icon: HeartPulse },
] as const satisfies readonly NavItem[]

export function getNavItemByPath(pathname: string): NavItem | undefined {
  return NAV_ITEMS.find((item) => item.to === pathname)
}

import {
  BriefcaseBusiness,
  CalendarDays,
  ChartLine,
  CreditCard,
  HeartPulse,
  Home,
  ListTree,
  MessageCircle,
  Table2,
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
  { label: 'Tables', to: '/tables', icon: Table2 },
  { label: 'Chat', to: '/chat', icon: MessageCircle },
  { label: 'Vacation', to: '/vacation', icon: BriefcaseBusiness },
  { label: 'Sick days', to: '/sick-days', icon: HeartPulse },
] as const satisfies readonly NavItem[]

export function getNavItemByPath(pathname: string): NavItem | undefined {
  const exactMatch = NAV_ITEMS.find((item) => item.to === pathname)

  if (exactMatch) {
    return exactMatch
  }

  return NAV_ITEMS.filter(
    (item) => item.to !== '/' && pathname.startsWith(`${item.to}/`),
  ).sort((left, right) => right.to.length - left.to.length)[0]
}

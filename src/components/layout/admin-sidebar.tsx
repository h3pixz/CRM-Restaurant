import { Link } from '@tanstack/react-router'
import { ChartPie, ClipboardList, Table2, type LucideIcon } from 'lucide-react'
import { NavDrawer } from './nav-drawer'

interface AdminNavItem {
  readonly label: string
  readonly to: '/tables' | '/orders' | '/statistics'
  readonly icon: LucideIcon
}

const ADMIN_NAV_ITEMS: readonly AdminNavItem[] = [
  { label: 'Tables', to: '/tables', icon: Table2 },
  { label: 'Orders', to: '/orders', icon: ClipboardList },
  { label: 'Statistics', to: '/statistics', icon: ChartPie },
]

interface AdminSidebarNavProps {
  readonly onNavigate?: () => void
}

function AdminSidebarBrand() {
  return (
    <div className="px-2 pb-5">
      <h1 className="font-logo text-sm font-bold tracking-[0.22em] text-white uppercase">
        Restaurant CRM
      </h1>
      <div className="mt-5 h-px w-full bg-neutral-700/60" />
    </div>
  )
}

function AdminSidebarNav({ onNavigate }: AdminSidebarNavProps) {
  return (
    <nav aria-label="Admin navigation" className="mt-2 space-y-3">
      {ADMIN_NAV_ITEMS.map(({ label, to, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          className="flex min-h-11 items-center gap-3.5 rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
          activeProps={{
            className: 'bg-white text-neutral-900 shadow-sm',
            'aria-current': 'page',
          }}
          inactiveProps={{
            className: 'bg-[#292929] text-neutral-300 hover:text-white',
          }}
        >
          {({ isActive }) => (
            <>
              <Icon
                aria-hidden="true"
                strokeWidth={1.8}
                className={
                  isActive ? 'size-5 shrink-0 text-neutral-700' : 'size-5 shrink-0 text-neutral-400'
                }
              />
              <span>{label}</span>
            </>
          )}
        </Link>
      ))}
    </nav>
  )
}

export function AdminSidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col bg-[#202020] px-4 py-7 lg:flex">
      <AdminSidebarBrand />
      <AdminSidebarNav />
    </aside>
  )
}

interface AdminSidebarDrawerProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
}

export function AdminSidebarDrawer({ open, onOpenChange }: AdminSidebarDrawerProps) {
  return (
    <NavDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Admin navigation"
      className="bg-[#202020] px-4"
      closeClassName="text-neutral-400 hover:bg-white/10 hover:text-white"
    >
      <AdminSidebarBrand />
      <AdminSidebarNav onNavigate={() => onOpenChange(false)} />
    </NavDrawer>
  )
}

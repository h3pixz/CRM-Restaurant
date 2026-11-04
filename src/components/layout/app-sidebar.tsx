import { Link } from '@tanstack/react-router'
import { NAV_ITEMS } from '@/app/navigation'
import { NavDrawer } from './nav-drawer'

interface AppSidebarNavProps {
  readonly onNavigate?: () => void
}

function AppSidebarBrand() {
  return (
    <div className="mb-10 pl-3">
      <h1 className="font-logo text-[19px] font-bold tracking-[0.12em] text-black uppercase">
        Restaurant CRM
      </h1>
      <div className="mt-4 h-px w-full bg-neutral-300" />
    </div>
  )
}

function AppSidebarNav({ onNavigate }: AppSidebarNavProps) {
  return (
    <nav aria-label="Main navigation" className="flex-1 space-y-2">
      {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: to === '/' }}
          className="flex min-h-11 items-center gap-3.5 rounded-xl px-4 py-3 text-[15px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          activeProps={{
            className: 'bg-primary text-primary-foreground shadow-sm',
            'aria-current': 'page',
          }}
          inactiveProps={{ className: 'text-neutral-700 hover:bg-neutral-200/60' }}
        >
          {({ isActive }) => (
            <>
              <Icon
                aria-hidden="true"
                strokeWidth={1.8}
                className={isActive ? 'size-5 shrink-0 text-white' : 'size-5 shrink-0 text-neutral-500'}
              />
              <span>{label}</span>
            </>
          )}
        </Link>
      ))}
    </nav>
  )
}

export function AppSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-sidebar px-6 py-7 lg:flex">
      <AppSidebarBrand />
      <AppSidebarNav />
    </aside>
  )
}

interface AppSidebarDrawerProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
}

export function AppSidebarDrawer({ open, onOpenChange }: AppSidebarDrawerProps) {
  return (
    <NavDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Restaurant CRM navigation"
      className="bg-sidebar"
    >
      <AppSidebarBrand />
      <AppSidebarNav onNavigate={() => onOpenChange(false)} />
    </NavDrawer>
  )
}

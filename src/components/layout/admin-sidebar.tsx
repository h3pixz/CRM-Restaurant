import { Link } from '@tanstack/react-router'
import { ChartPie, ClipboardList, Table2, type LucideIcon } from 'lucide-react'

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

export function AdminSidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col bg-[#202020] px-4 py-7">
      <div className="px-2 pb-5">
        <h1 className="font-logo text-sm font-bold tracking-[0.22em] text-white uppercase">
          Restaurant CRM
        </h1>
        <div className="mt-5 h-px w-full bg-neutral-700/60" />
      </div>

      <nav aria-label="Admin navigation" className="mt-2 space-y-3">
        {ADMIN_NAV_ITEMS.map(({ label, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3.5 rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
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
    </aside>
  )
}

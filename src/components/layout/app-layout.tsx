import { Outlet, useRouterState } from '@tanstack/react-router'
import { getNavItemByPath } from '@/app/navigation'
import { AppSidebar } from './app-sidebar'
import { TopBar } from './top-bar'

const USER_NAME = 'Dwayne Exum'

export function AppLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const title = getNavItemByPath(pathname)?.label ?? 'Restaurant CRM'

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-neutral-800 selection:text-white">
      <AppSidebar />

      <main className="flex min-w-0 flex-1 flex-col bg-background px-10 py-7">
        <TopBar title={title} userName={USER_NAME} />
        <Outlet />
      </main>
    </div>
  )
}

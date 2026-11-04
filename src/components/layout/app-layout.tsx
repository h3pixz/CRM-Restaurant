import { useState } from 'react'
import { Outlet, useRouterState } from '@tanstack/react-router'
import { getNavItemByPath } from '@/app/navigation'
import { AppSidebar, AppSidebarDrawer } from './app-sidebar'
import { TopBar } from './top-bar'

const USER_NAME = 'Dwayne Exum'

export function AppLayout() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const title = getNavItemByPath(pathname)?.label ?? 'Restaurant CRM'

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-neutral-800 selection:text-white">
      <AppSidebar />
      <AppSidebarDrawer open={isNavOpen} onOpenChange={setIsNavOpen} />

      <main className="flex min-w-0 flex-1 flex-col bg-background px-4 py-5 sm:px-6 lg:px-10 lg:py-7">
        <TopBar title={title} userName={USER_NAME} onOpenNav={() => setIsNavOpen(true)} />
        <Outlet />
      </main>
    </div>
  )
}

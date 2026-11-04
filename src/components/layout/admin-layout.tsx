import { useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import { AdminSidebar, AdminSidebarDrawer } from './admin-sidebar'
import { AdminTopBar } from './admin-top-bar'

export function AdminLayout() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-neutral-800 selection:text-white">
      <AdminSidebar />
      <AdminSidebarDrawer open={isNavOpen} onOpenChange={setIsNavOpen} />

      <main className="flex min-w-0 flex-1 flex-col bg-[#fbfbfb] px-4 sm:px-6 lg:px-10">
        <AdminTopBar onOpenNav={() => setIsNavOpen(true)} />
        <div className="flex flex-1 flex-col pb-12">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

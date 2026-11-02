import { Outlet } from '@tanstack/react-router'
import { AdminSidebar } from './admin-sidebar'
import { AdminTopBar } from './admin-top-bar'

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-neutral-800 selection:text-white">
      <AdminSidebar />

      <main className="flex min-w-0 flex-1 flex-col bg-[#fbfbfb] px-10">
        <AdminTopBar />
        <div className="flex flex-1 flex-col pb-12">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

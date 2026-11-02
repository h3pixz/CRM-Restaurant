import { createRoute, redirect } from '@tanstack/react-router'
import { AdminLayout } from '@/components/layout/admin-layout'
import { isAdminAuthenticated } from '@/features/auth'
import { rootRoute } from './root-route'

export const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_admin',
  beforeLoad: ({ location }) => {
    if (!isAdminAuthenticated()) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
  },
  component: AdminLayout,
})

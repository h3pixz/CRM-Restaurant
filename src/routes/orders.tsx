import { createRoute } from '@tanstack/react-router'
import { AdminOrdersPage } from '@/features/admin'
import { adminLayoutRoute } from './admin-layout-route'

export const ordersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/orders',
  component: AdminOrdersPage,
})

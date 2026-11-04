import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { adminLayoutRoute } from './admin-layout-route'

export const ordersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/orders',
  component: lazyRouteComponent(
    () => import('@/features/admin/components/admin-pages'),
    'AdminOrdersPage',
  ),
})

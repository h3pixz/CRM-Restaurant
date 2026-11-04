import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { adminLayoutRoute } from './admin-layout-route'

export const tableDetailRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/tables/$tableId',
  component: lazyRouteComponent(
    () => import('@/features/tables/components/table-order-page'),
    'TableOrderPage',
  ),
})

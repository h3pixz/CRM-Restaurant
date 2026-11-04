import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { adminLayoutRoute } from './admin-layout-route'

export const tablesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/tables',
  component: lazyRouteComponent(
    () => import('@/features/tables/components/tables-page'),
    'TablesPage',
  ),
})

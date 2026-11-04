import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { adminLayoutRoute } from './admin-layout-route'

export const statisticsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/statistics',
  component: lazyRouteComponent(
    () => import('@/features/admin/components/admin-statistics-page'),
    'AdminStatisticsPage',
  ),
})

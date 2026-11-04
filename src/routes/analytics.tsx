import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { appLayoutRoute } from './app-layout-route'

export const analyticsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/analytics',
  component: lazyRouteComponent(
    () => import('@/features/analytics/components/analytics-page'),
    'AnalyticsPage',
  ),
})

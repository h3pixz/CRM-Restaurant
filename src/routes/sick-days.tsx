import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { appLayoutRoute } from './app-layout-route'

export const sickDaysRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/sick-days',
  component: lazyRouteComponent(
    () => import('@/features/sick-days/components/sick-days-page'),
    'SickDaysPage',
  ),
})

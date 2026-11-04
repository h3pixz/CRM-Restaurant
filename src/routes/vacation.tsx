import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { appLayoutRoute } from './app-layout-route'

export const vacationRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/vacation',
  component: lazyRouteComponent(
    () => import('@/features/vacation/components/vacation-page'),
    'VacationPage',
  ),
})

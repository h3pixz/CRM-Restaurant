import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { appLayoutRoute } from './app-layout-route'

export const shiftRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/shift',
  component: lazyRouteComponent(
    () => import('@/features/shift/components/shift-page'),
    'ShiftPage',
  ),
})

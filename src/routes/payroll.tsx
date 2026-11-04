import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { appLayoutRoute } from './app-layout-route'

export const payrollRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/payroll',
  component: lazyRouteComponent(
    () => import('@/features/payroll/components/payroll-page'),
    'PayrollPage',
  ),
})

import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { appLayoutRoute } from './app-layout-route'

export const employeesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/employees',
  component: lazyRouteComponent(
    () => import('@/features/employees/components/employees-page'),
    'EmployeesPage',
  ),
})

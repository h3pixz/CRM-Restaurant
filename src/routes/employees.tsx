import { createRoute } from '@tanstack/react-router'
import { EmployeesPage } from '@/features/employees'
import { rootRoute } from './root-route'

export const employeesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/employees',
  component: EmployeesPage,
})

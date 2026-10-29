import { createRoute } from '@tanstack/react-router'
import { EmployeesPage } from '@/features/employees'
import { appLayoutRoute } from './app-layout-route'

export const employeesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/employees',
  component: EmployeesPage,
})

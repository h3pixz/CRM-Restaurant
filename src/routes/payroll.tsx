import { createRoute } from '@tanstack/react-router'
import { PayrollPage } from '@/features/payroll'
import { appLayoutRoute } from './app-layout-route'

export const payrollRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/payroll',
  component: PayrollPage,
})

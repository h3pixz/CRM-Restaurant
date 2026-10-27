import { createRouter } from '@tanstack/react-router'
import { analyticsRoute } from '@/routes/analytics'
import { employeesRoute } from '@/routes/employees'
import { homeRoute } from '@/routes/home'
import { payrollRoute } from '@/routes/payroll'
import { rootRoute } from '@/routes/root-route'
import { shiftRoute } from '@/routes/shift'
import { sickDaysRoute } from '@/routes/sick-days'
import { tasksRoute } from '@/routes/tasks'
import { vacationRoute } from '@/routes/vacation'

const routeTree = rootRoute.addChildren([
  homeRoute,
  shiftRoute,
  payrollRoute,
  tasksRoute,
  analyticsRoute,
  employeesRoute,
  vacationRoute,
  sickDaysRoute,
])

export const router = createRouter({ routeTree, defaultPreload: 'intent' })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

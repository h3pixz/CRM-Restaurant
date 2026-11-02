import { createRouter } from '@tanstack/react-router'
import { analyticsRoute } from '@/routes/analytics'
import { appLayoutRoute } from '@/routes/app-layout-route'
import { chatRoute } from '@/routes/chat'
import { employeesRoute } from '@/routes/employees'
import { homeRoute } from '@/routes/home'
import { payrollRoute } from '@/routes/payroll'
import { restaurantsRoute } from '@/routes/restaurants'
import { rootRoute } from '@/routes/root-route'
import { shiftRoute } from '@/routes/shift'
import { sickDaysRoute } from '@/routes/sick-days'
import { tableDetailRoute } from '@/routes/table-detail'
import { tablesRoute } from '@/routes/tables'
import { tasksRoute } from '@/routes/tasks'
import { vacationRoute } from '@/routes/vacation'

const routeTree = rootRoute.addChildren([
  appLayoutRoute.addChildren([
    homeRoute,
    shiftRoute,
    payrollRoute,
    tasksRoute,
    analyticsRoute,
    employeesRoute,
    tablesRoute,
    tableDetailRoute,
    chatRoute,
    vacationRoute,
    sickDaysRoute,
  ]),
  restaurantsRoute,
])

export const router = createRouter({ routeTree, defaultPreload: 'intent' })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

import { createRouter } from '@tanstack/react-router'
import { adminLayoutRoute } from '@/routes/admin-layout-route'
import { analyticsRoute } from '@/routes/analytics'
import { appLayoutRoute } from '@/routes/app-layout-route'
import { chatRoute } from '@/routes/chat'
import { employeesRoute } from '@/routes/employees'
import { homeRoute } from '@/routes/home'
import { loginRoute } from '@/routes/login'
import { ordersRoute } from '@/routes/orders'
import { payrollRoute } from '@/routes/payroll'
import { restaurantsRoute } from '@/routes/restaurants'
import { rootRoute } from '@/routes/root-route'
import { shiftRoute } from '@/routes/shift'
import { sickDaysRoute } from '@/routes/sick-days'
import { statisticsRoute } from '@/routes/statistics'
import { tableDetailRoute } from '@/routes/table-detail'
import { tablesRoute } from '@/routes/tables'
import { tasksRoute } from '@/routes/tasks'
import { vacationRoute } from '@/routes/vacation'

const routeTree = rootRoute.addChildren([
  loginRoute,
  appLayoutRoute.addChildren([
    homeRoute,
    shiftRoute,
    payrollRoute,
    tasksRoute,
    analyticsRoute,
    employeesRoute,
    chatRoute,
    vacationRoute,
    sickDaysRoute,
  ]),
  adminLayoutRoute.addChildren([
    tablesRoute,
    tableDetailRoute,
    ordersRoute,
    statisticsRoute,
  ]),
  restaurantsRoute,
])

export const router = createRouter({ routeTree, defaultPreload: 'intent' })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

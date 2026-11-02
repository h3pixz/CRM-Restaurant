import { createRoute } from '@tanstack/react-router'
import { AdminStatisticsPage } from '@/features/admin'
import { adminLayoutRoute } from './admin-layout-route'

export const statisticsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/statistics',
  component: AdminStatisticsPage,
})

import { createRoute } from '@tanstack/react-router'
import { AnalyticsPage } from '@/features/analytics'
import { appLayoutRoute } from './app-layout-route'

export const analyticsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/analytics',
  component: AnalyticsPage,
})

import { createRoute } from '@tanstack/react-router'
import { AppLayout } from '@/components/layout/app-layout'
import { rootRoute } from './root-route'

export const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_app',
  component: AppLayout,
})

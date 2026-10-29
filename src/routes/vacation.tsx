import { createRoute } from '@tanstack/react-router'
import { SectionPlaceholder } from '@/components/layout/section-placeholder'
import { appLayoutRoute } from './app-layout-route'

export const vacationRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/vacation',
  component: SectionPlaceholder,
})

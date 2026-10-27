import { createRoute } from '@tanstack/react-router'
import { SectionPlaceholder } from '@/components/layout/section-placeholder'
import { rootRoute } from './root-route'

export const vacationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vacation',
  component: SectionPlaceholder,
})

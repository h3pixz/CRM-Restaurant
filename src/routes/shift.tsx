import { createRoute } from '@tanstack/react-router'
import { SectionPlaceholder } from '@/components/layout/section-placeholder'
import { rootRoute } from './root-route'

export const shiftRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shift',
  component: SectionPlaceholder,
})

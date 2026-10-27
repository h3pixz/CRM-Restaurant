import { createRoute } from '@tanstack/react-router'
import { SectionPlaceholder } from '@/components/layout/section-placeholder'
import { rootRoute } from './root-route'

export const sickDaysRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sick-days',
  component: SectionPlaceholder,
})

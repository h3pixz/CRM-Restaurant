import { createRoute } from '@tanstack/react-router'
import { SectionPlaceholder } from '@/components/layout/section-placeholder'
import { rootRoute } from './root-route'

export const payrollRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payroll',
  component: SectionPlaceholder,
})

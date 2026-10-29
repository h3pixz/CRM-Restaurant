import { createRoute } from '@tanstack/react-router'
import { SectionPlaceholder } from '@/components/layout/section-placeholder'
import { appLayoutRoute } from './app-layout-route'

export const payrollRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/payroll',
  component: SectionPlaceholder,
})

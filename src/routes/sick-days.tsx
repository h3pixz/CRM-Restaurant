import { createRoute } from '@tanstack/react-router'
import { SectionPlaceholder } from '@/components/layout/section-placeholder'
import { appLayoutRoute } from './app-layout-route'

export const sickDaysRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/sick-days',
  component: SectionPlaceholder,
})

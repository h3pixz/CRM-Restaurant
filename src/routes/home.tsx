import { createRoute } from '@tanstack/react-router'
import { SectionPlaceholder } from '@/components/layout/section-placeholder'
import { rootRoute } from './root-route'

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SectionPlaceholder,
})

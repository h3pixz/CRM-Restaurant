import { createRoute } from '@tanstack/react-router'
import { SectionPlaceholder } from '@/components/layout/section-placeholder'
import { appLayoutRoute } from './app-layout-route'

export const homeRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/',
  component: SectionPlaceholder,
})

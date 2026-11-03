import { createRoute } from '@tanstack/react-router'
import { SickDaysPage } from '@/features/sick-days'
import { appLayoutRoute } from './app-layout-route'

export const sickDaysRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/sick-days',
  component: SickDaysPage,
})

import { createRoute } from '@tanstack/react-router'
import { VacationPage } from '@/features/vacation'
import { appLayoutRoute } from './app-layout-route'

export const vacationRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/vacation',
  component: VacationPage,
})

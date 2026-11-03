import { createRoute } from '@tanstack/react-router'
import { ShiftPage } from '@/features/shift'
import { appLayoutRoute } from './app-layout-route'

export const shiftRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/shift',
  component: ShiftPage,
})

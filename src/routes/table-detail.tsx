import { createRoute } from '@tanstack/react-router'
import { TableOrderPage } from '@/features/tables'
import { appLayoutRoute } from './app-layout-route'

export const tableDetailRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/tables/$tableId',
  component: TableOrderPage,
})

import { createRoute } from '@tanstack/react-router'
import { TableOrderPage } from '@/features/tables'
import { adminLayoutRoute } from './admin-layout-route'

export const tableDetailRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/tables/$tableId',
  component: TableOrderPage,
})

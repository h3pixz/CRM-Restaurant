import { createRoute } from '@tanstack/react-router'
import { TablesPage } from '@/features/tables'
import { adminLayoutRoute } from './admin-layout-route'

export const tablesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/tables',
  component: TablesPage,
})

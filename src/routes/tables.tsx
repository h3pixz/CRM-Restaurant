import { createRoute } from '@tanstack/react-router'
import { TablesPage } from '@/features/tables'
import { appLayoutRoute } from './app-layout-route'

export const tablesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/tables',
  component: TablesPage,
})

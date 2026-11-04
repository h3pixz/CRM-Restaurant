import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { appLayoutRoute } from './app-layout-route'

export const tasksRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/tasks',
  component: lazyRouteComponent(
    () => import('@/features/tasks/components/tasks-page'),
    'TasksPage',
  ),
})

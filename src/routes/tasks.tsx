import { createRoute } from '@tanstack/react-router'
import { TasksPage } from '@/features/tasks'
import { appLayoutRoute } from './app-layout-route'

export const tasksRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/tasks',
  component: TasksPage,
})

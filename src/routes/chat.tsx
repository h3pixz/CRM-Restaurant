import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { appLayoutRoute } from './app-layout-route'

export const chatRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/chat',
  component: lazyRouteComponent(
    () => import('@/features/chat/components/chat-page'),
    'ChatPage',
  ),
})

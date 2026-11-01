import { createRoute } from '@tanstack/react-router'
import { ChatPage } from '@/features/chat'
import { appLayoutRoute } from './app-layout-route'

export const chatRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/chat',
  component: ChatPage,
})

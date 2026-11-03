import { createRoute } from '@tanstack/react-router'
import { HomePage } from '@/features/home'
import { appLayoutRoute } from './app-layout-route'

export const homeRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/',
  component: HomePage,
})

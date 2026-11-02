import { createRoute, redirect } from '@tanstack/react-router'
import { isAdminAuthenticated, LoginPage } from '@/features/auth'
import { rootRoute } from './root-route'

interface LoginSearch {
  readonly redirect?: string
}

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  beforeLoad: () => {
    if (isAdminAuthenticated()) {
      throw redirect({ to: '/tables' })
    }
  },
  component: LoginPage,
})

import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from './root-route'

export const restaurantsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/restaurants',
  component: lazyRouteComponent(
    () => import('@/features/restaurants/components/restaurants-page'),
    'RestaurantsPage',
  ),
})

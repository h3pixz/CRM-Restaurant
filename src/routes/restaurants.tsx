import { createRoute } from '@tanstack/react-router'
import { RestaurantsPage } from '@/features/restaurants'
import { rootRoute } from './root-route'

export const restaurantsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/restaurants',
  component: RestaurantsPage,
})

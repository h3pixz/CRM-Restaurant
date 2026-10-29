import { useMemo, useState } from 'react'
import { CUISINE_FILTERS } from '../data/restaurants'
import type { Restaurant } from '../types/restaurant'

const INITIAL_CUISINES: readonly string[] = [...CUISINE_FILTERS]

export function useRestaurantFilters(restaurants: readonly Restaurant[]) {
  const [activeCuisines, setActiveCuisines] = useState<readonly string[]>(INITIAL_CUISINES)
  const [search, setSearch] = useState('')

  const visibleRestaurants = useMemo(() => {
    const query = search.trim().toLowerCase()

    return restaurants.filter((restaurant) => {
      const matchesCuisine =
        activeCuisines.length === 0 ||
        restaurant.cuisines.some((cuisine) => activeCuisines.includes(cuisine))

      const matchesSearch =
        query === '' ||
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.city.toLowerCase().includes(query) ||
        restaurant.cuisines.some((cuisine) => cuisine.toLowerCase().includes(query))

      return matchesCuisine && matchesSearch
    })
  }, [restaurants, activeCuisines, search])

  function toggleCuisine(cuisine: string) {
    setActiveCuisines((current) =>
      current.includes(cuisine)
        ? current.filter((item) => item !== cuisine)
        : [...current, cuisine],
    )
  }

  return {
    activeCuisines,
    search,
    setSearch,
    toggleCuisine,
    visibleRestaurants,
  }
}

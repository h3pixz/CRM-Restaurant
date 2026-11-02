import { useState } from 'react'
import { useRestaurantsQuery } from '../api'
import { useRestaurantFilters } from '../hooks/use-restaurant-filters'
import type { OrderMode, Restaurant } from '../types/restaurant'
import { RestaurantsError, RestaurantsLoading } from './restaurants-feedback'
import { RestaurantsHeader } from './restaurants-header'
import { RestaurantsMap } from './restaurants-map'
import { RestaurantsSidebar } from './restaurants-sidebar'

const EMPTY_RESTAURANTS: readonly Restaurant[] = []

export function RestaurantsPage() {
  const [mode, setMode] = useState<OrderMode>('delivery')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const restaurantsQuery = useRestaurantsQuery()

  const restaurants = restaurantsQuery.data ?? EMPTY_RESTAURANTS

  const { activeCuisines, search, setSearch, toggleCuisine, visibleRestaurants } =
    useRestaurantFilters(restaurants)

  function handleSelect(id: string) {
    setSelectedId(id)
    document
      .getElementById(`restaurant-card-${id}`)
      ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }

  const emptyMessage =
    restaurants.length === 0
      ? 'No restaurants yet. Add documents to the "restaurants" collection in Firestore.'
      : 'No restaurants match the current filters.'

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#f8f9fa] text-slate-800 selection:bg-brand selection:text-white">
      <RestaurantsHeader
        mode={mode}
        onModeChange={setMode}
        search={search}
        onSearchChange={setSearch}
      />

      <main className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <section
          aria-label="Restaurant map"
          className="relative isolate order-1 h-[42%] min-h-[220px] shrink-0 overflow-hidden border-b border-gray-200 lg:order-2 lg:h-auto lg:min-h-0 lg:flex-1 lg:border-b-0"
        >
          <RestaurantsMap
            restaurants={visibleRestaurants}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </section>

        {restaurantsQuery.isPending && <RestaurantsLoading />}

        {restaurantsQuery.isError && (
          <RestaurantsError
            message={
              restaurantsQuery.error instanceof Error
                ? restaurantsQuery.error.message
                : 'Unexpected error while loading restaurants.'
            }
            onRetry={() => {
              void restaurantsQuery.refetch()
            }}
          />
        )}

        {restaurantsQuery.isSuccess && (
          <RestaurantsSidebar
            restaurants={visibleRestaurants}
            activeCuisines={activeCuisines}
            onToggleCuisine={toggleCuisine}
            selectedId={selectedId}
            onSelect={handleSelect}
            emptyMessage={emptyMessage}
          />
        )}
      </main>
    </div>
  )
}

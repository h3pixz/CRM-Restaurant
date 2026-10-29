import { useState } from 'react'
import { RESTAURANTS } from '../data/restaurants'
import { useRestaurantFilters } from '../hooks/use-restaurant-filters'
import type { OrderMode } from '../types/restaurant'
import { RestaurantsHeader } from './restaurants-header'
import { RestaurantsMap } from './restaurants-map'
import { RestaurantsSidebar } from './restaurants-sidebar'

export function RestaurantsPage() {
  const [mode, setMode] = useState<OrderMode>('delivery')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { activeCuisines, search, setSearch, toggleCuisine, visibleRestaurants } =
    useRestaurantFilters(RESTAURANTS)

  function handleSelect(id: string) {
    setSelectedId(id)
    document
      .getElementById(`restaurant-card-${id}`)
      ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }

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

        <RestaurantsSidebar
          restaurants={visibleRestaurants}
          activeCuisines={activeCuisines}
          onToggleCuisine={toggleCuisine}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </main>
    </div>
  )
}

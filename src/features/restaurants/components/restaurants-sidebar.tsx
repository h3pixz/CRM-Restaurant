import { Filter, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CUISINE_FILTERS } from '../data/restaurants'
import type { Restaurant } from '../types/restaurant'
import { RestaurantCard } from './restaurant-card'

interface RestaurantsSidebarProps {
  readonly restaurants: readonly Restaurant[]
  readonly activeCuisines: readonly string[]
  readonly onToggleCuisine: (cuisine: string) => void
  readonly selectedId: string | null
  readonly onSelect: (id: string) => void
}

export function RestaurantsSidebar({
  restaurants,
  activeCuisines,
  onToggleCuisine,
  selectedId,
  onSelect,
}: RestaurantsSidebarProps) {
  return (
    <aside className="order-2 flex min-h-0 flex-1 flex-col border-t border-gray-200/90 bg-[#fbfbfc] lg:order-1 lg:w-[365px] lg:flex-none lg:border-t-0 lg:border-r">
      <div className="shrink-0 border-b border-gray-100 bg-white/70 p-3 pb-2">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200/70 bg-gray-100/70 px-2.5 py-1.5">
          <Filter aria-hidden="true" className="size-4 shrink-0 text-brand" strokeWidth={2} />

          <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-700">
            {CUISINE_FILTERS.map((cuisine) => {
              const isActive = activeCuisines.includes(cuisine)

              return (
                <button
                  key={cuisine}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onToggleCuisine(cuisine)}
                  className={cn(
                    'inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none',
                    isActive
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-500 hover:bg-gray-200/60',
                  )}
                >
                  {cuisine}
                  {isActive && <X aria-hidden="true" className="size-2.5 text-gray-400" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="restaurant-scroll flex-1 space-y-3 overflow-y-auto p-3">
        {restaurants.length === 0 ? (
          <p className="px-2 py-12 text-center text-sm text-gray-500">
            No restaurants match the current filters.
          </p>
        ) : (
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isSelected={restaurant.id === selectedId}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </aside>
  )
}

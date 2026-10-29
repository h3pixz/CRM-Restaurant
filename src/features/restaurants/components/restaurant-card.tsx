import { cn } from '@/lib/utils'
import type { Restaurant } from '../types/restaurant'

interface RestaurantCardProps {
  readonly restaurant: Restaurant
  readonly isSelected: boolean
  readonly onSelect: (id: string) => void
}

export function RestaurantCard({ restaurant, isSelected, onSelect }: RestaurantCardProps) {
  const hasImages = restaurant.images.length > 0

  return (
    <article
      id={`restaurant-card-${restaurant.id}`}
      className={cn(
        'group relative rounded-xl border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition',
        isSelected
          ? 'border-brand/60 ring-2 ring-brand/30'
          : 'border-gray-200/80 hover:shadow-md',
      )}
    >
      <button
        type="button"
        aria-pressed={isSelected}
        aria-label={`Show ${restaurant.name} on the map`}
        onClick={() => onSelect(restaurant.id)}
        className="absolute inset-0 z-10 rounded-xl focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-inset focus-visible:outline-none"
      />

      <div className={hasImages ? 'p-3' : 'px-3.5 py-4'}>
        {hasImages && (
          <div className="mb-2.5 grid grid-cols-4 gap-1.5">
            {restaurant.images.slice(0, 4).map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`${restaurant.name} dish ${index + 1}`}
                loading="lazy"
                className="h-14 w-full rounded-md bg-gray-100 object-cover"
              />
            ))}
          </div>
        )}

        <div className="mb-0.5 flex items-baseline justify-between gap-2">
          <h2 className="text-[15px] leading-tight font-bold text-gray-900">{restaurant.name}</h2>
          <span className="shrink-0 text-xs font-normal text-gray-400">
            {restaurant.distanceFt.toLocaleString('en-US')}ft
          </span>
        </div>

        <p className="text-xs font-normal text-gray-500">
          {restaurant.city} • {restaurant.cuisines.join(' • ')} •{' '}
          {'$'.repeat(restaurant.priceLevel)}
        </p>
      </div>
    </article>
  )
}

import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { OrderMode } from '../types/restaurant'

const MODES: readonly { readonly value: OrderMode; readonly label: string }[] = [
  { value: 'delivery', label: 'Delivery' },
  { value: 'pickup', label: 'Pickup' },
]

interface RestaurantsHeaderProps {
  readonly mode: OrderMode
  readonly onModeChange: (mode: OrderMode) => void
  readonly search: string
  readonly onSearchChange: (search: string) => void
}

const ICON_BUTTON_CLASS =
  'flex size-9 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none'

export function RestaurantsHeader({
  mode,
  onModeChange,
  search,
  onSearchChange,
}: RestaurantsHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="relative z-20 flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-gray-200 bg-white px-4 py-2 shadow-sm sm:h-14 sm:flex-nowrap sm:px-6 sm:py-0">
      <h1 className="order-1 truncate text-[11px] font-semibold tracking-[0.22em] text-gray-700 uppercase select-none sm:text-sm">
        Best Restaurants
      </h1>

      <div className="order-3 flex w-full shrink-0 items-center justify-center rounded-md border border-gray-200/80 bg-gray-100/90 p-0.5 text-[11px] font-medium tracking-wide sm:order-2 sm:w-auto">
        {MODES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={mode === value}
            onClick={() => onModeChange(value)}
            className={cn(
              'rounded px-2.5 py-1 uppercase transition-colors focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none sm:px-3.5',
              mode === value
                ? 'bg-white font-semibold text-brand shadow-sm'
                : 'text-gray-500 hover:text-gray-800',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="order-2 flex shrink-0 items-center gap-2.5 sm:order-3">
        {isSearchOpen ? (
          <div className="flex h-9 items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-2.5">
            <Search aria-hidden="true" className="size-4 shrink-0 text-gray-400" />
            <input
              autoFocus
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setIsSearchOpen(false)
                }
              }}
              placeholder="Search restaurants"
              aria-label="Search restaurants"
              className="w-28 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:w-52"
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={() => {
                setIsSearchOpen(false)
                onSearchChange('')
              }}
              className="text-gray-400 transition-colors hover:text-gray-700 focus-visible:outline-none"
            >
              <X aria-hidden="true" className="size-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
            className={cn(ICON_BUTTON_CLASS, 'bg-gray-100 text-gray-600 hover:bg-gray-200')}
          >
            <Search aria-hidden="true" className="size-4" strokeWidth={2} />
          </button>
        )}

        <button
          type="button"
          aria-label="Shopping cart"
          className={cn(ICON_BUTTON_CLASS, 'bg-brand text-white shadow hover:bg-brand-hover')}
        >
          <ShoppingBag aria-hidden="true" className="size-4" strokeWidth={2} />
        </button>

        <button
          type="button"
          aria-label="Menu"
          className={cn(ICON_BUTTON_CLASS, 'text-gray-600 hover:bg-gray-100')}
        >
          <Menu aria-hidden="true" className="size-5" strokeWidth={2} />
        </button>
      </div>
    </header>
  )
}

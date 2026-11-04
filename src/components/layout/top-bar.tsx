import { Bell, CircleUserRound, Menu } from 'lucide-react'

interface TopBarProps {
  readonly title: string
  readonly userName: string
  readonly onOpenNav: () => void
}

export function TopBar({ title, userName, onOpenNav }: TopBarProps) {
  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-1">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onOpenNav}
          className="-ml-2 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-neutral-700 transition-colors hover:bg-neutral-200/60 hover:text-black focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:hidden"
        >
          <Menu aria-hidden="true" className="size-5" strokeWidth={1.8} />
        </button>

        <h2 className="truncate text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
          {title}
        </h2>
      </div>

      <div className="flex shrink-0 items-center gap-4 text-neutral-800 sm:gap-6">
        <button
          type="button"
          aria-label="Notifications"
          className="-m-2 flex size-11 items-center justify-center rounded-md text-neutral-700 transition-colors hover:bg-neutral-200/60 hover:text-black focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Bell aria-hidden="true" className="size-5" strokeWidth={1.8} />
        </button>

        <button
          type="button"
          className="group flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <CircleUserRound
            aria-hidden="true"
            className="size-5 text-neutral-700 transition-colors group-hover:text-black"
            strokeWidth={1.8}
          />
          <span className="hidden text-sm font-medium text-neutral-800 transition-colors group-hover:text-black sm:inline">
            {userName}
          </span>
        </button>
      </div>
    </header>
  )
}

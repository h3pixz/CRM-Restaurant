import { Bell, CircleUserRound, Menu } from 'lucide-react'

const ADMIN_USER_NAME = 'Okechukwu Andrey'

interface AdminTopBarProps {
  readonly onOpenNav: () => void
}

export function AdminTopBar({ onOpenNav }: AdminTopBarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 text-neutral-800">
      <button
        type="button"
        aria-label="Open navigation"
        onClick={onOpenNav}
        className="-ml-2 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-neutral-700 transition-colors hover:bg-neutral-200/60 hover:text-black focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" strokeWidth={1.7} />
      </button>

      <div className="flex items-center gap-6">
        <button
          type="button"
          aria-label="Notifications"
          className="-m-2 flex size-11 items-center justify-center rounded-md text-neutral-700 transition-colors hover:bg-neutral-200/60 hover:text-black focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Bell aria-hidden="true" className="size-5" strokeWidth={1.7} />
        </button>

        <button
          type="button"
          className="group flex min-h-11 items-center gap-2.5 rounded-md px-1 text-sm font-medium text-neutral-800 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <CircleUserRound
            aria-hidden="true"
            className="size-5 text-neutral-700 transition-colors group-hover:text-black"
            strokeWidth={1.8}
          />
          <span className="hidden transition-colors group-hover:text-black sm:inline">
            {ADMIN_USER_NAME}
          </span>
        </button>
      </div>
    </header>
  )
}

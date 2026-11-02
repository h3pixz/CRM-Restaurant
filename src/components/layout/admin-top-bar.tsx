import { Bell, CircleUserRound } from 'lucide-react'

const ADMIN_USER_NAME = 'Okechukwu Andrey'

export function AdminTopBar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-end gap-6 text-neutral-800">
      <button
        type="button"
        aria-label="Notifications"
        className="rounded-md text-neutral-700 transition-colors hover:text-black focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <Bell aria-hidden="true" className="size-5" strokeWidth={1.7} />
      </button>

      <button
        type="button"
        className="group flex items-center gap-2.5 rounded-md text-sm font-medium text-neutral-800 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <CircleUserRound
          aria-hidden="true"
          className="size-5 text-neutral-700 transition-colors group-hover:text-black"
          strokeWidth={1.8}
        />
        <span className="transition-colors group-hover:text-black">{ADMIN_USER_NAME}</span>
      </button>
    </header>
  )
}

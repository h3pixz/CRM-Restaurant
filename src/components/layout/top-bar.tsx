import { Bell, CircleUserRound } from 'lucide-react'

interface TopBarProps {
  title: string
  userName: string
}

export function TopBar({ title, userName }: TopBarProps) {
  return (
    <header className="mb-8 flex items-center justify-between">
      <h2 className="text-2xl font-bold tracking-tight text-neutral-900">{title}</h2>

      <div className="flex items-center gap-6 text-neutral-800">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-md text-neutral-700 transition-colors hover:text-black focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Bell aria-hidden="true" className="size-5" strokeWidth={1.8} />
        </button>

        <button
          type="button"
          className="group flex items-center gap-2 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <CircleUserRound
            aria-hidden="true"
            className="size-5 text-neutral-700 transition-colors group-hover:text-black"
            strokeWidth={1.8}
          />
          <span className="text-sm font-medium text-neutral-800 transition-colors group-hover:text-black">
            {userName}
          </span>
        </button>
      </div>
    </header>
  )
}

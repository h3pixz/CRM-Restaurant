import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ChatConnectionStatus } from '../types/chat'

interface StatusMeta {
  readonly label: string
  readonly dotClassName: string
  readonly badgeClassName: string
}

const STATUS_META: Record<ChatConnectionStatus, StatusMeta> = {
  idle: {
    label: 'Idle',
    dotClassName: 'bg-neutral-400',
    badgeClassName: 'border-neutral-200 bg-neutral-100 text-neutral-600',
  },
  connecting: {
    label: 'Connecting',
    dotClassName: 'animate-pulse bg-amber-500',
    badgeClassName: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  connected: {
    label: 'Connected',
    dotClassName: 'bg-emerald-500',
    badgeClassName: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  reconnecting: {
    label: 'Reconnecting',
    dotClassName: 'animate-pulse bg-amber-500',
    badgeClassName: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  disconnected: {
    label: 'Disconnected',
    dotClassName: 'bg-neutral-400',
    badgeClassName: 'border-neutral-200 bg-neutral-100 text-neutral-600',
  },
  error: {
    label: 'Connection error',
    dotClassName: 'bg-red-500',
    badgeClassName: 'border-red-200 bg-red-50 text-red-700',
  },
}

interface ChatStatusBadgeProps {
  readonly status: ChatConnectionStatus
}

export function ChatStatusBadge({ status }: ChatStatusBadgeProps) {
  const meta = STATUS_META[status]

  return (
    <Badge variant="outline" role="status" className={cn('gap-1.5', meta.badgeClassName)}>
      <span aria-hidden="true" className={cn('size-1.5 rounded-full', meta.dotClassName)} />
      {meta.label}
    </Badge>
  )
}

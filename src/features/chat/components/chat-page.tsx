import { RotateCw, Unplug } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useChatSocket } from '../api'
import { ChatComposer } from './chat-composer'
import { ChatMessageList } from './chat-message-list'
import { ChatStatusBadge } from './chat-status-badge'

export function ChatPage() {
  const { status, messages, error, sendMessage, reconnect, disconnect } = useChatSocket()
  const isConnected = status === 'connected'
  const isBusy = status === 'connecting' || status === 'reconnecting'

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm max-lg:-mx-4 max-lg:-mb-5 max-lg:rounded-none max-lg:border-x-0 max-lg:shadow-none">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-neutral-900">Team chat</h3>
          <p className="text-xs text-muted-foreground">
            Messages are echoed by wss://ws.ifelse.io
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ChatStatusBadge status={status} />
          {isConnected ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={disconnect}
              className="h-11 px-4 lg:h-8 lg:px-3"
            >
              <Unplug aria-hidden="true" />
              Disconnect
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={reconnect}
              disabled={isBusy}
              className="h-11 px-4 lg:h-8 lg:px-3"
            >
              <RotateCw aria-hidden="true" className={isBusy ? 'animate-spin' : undefined} />
              {isBusy ? 'Connecting…' : 'Reconnect'}
            </Button>
          )}
        </div>
      </header>

      {error ? (
        <p
          role={status === 'error' ? 'alert' : 'status'}
          className="border-b border-amber-200 bg-amber-50 px-5 py-2 text-xs text-amber-800"
        >
          {error}
        </p>
      ) : null}

      <ChatMessageList messages={messages} />
      <ChatComposer disabled={!isConnected} onSend={sendMessage} />
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { ChatMessage } from '../types/chat'

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
})

interface ChatMessageListProps {
  readonly messages: readonly ChatMessage[]
}

export function ChatMessageList({ messages }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length])

  return (
    <div
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 py-5"
    >
      {messages.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-center">
          <p className="max-w-xs text-sm text-muted-foreground">
            No messages yet. Send the first one to start the conversation.
          </p>
        </div>
      ) : (
        messages.map((message) => {
          const isSelf = message.author === 'self'

          return (
            <article
              key={message.id}
              className={cn(
                'flex max-w-[85%] flex-col gap-1',
                isSelf ? 'items-end self-end' : 'items-start self-start',
              )}
            >
              <span className="px-1 text-[11px] font-medium text-muted-foreground">
                {isSelf ? 'You' : 'Server'} · {timeFormatter.format(message.createdAt)}
              </span>
              <p
                className={cn(
                  'rounded-2xl px-4 py-2.5 text-sm break-words whitespace-pre-wrap',
                  isSelf
                    ? 'rounded-br-md bg-primary text-primary-foreground'
                    : 'rounded-bl-md bg-muted text-foreground',
                )}
              >
                {message.text}
              </p>
            </article>
          )
        })
      )}
      <div ref={bottomRef} />
    </div>
  )
}

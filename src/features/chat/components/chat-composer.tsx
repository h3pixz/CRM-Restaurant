import { useState, type FormEvent } from 'react'
import { SendHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ChatComposerProps {
  readonly disabled: boolean
  readonly onSend: (text: string) => boolean
}

export function ChatComposer({ disabled, onSend }: ChatComposerProps) {
  const [draft, setDraft] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (onSend(draft)) {
      setDraft('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 border-t border-border px-5 py-4"
    >
      <label htmlFor="chat-message" className="sr-only">
        Message
      </label>
      <Input
        id="chat-message"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder={disabled ? 'Connect to send messages' : 'Type a message…'}
        disabled={disabled}
        autoComplete="off"
        className="h-11 lg:h-10"
      />
      <Button
        type="submit"
        size="icon-lg"
        disabled={disabled || draft.trim().length === 0}
        aria-label="Send message"
        className="size-11"
      >
        <SendHorizontal aria-hidden="true" />
      </Button>
    </form>
  )
}

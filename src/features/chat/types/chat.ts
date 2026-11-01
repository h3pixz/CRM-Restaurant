export type ChatConnectionStatus =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'disconnected'
  | 'error'

export type ChatMessageAuthor = 'self' | 'server'

export interface ChatMessage {
  readonly id: string
  readonly author: ChatMessageAuthor
  readonly text: string
  readonly createdAt: number
}

export interface ChatState {
  readonly status: ChatConnectionStatus
  readonly messages: readonly ChatMessage[]
  readonly error: string | null
}

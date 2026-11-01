import { useEffect, useSyncExternalStore } from 'react'
import type { ChatState } from '../types/chat'
import { getChatSocket } from './chat-socket'

export interface UseChatSocketResult extends ChatState {
  readonly sendMessage: (text: string) => boolean
  readonly reconnect: () => void
  readonly disconnect: () => void
}

export function useChatSocket(): UseChatSocketResult {
  const socket = getChatSocket()
  const state = useSyncExternalStore(socket.subscribe, socket.getSnapshot, socket.getSnapshot)

  useEffect(() => {
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [socket])

  return {
    status: state.status,
    messages: state.messages,
    error: state.error,
    sendMessage: socket.sendMessage,
    reconnect: socket.reconnect,
    disconnect: socket.disconnect,
  }
}

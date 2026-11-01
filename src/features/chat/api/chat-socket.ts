import type { ChatMessage, ChatMessageAuthor, ChatState } from '../types/chat'

export const CHAT_URL = 'wss://ws.ifelse.io'

const RECONNECT_BASE_DELAY_MS = 1_000
const RECONNECT_MAX_DELAY_MS = 10_000
const RECONNECT_MAX_ATTEMPTS = 5
const MAX_MESSAGES = 200

export class ChatSocket {
  private readonly url: string
  private state: ChatState = { status: 'idle', messages: [], error: null }
  private readonly listeners = new Set<() => void>()
  private socket: WebSocket | null = null
  private reconnectAttempt = 0
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null
  private manuallyClosed = false

  constructor(url: string) {
    this.url = url
  }

  readonly subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  readonly getSnapshot = (): ChatState => this.state

  connect = (): void => {
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)
    ) {
      return
    }

    this.clearReconnectTimer()
    this.manuallyClosed = false
    this.reconnectAttempt = 0
    this.setState({ status: 'connecting', error: null })
    this.open()
  }

  reconnect = (): void => {
    this.closeSocket()
    this.connect()
  }

  disconnect = (): void => {
    this.manuallyClosed = true
    this.clearReconnectTimer()
    this.reconnectAttempt = 0
    this.closeSocket()
    this.setState({ status: 'disconnected', error: null })
  }

  sendMessage = (text: string): boolean => {
    const trimmed = text.trim()
    const socket = this.socket

    if (!trimmed || !socket || socket.readyState !== WebSocket.OPEN) {
      return false
    }

    socket.send(trimmed)
    this.addMessage('self', trimmed)
    return true
  }

  private open(): void {
    const socket = new WebSocket(this.url)
    this.socket = socket

    socket.onopen = () => {
      if (this.socket !== socket) {
        return
      }

      this.reconnectAttempt = 0
      this.setState({ status: 'connected', error: null })
    }

    socket.onmessage = (event: MessageEvent<unknown>) => {
      if (this.socket !== socket || typeof event.data !== 'string') {
        return
      }

      const text = event.data.trim()
      if (text) {
        this.addMessage('server', text)
      }
    }

    socket.onerror = () => {
      if (this.socket !== socket) {
        return
      }

      this.setState({ status: 'error', error: 'WebSocket connection error.' })
    }

    socket.onclose = () => {
      if (this.socket !== socket) {
        return
      }

      this.socket = null

      if (this.manuallyClosed) {
        this.setState({ status: 'disconnected', error: null })
        return
      }

      this.scheduleReconnect()
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempt >= RECONNECT_MAX_ATTEMPTS) {
      this.setState({
        status: 'disconnected',
        error: 'Unable to reconnect. Check your connection and try again.',
      })
      return
    }

    this.reconnectAttempt += 1
    const delay = Math.min(
      RECONNECT_BASE_DELAY_MS * 2 ** (this.reconnectAttempt - 1),
      RECONNECT_MAX_DELAY_MS,
    )

    this.setState({
      status: 'reconnecting',
      error: `Connection lost. Reconnecting in ${Math.round(delay / 1_000)}s…`,
    })

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null
      this.open()
    }, delay)
  }

  private closeSocket(): void {
    const socket = this.socket
    this.socket = null

    if (!socket) {
      return
    }

    socket.onopen = null
    socket.onmessage = null
    socket.onerror = null
    socket.onclose = null
    socket.close()
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
  }

  private addMessage(author: ChatMessageAuthor, text: string): void {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      author,
      text,
      createdAt: Date.now(),
    }

    this.setState({
      messages: [...this.state.messages, message].slice(-MAX_MESSAGES),
    })
  }

  private setState(patch: Partial<ChatState>): void {
    this.state = { ...this.state, ...patch }
    this.listeners.forEach((listener) => listener())
  }
}

let chatSocket: ChatSocket | null = null

export function getChatSocket(): ChatSocket {
  chatSocket ??= new ChatSocket(CHAT_URL)
  return chatSocket
}

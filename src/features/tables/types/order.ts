export const ORDER_CATEGORIES = ['appetizer', 'main', 'drinks', 'dessert'] as const

export type OrderCategory = (typeof ORDER_CATEGORIES)[number]

export const ORDER_CATEGORY_LABELS: Record<OrderCategory, string> = {
  appetizer: 'Appetizers',
  main: 'Main courses',
  drinks: 'Drinks',
  dessert: 'Desserts',
}

export interface OrderItem {
  readonly id: string
  readonly name: string
  readonly category: OrderCategory
  readonly price: number
  readonly quantity: number
  readonly imageUrl?: string
  readonly note?: string
}

export interface TableOrder {
  readonly tableId: string
  readonly items: readonly OrderItem[]
}

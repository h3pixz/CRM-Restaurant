export type TableStatus = 'free' | 'occupied' | 'reserved'

export type TableFilter = 'all' | TableStatus

export interface RestaurantTable {
  readonly id: string
  readonly label: string
  readonly status: TableStatus
  readonly reservedAt?: string
}

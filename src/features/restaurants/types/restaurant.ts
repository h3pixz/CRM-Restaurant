export type OrderMode = 'delivery' | 'pickup'

export interface GeoPoint {
  readonly lat: number
  readonly lng: number
}

export type LabelSide = 'top' | 'bottom' | 'left' | 'right'

export interface Restaurant {
  readonly id: string
  readonly name: string
  readonly city: string
  readonly cuisines: readonly string[]
  readonly priceLevel: 1 | 2 | 3
  readonly distanceFt: number
  readonly images: readonly string[]
  readonly location: GeoPoint
  readonly labelSide: LabelSide
}

import type { GeoPoint, LabelSide, Restaurant } from '../types/restaurant'

type RestaurantDocument = Record<string, unknown>

const LABEL_SIDES: readonly LabelSide[] = ['top', 'bottom', 'left', 'right']

function isRecord(value: unknown): value is RestaurantDocument {
  return typeof value === 'object' && value !== null
}

function invalidField(restaurantId: string, field: string): Error {
  return new Error(`Restaurant "${restaurantId}" has an invalid "${field}" field`)
}

function readString(doc: RestaurantDocument, field: string, restaurantId: string): string {
  const value = doc[field]

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw invalidField(restaurantId, field)
  }

  return value
}

function readNumber(doc: RestaurantDocument, field: string, restaurantId: string): number {
  const value = doc[field]

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw invalidField(restaurantId, field)
  }

  return value
}

function readStringArray(
  doc: RestaurantDocument,
  field: string,
  restaurantId: string,
): readonly string[] {
  const value = doc[field]

  if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string')) {
    throw invalidField(restaurantId, field)
  }

  return value
}

function readCuisines(doc: RestaurantDocument, restaurantId: string): readonly string[] {
  const cuisines = readStringArray(doc, 'cuisines', restaurantId)

  if (cuisines.length === 0) {
    throw invalidField(restaurantId, 'cuisines')
  }

  return cuisines
}

function readPriceLevel(doc: RestaurantDocument, restaurantId: string): Restaurant['priceLevel'] {
  const value = readNumber(doc, 'priceLevel', restaurantId)

  if (value !== 1 && value !== 2 && value !== 3) {
    throw invalidField(restaurantId, 'priceLevel')
  }

  return value
}

function readLocation(doc: RestaurantDocument, restaurantId: string): GeoPoint {
  const value = doc.location

  if (!isRecord(value)) {
    throw invalidField(restaurantId, 'location')
  }

  return {
    lat: readNumber(value, 'lat', restaurantId),
    lng: readNumber(value, 'lng', restaurantId),
  }
}

function isLabelSide(value: unknown): value is LabelSide {
  return typeof value === 'string' && LABEL_SIDES.some((side) => side === value)
}

function readLabelSide(doc: RestaurantDocument, restaurantId: string): LabelSide {
  const value = doc.labelSide

  if (!isLabelSide(value)) {
    throw invalidField(restaurantId, 'labelSide')
  }

  return value
}

export function mapRestaurantDocument(id: string, data: unknown): Restaurant {
  if (!isRecord(data)) {
    throw new Error(`Restaurant "${id}" document data is not an object`)
  }

  return {
    id,
    name: readString(data, 'name', id),
    city: readString(data, 'city', id),
    cuisines: readCuisines(data, id),
    priceLevel: readPriceLevel(data, id),
    distanceFt: readNumber(data, 'distanceFt', id),
    images: readStringArray(data, 'images', id),
    location: readLocation(data, id),
    labelSide: readLabelSide(data, id),
  }
}

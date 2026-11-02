import { ORDER_CATEGORIES, type OrderCategory, type OrderItem, type TableOrder } from '../types/order'

type OrderDocument = Record<string, unknown>

function isRecord(value: unknown): value is OrderDocument {
  return typeof value === 'object' && value !== null
}

function invalidField(tableId: string, field: string): Error {
  return new Error(`Order for table "${tableId}" has an invalid "${field}" field`)
}

function readString(doc: OrderDocument, field: string, tableId: string): string {
  const value = doc[field]

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw invalidField(tableId, field)
  }

  return value
}

function readNumber(doc: OrderDocument, field: string, tableId: string): number {
  const value = doc[field]

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw invalidField(tableId, field)
  }

  return value
}

function readPositiveInteger(doc: OrderDocument, field: string, tableId: string): number {
  const value = readNumber(doc, field, tableId)

  if (!Number.isInteger(value) || value < 1) {
    throw invalidField(tableId, field)
  }

  return value
}

function readOptionalString(
  doc: OrderDocument,
  field: string,
  tableId: string,
): string | undefined {
  const value = doc[field]

  if (value === undefined || value === null) {
    return undefined
  }

  if (typeof value !== 'string') {
    throw invalidField(tableId, field)
  }

  return value
}

function isOrderCategory(value: unknown): value is OrderCategory {
  return (
    typeof value === 'string' &&
    ORDER_CATEGORIES.some((category) => category === value)
  )
}

function readCategory(doc: OrderDocument, tableId: string): OrderCategory {
  const value = doc.category

  if (!isOrderCategory(value)) {
    throw invalidField(tableId, 'category')
  }

  return value
}

function mapOrderItem(value: unknown, index: number, tableId: string): OrderItem {
  if (!isRecord(value)) {
    throw new Error(`Order for table "${tableId}" has an invalid "items[${index}]" entry`)
  }

  return {
    id: `${tableId}-${index}`,
    name: readString(value, 'name', tableId),
    category: readCategory(value, tableId),
    price: readNumber(value, 'price', tableId),
    quantity: readPositiveInteger(value, 'quantity', tableId),
    imageUrl: readOptionalString(value, 'imageUrl', tableId),
    note: readOptionalString(value, 'note', tableId),
  }
}

export function mapOrderDocument(tableId: string, data: unknown): TableOrder {
  if (!isRecord(data)) {
    throw new Error(`Order for table "${tableId}" document data is not an object`)
  }

  const items = data.items

  if (!Array.isArray(items)) {
    throw invalidField(tableId, 'items')
  }

  return {
    tableId,
    items: items.map((item, index) => mapOrderItem(item, index, tableId)),
  }
}

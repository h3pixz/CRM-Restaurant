import type { RestaurantTable, TableStatus } from '../types/table'

type TableDocument = Record<string, unknown>

function isRecord(value: unknown): value is TableDocument {
  return typeof value === 'object' && value !== null
}

function invalidField(tableId: string, field: string): Error {
  return new Error(`Table "${tableId}" has an invalid "${field}" field`)
}

function readLabel(doc: TableDocument, tableId: string): string {
  const value = doc.label

  if (typeof value === 'string' && value.trim().length > 0) {
    return value
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  throw invalidField(tableId, 'label')
}

function readStatus(doc: TableDocument, tableId: string): TableStatus {
  const value = doc.status

  if (value === 'free' || value === 'occupied' || value === 'reserved') {
    return value
  }

  throw invalidField(tableId, 'status')
}

function readOptionalString(
  doc: TableDocument,
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

export function mapTableDocument(id: string, data: unknown): RestaurantTable {
  if (!isRecord(data)) {
    throw new Error(`Table "${id}" document data is not an object`)
  }

  return {
    id,
    label: readLabel(data, id),
    status: readStatus(data, id),
    reservedAt: readOptionalString(data, 'reservedAt', id),
  }
}

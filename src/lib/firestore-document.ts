import { Timestamp } from 'firebase/firestore'

export type FirestoreDocument = Record<string, unknown>

export function isRecord(value: unknown): value is FirestoreDocument {
  return typeof value === 'object' && value !== null
}

function invalidField(context: string, field: string): Error {
  return new Error(`${context} has an invalid "${field}" field`)
}

export function readString(
  document: FirestoreDocument,
  field: string,
  context: string,
): string {
  const value = document[field]

  if (typeof value !== 'string') {
    throw invalidField(context, field)
  }

  return value
}

export function readOptionalString(
  document: FirestoreDocument,
  field: string,
  context: string,
): string | undefined {
  const value = document[field]

  if (value === undefined || value === null) {
    return undefined
  }

  if (typeof value !== 'string') {
    throw invalidField(context, field)
  }

  return value
}

export function readNumber(
  document: FirestoreDocument,
  field: string,
  context: string,
): number {
  const value = document[field]

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw invalidField(context, field)
  }

  return value
}

export function readBoolean(
  document: FirestoreDocument,
  field: string,
  context: string,
): boolean {
  const value = document[field]

  if (typeof value !== 'boolean') {
    throw invalidField(context, field)
  }

  return value
}

export function readEnum<T extends string>(
  document: FirestoreDocument,
  field: string,
  allowedValues: readonly T[],
  context: string,
): T {
  const value = document[field]

  if (typeof value !== 'string' || !allowedValues.some((allowed) => allowed === value)) {
    throw invalidField(context, field)
  }

  return value as T
}

export function readDate(
  document: FirestoreDocument,
  field: string,
  context: string,
): string {
  const value = document[field]

  if (value instanceof Timestamp) {
    return value.toDate().toISOString().slice(0, 10)
  }

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    const parsed = new Date(value)

    if (!Number.isNaN(parsed.getTime())) {
      return value.slice(0, 10)
    }
  }

  throw invalidField(context, field)
}

import { Timestamp } from 'firebase/firestore'
import type { Employee, ShiftType } from '../types/employee'

type EmployeeDocument = Record<string, unknown>

function isRecord(value: unknown): value is EmployeeDocument {
  return typeof value === 'object' && value !== null
}

function invalidField(employeeId: string, field: string): Error {
  return new Error(`Employee "${employeeId}" has an invalid "${field}" field`)
}

function readString(doc: EmployeeDocument, field: string, employeeId: string): string {
  const value = doc[field]
  if (typeof value !== 'string') {
    throw invalidField(employeeId, field)
  }
  return value
}

function readOptionalString(doc: EmployeeDocument, field: string, employeeId: string): string {
  const value = doc[field]
  if (value === undefined || value === null) {
    return ''
  }
  if (typeof value !== 'string') {
    throw invalidField(employeeId, field)
  }
  return value
}

function readBoolean(doc: EmployeeDocument, field: string, employeeId: string): boolean {
  const value = doc[field]
  if (typeof value !== 'boolean') {
    throw invalidField(employeeId, field)
  }
  return value
}

function readNumber(doc: EmployeeDocument, field: string, employeeId: string): number {
  const value = doc[field]
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw invalidField(employeeId, field)
  }
  return value
}

function readShift(doc: EmployeeDocument, employeeId: string): ShiftType {
  const value = doc.shift
  if (value !== 'A' && value !== 'B') {
    throw invalidField(employeeId, 'shift')
  }
  return value
}

function readDate(doc: EmployeeDocument, field: string, employeeId: string): string {
  const value = doc[field]

  if (value instanceof Timestamp) {
    return value.toDate().toISOString().slice(0, 10)
  }

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) {
      return value.slice(0, 10)
    }
  }

  throw invalidField(employeeId, field)
}

export function mapEmployeeDocument(id: string, data: unknown): Employee {
  if (!isRecord(data)) {
    throw new Error(`Employee "${id}" document data is not an object`)
  }

  return {
    id,
    name: readString(data, 'name', id),
    email: readString(data, 'email', id),
    avatarUrl: readOptionalString(data, 'avatarUrl', id),
    shift: readShift(data, id),
    onShift: readBoolean(data, 'onShift', id),
    employmentDate: readDate(data, 'employmentDate', id),
    billingDate: readDate(data, 'billingDate', id),
    bonus: readNumber(data, 'bonus', id),
  }
}

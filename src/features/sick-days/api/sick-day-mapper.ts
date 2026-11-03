import {
  isRecord,
  readBoolean,
  readDate,
  readEnum,
  readNumber,
  readString,
} from '@/lib/firestore-document'
import { SICK_DAY_STATUSES, type SickDayRecord } from '../types/sick-day'

export function mapSickDayDocument(id: string, data: unknown): SickDayRecord {
  if (!isRecord(data)) {
    throw new Error(`Sick day "${id}" document data is not an object`)
  }

  const context = `Sick day "${id}"`

  return {
    id,
    employee: readString(data, 'employee', context),
    startDate: readDate(data, 'startDate', context),
    endDate: readDate(data, 'endDate', context),
    days: readNumber(data, 'days', context),
    reason: readString(data, 'reason', context),
    status: readEnum(data, 'status', SICK_DAY_STATUSES, context),
    hasCertificate: readBoolean(data, 'hasCertificate', context),
  }
}

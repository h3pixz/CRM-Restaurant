import {
  isRecord,
  readDate,
  readEnum,
  readNumber,
  readOptionalString,
  readString,
} from '@/lib/firestore-document'
import { VACATION_STATUSES, type VacationRequest } from '../types/vacation'

export function mapVacationRequestDocument(id: string, data: unknown): VacationRequest {
  if (!isRecord(data)) {
    throw new Error(`Vacation request "${id}" document data is not an object`)
  }

  const context = `Vacation request "${id}"`

  return {
    id,
    employee: readString(data, 'employee', context),
    startDate: readDate(data, 'startDate', context),
    endDate: readDate(data, 'endDate', context),
    days: readNumber(data, 'days', context),
    submittedAt: readDate(data, 'submittedAt', context),
    status: readEnum(data, 'status', VACATION_STATUSES, context),
    note: readOptionalString(data, 'note', context),
  }
}

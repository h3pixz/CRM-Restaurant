import { isRecord, readDate, readEnum, readString } from '@/lib/firestore-document'
import {
  TASK_CATEGORIES,
  TASK_PRIORITIES,
  TASK_STATUSES,
  type Task,
} from '../types/task'

export function mapTaskDocument(id: string, data: unknown): Task {
  if (!isRecord(data)) {
    throw new Error(`Task "${id}" document data is not an object`)
  }

  const context = `Task "${id}"`

  return {
    id,
    title: readString(data, 'title', context),
    category: readEnum(data, 'category', TASK_CATEGORIES, context),
    priority: readEnum(data, 'priority', TASK_PRIORITIES, context),
    assignee: readString(data, 'assignee', context),
    dueDate: readDate(data, 'dueDate', context),
    status: readEnum(data, 'status', TASK_STATUSES, context),
  }
}

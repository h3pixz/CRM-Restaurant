export const TASK_CATEGORIES = ['kitchen', 'service', 'inventory', 'admin'] as const

export type TaskCategory = (typeof TASK_CATEGORIES)[number]

export const TASK_PRIORITIES = ['high', 'medium', 'low'] as const

export type TaskPriority = (typeof TASK_PRIORITIES)[number]

export const TASK_STATUSES = ['open', 'done'] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]

export type TaskFilter = 'all' | TaskStatus

export interface Task {
  readonly id: string
  readonly title: string
  readonly category: TaskCategory
  readonly priority: TaskPriority
  readonly assignee: string
  readonly dueDate: string
  readonly status: TaskStatus
}

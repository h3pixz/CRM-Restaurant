export const TASK_CATEGORIES = ['kitchen', 'service', 'inventory', 'admin'] as const

export type TaskCategory = (typeof TASK_CATEGORIES)[number]

export const TASK_PRIORITIES = ['high', 'medium', 'low'] as const

export type TaskPriority = (typeof TASK_PRIORITIES)[number]

export type TaskStatus = 'open' | 'done'

export type TaskFilter = 'all' | TaskStatus

export interface Task {
  readonly id: string
  readonly title: string
  readonly category: TaskCategory
  readonly priority: TaskPriority
  readonly assignee: string
  readonly dueDate: string
}

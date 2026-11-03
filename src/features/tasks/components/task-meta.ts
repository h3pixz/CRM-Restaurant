import type { TaskCategory, TaskFilter, TaskPriority } from '../types/task'

export const TASK_FILTERS: readonly TaskFilter[] = ['all', 'open', 'done']

export const TASK_FILTER_LABELS: Record<TaskFilter, string> = {
  all: 'All tasks',
  open: 'Open',
  done: 'Done',
}

export const TASK_CATEGORY_LABELS: Record<TaskCategory, string> = {
  kitchen: 'Kitchen',
  service: 'Service',
  inventory: 'Inventory',
  admin: 'Admin',
}

export const TASK_CATEGORY_STYLES: Record<TaskCategory, string> = {
  kitchen: 'border-[#f0d9b5] bg-[#fdf3e3] text-[#8a5a13]',
  service: 'border-[#cfdffa] bg-[#eaf1fd] text-[#33517d]',
  inventory: 'border-[#d6e3cf] bg-[#eef4ea] text-[#4c6640]',
  admin: 'border-neutral-200 bg-neutral-100 text-neutral-600',
}

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

export const TASK_PRIORITY_DOT_STYLES: Record<TaskPriority, string> = {
  high: 'bg-brand',
  medium: 'bg-[#f8cf62]',
  low: 'bg-neutral-400',
}

export const TASK_PRIORITY_STYLES: Record<TaskPriority, string> = {
  high: 'text-[#b32020]',
  medium: 'text-[#8a5a13]',
  low: 'text-neutral-500',
}

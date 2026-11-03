import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { formatShortDate } from '@/utils/format-date'
import type { Task } from '../types/task'
import {
  TASK_CATEGORY_LABELS,
  TASK_CATEGORY_STYLES,
  TASK_PRIORITY_DOT_STYLES,
  TASK_PRIORITY_LABELS,
  TASK_PRIORITY_STYLES,
} from './task-meta'

interface TasksListProps {
  readonly tasks: readonly Task[]
  readonly doneIds: ReadonlySet<string>
  readonly emptyMessage: string
  readonly onToggle: (taskId: string) => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
}

export function TasksList({ tasks, doneIds, emptyMessage, onToggle }: TasksListProps) {
  return (
    <section aria-label="Task list" className="overflow-hidden rounded-2xl border border-neutral-100 bg-card">
      <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-900">Task list</h2>
        <span className="text-xs text-neutral-400">{tasks.length} shown</span>
      </div>

      {tasks.length === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-neutral-500">{emptyMessage}</p>
      ) : (
        <ul className="divide-y divide-neutral-100">
          {tasks.map((task) => {
            const isDone = doneIds.has(task.id)

            return (
              <li
                key={task.id}
                className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-neutral-50/80"
              >
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => onToggle(task.id)}
                  aria-label={isDone ? `Mark "${task.title}" as open` : `Mark "${task.title}" as done`}
                  className="mt-1 size-4 shrink-0 cursor-pointer accent-neutral-900"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1.5">
                    <p
                      className={cn(
                        'min-w-0 flex-1 text-sm font-medium text-neutral-900',
                        isDone && 'text-neutral-400 line-through',
                      )}
                    >
                      {task.title}
                    </p>

                    <span
                      className={cn(
                        'inline-flex shrink-0 items-center gap-1.5 text-[11px] font-semibold',
                        TASK_PRIORITY_STYLES[task.priority],
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'size-1.5 rounded-full',
                          TASK_PRIORITY_DOT_STYLES[task.priority],
                        )}
                      />
                      {TASK_PRIORITY_LABELS[task.priority]}
                    </span>
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                        TASK_CATEGORY_STYLES[task.category],
                      )}
                    >
                      {TASK_CATEGORY_LABELS[task.category]}
                    </span>

                    <span className="text-[11px] text-neutral-400">
                      Due {formatShortDate(task.dueDate)}
                    </span>

                    <span className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarFallback className="text-[10px]">
                          {getInitials(task.assignee)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-neutral-700">
                        {task.assignee}
                      </span>
                    </span>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

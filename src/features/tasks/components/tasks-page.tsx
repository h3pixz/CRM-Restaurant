import { useCallback, useMemo, useState } from 'react'
import { useSetTaskStatus, useTasksQuery } from '../api'
import type { Task, TaskFilter, TaskPriority, TaskStatus } from '../types/task'
import { TASK_FILTERS, TASK_FILTER_LABELS } from './task-meta'
import { TasksError, TasksLoading } from './tasks-feedback'
import { TasksList } from './tasks-list'
import { TasksMetrics, type TaskMetric } from './tasks-metrics'
import { TasksToolbar } from './tasks-toolbar'

const PRIORITY_RANK: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 }

const EMPTY_TASKS: readonly Task[] = []

export function TasksPage() {
  const tasksQuery = useTasksQuery()
  const { mutate: setTaskStatus } = useSetTaskStatus()
  const [filter, setFilter] = useState<TaskFilter>('all')
  const [search, setSearch] = useState('')

  const tasks = tasksQuery.data ?? EMPTY_TASKS

  const metrics = useMemo<readonly TaskMetric[]>(() => {
    const doneCount = tasks.filter((task) => task.status === 'done').length

    return TASK_FILTERS.map((key) => ({
      key,
      label: TASK_FILTER_LABELS[key],
      value: key === 'all' ? tasks.length : key === 'done' ? doneCount : tasks.length - doneCount,
    }))
  }, [tasks])

  const visibleTasks = useMemo<readonly Task[]>(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return tasks
      .filter((task) => {
        if (filter === 'open' && task.status === 'done') {
          return false
        }
        if (filter === 'done' && task.status !== 'done') {
          return false
        }
        if (!normalizedSearch) {
          return true
        }

        return (
          task.title.toLowerCase().includes(normalizedSearch) ||
          task.assignee.toLowerCase().includes(normalizedSearch)
        )
      })
      .slice()
      .sort((left, right) => {
        const leftDone = left.status === 'done' ? 1 : 0
        const rightDone = right.status === 'done' ? 1 : 0

        return (
          leftDone - rightDone ||
          left.dueDate.localeCompare(right.dueDate) ||
          PRIORITY_RANK[left.priority] - PRIORITY_RANK[right.priority]
        )
      })
  }, [filter, search, tasks])

  const handleToggle = useCallback(
    (taskId: string, status: TaskStatus) => {
      setTaskStatus({ taskId, status })
    },
    [setTaskStatus],
  )

  const emptyMessage =
    tasks.length === 0
      ? 'No tasks yet. Add documents to the "tasks" collection in Firestore.'
      : 'No tasks match the current filters.'

  return (
    <>
      <TasksMetrics metrics={metrics} activeFilter={filter} onFilterChange={setFilter} />

      <TasksToolbar search={search} onSearchChange={setSearch} />

      {tasksQuery.isPending && <TasksLoading />}

      {tasksQuery.isError && (
        <TasksError
          message={
            tasksQuery.error instanceof Error
              ? tasksQuery.error.message
              : 'Unexpected error while loading tasks.'
          }
          onRetry={() => {
            void tasksQuery.refetch()
          }}
        />
      )}

      {tasksQuery.isSuccess && (
        <TasksList
          tasks={visibleTasks}
          emptyMessage={emptyMessage}
          onToggle={handleToggle}
        />
      )}
    </>
  )
}

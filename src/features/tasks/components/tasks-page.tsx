import { useCallback, useMemo, useState } from 'react'
import { TASKS } from '../data/tasks'
import type { Task, TaskFilter, TaskPriority } from '../types/task'
import { TASK_FILTERS, TASK_FILTER_LABELS } from './task-meta'
import { TasksList } from './tasks-list'
import { TasksMetrics, type TaskMetric } from './tasks-metrics'
import { TasksToolbar } from './tasks-toolbar'

const PRIORITY_RANK: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 }

export function TasksPage() {
  const [filter, setFilter] = useState<TaskFilter>('all')
  const [search, setSearch] = useState('')
  const [doneIds, setDoneIds] = useState<ReadonlySet<string>>(() => new Set())

  const metrics = useMemo<readonly TaskMetric[]>(() => {
    const doneCount = TASKS.filter((task) => doneIds.has(task.id)).length

    return TASK_FILTERS.map((key) => ({
      key,
      label: TASK_FILTER_LABELS[key],
      value: key === 'all' ? TASKS.length : key === 'done' ? doneCount : TASKS.length - doneCount,
    }))
  }, [doneIds])

  const visibleTasks = useMemo<readonly Task[]>(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return TASKS.filter((task) => {
      const isDone = doneIds.has(task.id)

      if (filter === 'open' && isDone) {
        return false
      }
      if (filter === 'done' && !isDone) {
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
        const leftDone = doneIds.has(left.id) ? 1 : 0
        const rightDone = doneIds.has(right.id) ? 1 : 0

        return (
          leftDone - rightDone ||
          left.dueDate.localeCompare(right.dueDate) ||
          PRIORITY_RANK[left.priority] - PRIORITY_RANK[right.priority]
        )
      })
  }, [doneIds, filter, search])

  const handleToggle = useCallback((taskId: string) => {
    setDoneIds((current) => {
      const next = new Set(current)

      if (next.has(taskId)) {
        next.delete(taskId)
      } else {
        next.add(taskId)
      }

      return next
    })
  }, [])

  const emptyMessage =
    TASKS.length === 0
      ? 'No tasks yet. New tasks will appear in this list.'
      : 'No tasks match the current filters.'

  return (
    <>
      <TasksMetrics metrics={metrics} activeFilter={filter} onFilterChange={setFilter} />

      <TasksToolbar search={search} onSearchChange={setSearch} />

      <TasksList
        tasks={visibleTasks}
        doneIds={doneIds}
        emptyMessage={emptyMessage}
        onToggle={handleToggle}
      />
    </>
  )
}

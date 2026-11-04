import { collection, doc, getDocs, updateDoc } from 'firebase/firestore/lite'
import { firestore } from '@/lib/firebase'
import type { Task, TaskStatus } from '../types/task'
import { mapTaskDocument } from './task-mapper'

const TASKS_COLLECTION = 'tasks'

export async function fetchTasks(): Promise<readonly Task[]> {
  const snapshot = await getDocs(collection(firestore, TASKS_COLLECTION))

  return snapshot.docs.map((taskDocument) =>
    mapTaskDocument(taskDocument.id, taskDocument.data()),
  )
}

export async function setTaskStatus(taskId: string, status: TaskStatus): Promise<void> {
  await updateDoc(doc(firestore, TASKS_COLLECTION, taskId), { status })
}

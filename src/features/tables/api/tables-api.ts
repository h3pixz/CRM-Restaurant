import { collection, doc, getDoc, getDocs } from 'firebase/firestore/lite'
import { firestore } from '@/lib/firebase'
import type { RestaurantTable } from '../types/table'
import { mapTableDocument } from './table-mapper'

const TABLES_COLLECTION = 'tables'

export async function fetchTables(): Promise<readonly RestaurantTable[]> {
  const snapshot = await getDocs(collection(firestore, TABLES_COLLECTION))

  return snapshot.docs
    .map((tableDocument) => mapTableDocument(tableDocument.id, tableDocument.data()))
    .sort((left, right) =>
      left.label.localeCompare(right.label, undefined, { numeric: true }),
    )
}

export async function fetchTable(tableId: string): Promise<RestaurantTable | null> {
  const snapshot = await getDoc(doc(firestore, TABLES_COLLECTION, tableId))

  if (!snapshot.exists()) {
    return null
  }

  return mapTableDocument(snapshot.id, snapshot.data())
}

import { collection, doc, getDoc, getDocs } from 'firebase/firestore/lite'
import { firestore } from '@/lib/firebase'
import type { TableOrder } from '../types/order'
import { mapOrderDocument } from './order-mapper'

const ORDERS_COLLECTION = 'orders'

export async function fetchOrders(): Promise<readonly TableOrder[]> {
  const snapshot = await getDocs(collection(firestore, ORDERS_COLLECTION))

  return snapshot.docs
    .map((orderDocument) => mapOrderDocument(orderDocument.id, orderDocument.data()))
    .sort((left, right) => left.tableId.localeCompare(right.tableId))
}

export async function fetchTableOrder(tableId: string): Promise<TableOrder | null> {
  const snapshot = await getDoc(doc(firestore, ORDERS_COLLECTION, tableId))

  if (!snapshot.exists()) {
    return null
  }

  return mapOrderDocument(tableId, snapshot.data())
}

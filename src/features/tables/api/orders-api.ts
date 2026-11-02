import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '@/lib/firebase'
import type { TableOrder } from '../types/order'
import { mapOrderDocument } from './order-mapper'

const ORDERS_COLLECTION = 'orders'

export async function fetchTableOrder(tableId: string): Promise<TableOrder | null> {
  const snapshot = await getDoc(doc(firestore, ORDERS_COLLECTION, tableId))

  if (!snapshot.exists()) {
    return null
  }

  return mapOrderDocument(tableId, snapshot.data())
}

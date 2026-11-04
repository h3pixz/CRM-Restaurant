import { collection, doc, getDocs, updateDoc } from 'firebase/firestore/lite'
import { firestore } from '@/lib/firebase'
import type { SickDayRecord, SickDayStatus } from '../types/sick-day'
import { mapSickDayDocument } from './sick-day-mapper'

const SICK_DAYS_COLLECTION = 'sickDays'

export async function fetchSickDayRecords(): Promise<readonly SickDayRecord[]> {
  const snapshot = await getDocs(collection(firestore, SICK_DAYS_COLLECTION))

  return snapshot.docs.map((recordDocument) =>
    mapSickDayDocument(recordDocument.id, recordDocument.data()),
  )
}

export async function setSickDayStatus(
  recordId: string,
  status: SickDayStatus,
): Promise<void> {
  await updateDoc(doc(firestore, SICK_DAYS_COLLECTION, recordId), { status })
}

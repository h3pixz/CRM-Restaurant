import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { firestore } from '@/lib/firebase'
import type { VacationRequest, VacationStatus } from '../types/vacation'
import { mapVacationRequestDocument } from './vacation-mapper'

const VACATION_REQUESTS_COLLECTION = 'vacationRequests'

export async function fetchVacationRequests(): Promise<readonly VacationRequest[]> {
  const snapshot = await getDocs(collection(firestore, VACATION_REQUESTS_COLLECTION))

  return snapshot.docs.map((requestDocument) =>
    mapVacationRequestDocument(requestDocument.id, requestDocument.data()),
  )
}

export async function setVacationStatus(
  requestId: string,
  status: VacationStatus,
): Promise<void> {
  await updateDoc(doc(firestore, VACATION_REQUESTS_COLLECTION, requestId), { status })
}

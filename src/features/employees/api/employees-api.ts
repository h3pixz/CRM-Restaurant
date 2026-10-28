import { collection, doc, getDocs, increment, updateDoc } from 'firebase/firestore'
import { firestore } from '@/lib/firebase'
import type { Employee } from '../types/employee'
import { mapEmployeeDocument } from './employee-mapper'

const EMPLOYEES_COLLECTION = 'employees'

export async function fetchEmployees(): Promise<readonly Employee[]> {
  const snapshot = await getDocs(collection(firestore, EMPLOYEES_COLLECTION))

  return snapshot.docs
    .map((employeeDocument) => mapEmployeeDocument(employeeDocument.id, employeeDocument.data()))
    .sort((left, right) => left.name.localeCompare(right.name))
}

export async function addEmployeeBonus(employeeId: string, amount: number): Promise<void> {
  const employeeRef = doc(firestore, EMPLOYEES_COLLECTION, employeeId)
  await updateDoc(employeeRef, { bonus: increment(amount) })
}

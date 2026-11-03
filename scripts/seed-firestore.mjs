import { initializeApp } from 'firebase/app'
import { doc, getFirestore, writeBatch } from 'firebase/firestore'

const FIREBASE_ENV_KEYS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
]

const missingKeys = FIREBASE_ENV_KEYS.filter((key) => !process.env[key])

if (missingKeys.length > 0) {
  console.error(`Missing Firebase environment variables: ${missingKeys.join(', ')}`)
  process.exit(1)
}

const app = initializeApp({
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
})

const db = getFirestore(app)

const tasks = [
  {
    id: 'task-stock-check',
    title: 'Check the walk-in cooler temperature log',
    category: 'kitchen',
    priority: 'high',
    assignee: 'Marcus Reed',
    dueDate: '2026-11-03',
    status: 'open',
  },
  {
    id: 'task-produce-order',
    title: 'Place the weekly produce order with the supplier',
    category: 'inventory',
    priority: 'high',
    assignee: 'Priya Nair',
    dueDate: '2026-11-03',
    status: 'open',
  },
  {
    id: 'task-training',
    title: 'Run the onboarding session for the new server',
    category: 'service',
    priority: 'medium',
    assignee: 'Dwayne Exum',
    dueDate: '2026-11-04',
    status: 'open',
  },
  {
    id: 'task-pos-close',
    title: 'Reconcile the POS close-out for yesterday',
    category: 'admin',
    priority: 'high',
    assignee: 'Okechukwu Andrey',
    dueDate: '2026-11-04',
    status: 'open',
  },
  {
    id: 'task-menu-photos',
    title: 'Update the seasonal menu photos in the ordering app',
    category: 'admin',
    priority: 'low',
    assignee: 'Sofia Alvarez',
    dueDate: '2026-11-05',
    status: 'open',
  },
  {
    id: 'task-cutlery',
    title: 'Restock cutlery and napkins for the dinner shift',
    category: 'service',
    priority: 'medium',
    assignee: 'Hannah Cole',
    dueDate: '2026-11-05',
    status: 'open',
  },
  {
    id: 'task-fryer-oil',
    title: 'Schedule the fryer oil replacement',
    category: 'kitchen',
    priority: 'medium',
    assignee: 'Marcus Reed',
    dueDate: '2026-11-06',
    status: 'open',
  },
  {
    id: 'task-fire-check',
    title: 'Verify fire extinguisher inspection tags',
    category: 'admin',
    priority: 'low',
    assignee: 'Okechukwu Andrey',
    dueDate: '2026-11-09',
    status: 'open',
  },
]

const vacationRequests = [
  {
    id: 'vacation-sofia',
    employee: 'Sofia Alvarez',
    startDate: '2026-11-10',
    endDate: '2026-11-14',
    days: 5,
    submittedAt: '2026-10-27',
    status: 'pending',
    note: 'Family trip booked in advance.',
  },
  {
    id: 'vacation-marcus',
    employee: 'Marcus Reed',
    startDate: '2026-11-18',
    endDate: '2026-11-20',
    days: 3,
    submittedAt: '2026-10-30',
    status: 'pending',
    note: 'Covers the kitchen renovation days.',
  },
  {
    id: 'vacation-priya',
    employee: 'Priya Nair',
    startDate: '2026-11-23',
    endDate: '2026-11-27',
    days: 5,
    submittedAt: '2026-10-21',
    status: 'approved',
  },
  {
    id: 'vacation-hannah',
    employee: 'Hannah Cole',
    startDate: '2026-12-01',
    endDate: '2026-12-03',
    days: 3,
    submittedAt: '2026-11-01',
    status: 'pending',
  },
  {
    id: 'vacation-okechukwu',
    employee: 'Okechukwu Andrey',
    startDate: '2026-10-19',
    endDate: '2026-10-23',
    days: 5,
    submittedAt: '2026-10-05',
    status: 'declined',
    note: 'Declined due to the end-of-month inventory.',
  },
  {
    id: 'vacation-dwayne',
    employee: 'Dwayne Exum',
    startDate: '2026-12-14',
    endDate: '2026-12-18',
    days: 5,
    submittedAt: '2026-10-29',
    status: 'approved',
  },
]

const sickDays = [
  {
    id: 'sick-hannah',
    employee: 'Hannah Cole',
    startDate: '2026-11-02',
    endDate: '2026-11-04',
    days: 3,
    reason: 'Flu',
    status: 'open',
    hasCertificate: true,
  },
  {
    id: 'sick-marcus',
    employee: 'Marcus Reed',
    startDate: '2026-10-28',
    endDate: '2026-10-29',
    days: 2,
    reason: 'Migraine',
    status: 'closed',
    hasCertificate: false,
  },
  {
    id: 'sick-priya',
    employee: 'Priya Nair',
    startDate: '2026-10-14',
    endDate: '2026-10-18',
    days: 5,
    reason: 'Back injury',
    status: 'closed',
    hasCertificate: true,
  },
  {
    id: 'sick-sofia',
    employee: 'Sofia Alvarez',
    startDate: '2026-10-06',
    endDate: '2026-10-06',
    days: 1,
    reason: 'Food poisoning',
    status: 'closed',
    hasCertificate: false,
  },
  {
    id: 'sick-okechukwu',
    employee: 'Okechukwu Andrey',
    startDate: '2026-11-05',
    endDate: '2026-11-12',
    days: 8,
    reason: 'Surgery recovery',
    status: 'open',
    hasCertificate: true,
  },
]

const collections = {
  tasks,
  vacationRequests,
  sickDays,
}

const batch = writeBatch(db)
let documentCount = 0

for (const [collectionName, records] of Object.entries(collections)) {
  for (const { id, ...data } of records) {
    batch.set(doc(db, collectionName, id), data)
    documentCount += 1
  }
}

try {
  await batch.commit()
  console.log(
    `Seeded ${documentCount} documents: tasks (${tasks.length}), ` +
      `vacationRequests (${vacationRequests.length}), sickDays (${sickDays.length}).`,
  )
} catch (error) {
  console.error('Could not write to Firestore:', error)
  process.exit(1)
}

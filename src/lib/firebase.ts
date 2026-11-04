import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore/lite'

const FIREBASE_ENV_KEYS = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
] as const

const env = import.meta.env
const missingKeys = FIREBASE_ENV_KEYS.filter((key) => !env[key])

if (missingKeys.length > 0) {
  throw new Error(
    `Missing Firebase environment variables: ${missingKeys.join(', ')}. ` +
      'Copy .env.example to .env and fill in the values.',
  )
}

export const firebaseApp: FirebaseApp = initializeApp({
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
})

export const firestore: Firestore = getFirestore(firebaseApp)

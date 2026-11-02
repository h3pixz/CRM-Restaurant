import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/lib/firebase'
import type { Restaurant } from '../types/restaurant'
import { mapRestaurantDocument } from './restaurant-mapper'

const RESTAURANTS_COLLECTION = 'restaurants'

export async function fetchRestaurants(): Promise<readonly Restaurant[]> {
  const snapshot = await getDocs(collection(firestore, RESTAURANTS_COLLECTION))

  return snapshot.docs
    .map((restaurantDocument) =>
      mapRestaurantDocument(restaurantDocument.id, restaurantDocument.data()),
    )
    .sort(
      (left, right) =>
        left.distanceFt - right.distanceFt || left.name.localeCompare(right.name),
    )
}
